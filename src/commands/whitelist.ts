import type { Command } from '../types';
import { MessageEmbed, Permissions } from 'discord.js';
import { prisma } from '../database';

export default {
	name: 'whitelist',
	async run({ message, args }) {
		const whitelist = await prisma.whitelist.findUnique({
			where: { guild: message.guildId! },
			select: { users: true },
		});
		const user = message.mentions.users.first();
		switch (args[0]) {
			case 'add':
				if (!message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
					message.channel.send("You don't have permission to do this!");
					break;
				}
				if (!user) {
					message.channel.send(':x: | **Mention The User**');
					break;
				}
				if (whitelist?.users.some(id => id === user.id)) {
					message.channel.send(':x: | **The User is already whitelisted**');
					break;
				}
				await prisma.whitelist.upsert({
					where: { guild: message.guildId! },
					update: { users: { push: user.id } },
					create: { guild: message.guildId!, users: [user.id] },
				});
				message.channel.send(`**The user has been whitelisted!**`);
				break;

			case 'remove':
				if (!message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
					message.channel.send("You don't have permission to do this!");
					break;
				}
				if (!user) {
					message.channel.send(':x: | **Mention The User**');
					break;
				}
				if (!whitelist?.users.some(id => id === user?.id)) {
					message.channel.send(':x: | **The user is not whitelisted!**');
					break;
				}
				await prisma.whitelist.update({
					where: { guild: message.guildId! },
					data: { users: whitelist.users.filter(id => id !== user?.id) },
				});
				message.channel.send('**The user has been unwhitelisted!**');
				break;

			case 'show':
				const embed = new MessageEmbed()
					.setTitle('**The list of whitelisted users**')
					.setAuthor({
						name: message.author.tag,
						iconURL: message.author.displayAvatarURL({ dynamic: true }),
					})
					.setFooter({
						text: message.guild?.name!,
						iconURL: message.guild?.iconURL()!,
					})
					.setThumbnail(message.guild?.iconURL()!);
				const whitelisted = whitelist?.users.map(id => `<@${id}>`);
				if (whitelisted?.length) {
					embed.addField('**Users**', `${whitelisted.join('\n')}`);
					embed.setColor('GREEN');
				} else {
					embed.setDescription(':x: | **No whitelisted Users Found**');
					embed.setColor('RED');
				}
				message.channel.send({ embeds: [embed] });
				break;
		}
	},
} as Command;
