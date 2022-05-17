import type { Handler } from '../types';
import type { TextChannel } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { prisma } from '../database';
import { punish } from '../utils';

export const handler: Handler = ({ client }) => {
	client.on('messageCreate', async msg => {
		if (msg.content.includes('@everyone') || msg.content.includes('@here') || msg.mentions.members?.size! >= 7) {
			const member = msg.member;
			const punishment = await punish({
				member: member!,
				reason: `attempting to mention ${msg.content}`,
				guild: msg.guildId!,
			});
			const whitelist = await prisma.whitelist.findUnique({
				where: { guild: msg.guildId! },
				select: { users: true },
			});
			if (whitelist?.users.some(id => id === member?.user.id)) return;
			await msg.delete();
			const quarantineEmbed = new MessageEmbed()
				.setTitle('Quarantine')
				.setAuthor({
					name: member?.user.tag!,
					iconURL: member?.user.avatarURL()!,
				})
				.setDescription(`${member?.user} Was succesfully ${punishment}ed. \n For attempting to mention ${msg.content}`)
				.setColor('#2F3136');
			msg.channel.send({ embeds: [quarantineEmbed] });

			const logs = await prisma.channel.findUnique({
				where: { guild_type: { guild: msg.guildId!, type: 'LOGS' } },
				select: { channel: true },
			});
			const pinglogEmbed = new MessageEmbed()
				.setTitle(`**Member ${punishment}ed**: ${member?.user.tag}`)
				.setDescription(`**Reason**: Attemting to ping. \n **Message**: ${msg.content}`)
				.setColor('#2F3136')
				.setThumbnail(member?.user.avatarURL()!);
			const logsChannel = (await msg.guild?.channels.fetch(logs?.channel!)) as TextChannel;
			logsChannel?.send({ embeds: [pinglogEmbed] });
		}
	});
};
