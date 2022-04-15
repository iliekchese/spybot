import type { GuildMember } from 'discord.js';
import type { ICommandArgs } from '../..';
import { MessageEmbed } from 'discord.js';

export default {
	name: 'whitelist',
	run({ message, args, db }: ICommandArgs) {
		switch (args[0]) {
			case 'add':
				if (message.author.id === message.guild?.ownerId) {
					const user = message.mentions.users.first();
					if (!user) return message.channel.send(':x: | **Mention The User**');
					let whitelist = db.get(`whitelist_${message.guild.id}`);
					if (
						whitelist &&
						whitelist.find((x: { user: string }) => x.user == user.id)
					) {
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
				if (message.author.id === message.guild?.ownerId) {
					const user = message.mentions.users.first();
					if (!user) return message.channel.send(':x: | **Mention The User**');
					const whitelist: GuildMember[] = db.get(
						`whitelist_${message.guild.id}`
					);
					if (whitelist) {
						const whitelistedUser = whitelist.find(x => x.user.id === user?.id);
						if (!whitelistedUser)
							return message.channel.send(
								':x: | **The user is not whitelisted!**'
							);
						const index = whitelist.indexOf(whitelistedUser);
						delete whitelist[index];
						const fix = whitelist.filter(x => !!x);
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
				const embed = new MessageEmbed()
					.setTitle('**The list of whitelisted users**')
					.setAuthor({
						name: message.author.tag,
						iconURL: message.author.displayAvatarURL({ dynamic: true }),
					})
					.setFooter({
						text: message.guild?.name || '',
						iconURL: message.guild?.iconURL() ?? '',
					})
					.setThumbnail(message.guild?.iconURL() ?? '');
				const whitelisted: string[] = db
					.get(`whitelist_${message.guild?.id}`)
					?.map((x: GuildMember) => `<@${x.user}>`);
				if (whitelisted?.length) {
					embed.addField('**Users**', `${whitelisted.join('\n')}`);
					embed.setColor('GREEN');
				} else {
					embed.setDescription(':x: | **No whitelisted Users Found**');
					embed.setColor('#FF0000');
				}
				message.channel.send({ embeds: [embed] });
		}
	},
};
