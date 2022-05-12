import type { Handler } from '../types';
import type { TextChannel } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { prisma } from '../database';
import { punish } from "../utils/punish"

export const handler = async ({ client }: Handler) => {
	client.on('messageCreate', async msg => {
		if (
			msg.content.includes('@everyone') ||
			msg.content.includes('@here') ||
			msg.mentions.members?.size! >= 7
		) {
			const member = msg.member;
			const punishment = await punish(member!, `attempting to mention ${msg.content}`, msg.guildId!)
			if (punishment === "whitelist") return;
			
			await msg.delete();

			const quarantineEmbed = new MessageEmbed()
				.setTitle('Quarantine')
				.setAuthor({
					name: member?.user.tag!,
					iconURL: member?.user.avatarURL()!,
				})
				.setDescription(
					`${member?.user} Was succesfully ${punishment}ed. \n For attempting to mention ${msg.content}`
				)
				.setColor('#2F3136');
			msg.channel.send({ embeds: [quarantineEmbed] });

			const logs = await prisma.logsChannel.findUnique({
				where: { guild: msg.guild?.id! },
				select: { channel: true }
			});
			const pinglogEmbed = new MessageEmbed()
				.setTitle(`**Member ${punishment}ed**: ${member?.user.tag}`)
				.setDescription(`**Reason**: Attemting to ping. \n **Message**: ${msg.content}`)
				.setColor('#2F3136')
				.setThumbnail(member?.user.avatarURL()!);
			const logsChannel = msg.guild?.channels.cache.get(logs?.channel!) as TextChannel;
			logsChannel?.send({ embeds: [pinglogEmbed] });
		}
	});
};
