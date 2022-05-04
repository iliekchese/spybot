import type { ICommandArgs } from '../..';
import { MessageEmbed, Permissions } from 'discord.js';

export default {
	name: 'whitelist',
	run({ message, args, db }: ICommandArgs) {
		const whitelist: string[] = db.get(`whitelist_${message.guild?.id}`);
		console.log(whitelist)
		const user = message.mentions.users.first();
		switch (args[0]) {
			case 'add':
				if (!message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
					message.channel.send("You don't have permission to do this!")
					break;
				}
				if (!user) {
					message.channel.send(':x: | **Mention The User**')
					break;
				}
				if (whitelist?.some(id => id === user.id)) {
					message.channel.send(':x: | **The User is already whitelisted**');
					break;
				}
				db.push(`whitelist_${message.guild?.id}`, user.id);
				message.channel.send(`**The user has been whitelisted!**`);
				break;
			
			case 'remove':
				if (!message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
					message.channel.send("You don't have permission to do this!")
					break;
				}
				if (!user) {
					db.set(`whitelist_${message.guild?.id}`, []);
					message.channel.send('**Whitelist has been resetted!**');
					break;
				};
				if (!whitelist?.some(id => id === user?.id)) {
					message.channel.send(':x: | **The user is not whitelisted!**');
					break;
				}
				const index = whitelist.indexOf(user.id);
				delete whitelist[index];
				db.set(`whitelist_${message.guild?.id}`, whitelist.filter(x => !!x));
				message.channel.send('**The user has been unwhitelisted!**');
				break;

			case 'show':
				const embed = new MessageEmbed()
					.setTitle('**The list of whitelisted users**')
					.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
					.setFooter({ text: message.guild?.name!, iconURL: message.guild?.iconURL()! })
					.setThumbnail(message.guild?.iconURL() ?? '');
				const whitelisted = whitelist?.map(id => `<@${id}>`);
				if (whitelisted?.length) {
					embed.addField('**Users**', `${whitelisted.join('\n')}`);
					embed.setColor('GREEN');
				} else {
					embed.setDescription(':x: | **No whitelisted Users Found**');
					embed.setColor('RED');
				}
				message.channel.send({ embeds: [embed] });
		}
	},
};
