import { MessageEmbed } from 'discord.js';

export default {
	name: 'whitelist',
	run: async (_, message, args, db) => {
		switch (args[0]) {
			case 'add':
				if (message.guild.ownerId === message.author.id) {
					const user = message.mentions.users.first();
					if (!user) return message.channel.send(':x: | **Mention The User**');
					let whitelist = db.get(`whitelist_${message.guild.id}`);
					if (whitelist && whitelist.find((x) => x.user == user.id)) {
						return message.channel.send(
							':x: | **The User is already whitelisted**'
						);
					}
					db.push(`whitelist_${message.guild.id}`, { user: user.id });
					return message.channel.send(`**The user has been whitelisted!**`);
				} else {
					return message.channel.send(
						':x: | **Only The owner of the Server can whitelist people**'
					);
				}
			case 'remove':
				if (message.author.id === message.guild.ownerId) {
					let user = message.mentions.users.first();
					if (!user) return message.channel.send(':x: | **Mention The User**');
					let whitelist = db.get(`whitelist_${message.guild.id}`);
					if (whitelist) {
						let omg = whitelist.find((x) => x.user === user.id);
						if (!omg)
							return message.channel.send(
								':x: | **The user is not whitelisted!**'
							);
						let index = whitelist.indexOf(omg);
						delete whitelist[index];
						let fix = whitelist.filter((x) => {
							return x != null && x != '';
						});
						db.set(`whitelist_${message.guild.id}`, fix);
						return message.channel.send('**The user has been unwhitelisted!**');
					} else {
						return message.channel.send(
							':x: | **The user is not whitelisted!**'
						);
					}
				} else {
					return message.channel.send(
						':x: | **Only The owner of the Server can unwhitelist people**'
					);
				}
			case 'show':
				const bruh = [];
				const embed = new MessageEmbed()
					.setTitle('**The list of whitelisted users**')
					.setAuthor({
						name: message.author.tag,
						iconURL: message.author.displayAvatarURL({ dynamic: true }),
					})
					.setFooter({
						text: message.guild.name,
						iconURL: message.guild.iconURL(),
					})
					.setThumbnail(message.guild.iconURL());
				let whitelisted = db.get(`whitelist_${message.guild.id}`);
				if (whitelisted && whitelisted.length) {
					whitelisted.forEach((x) => {
						bruh.push(`<@${x.user}>`);
					});
					embed.addField('**Users**', `${bruh.join('\n')}`);
					embed.setColor('GREEN');
				} else {
					embed.setDescription(':x: | **No whitelisted Users Found**');
					embed.setColor('#FF0000');
				}
				message.channel.send({ embeds: [embed] });
		}
	},
};
