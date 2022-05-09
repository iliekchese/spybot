import type { Handler } from '..';
import type { TextChannel } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { prisma } from '../database';

export const handler = async ({ client }: Handler) => {
	client.on('messageCreate', async msg => {
		if (msg.content === '@everyone' || msg.content === '@here') {
			const member = msg.member;
			const whitelist = await prisma.whitelist.findUnique({
				where: { guild: msg.guild?.id! },
			});
			if (whitelist?.users.some(id => id === member?.user.id)) return;
			const role = member?.guild.roles.cache.find(
				role => role.name === 'Quarantine'
			);
			member?.roles.cache
				.filter(r => r.name !== '@everyone')
				.forEach(async r => await member?.roles.remove(r.id));
			member?.roles.add(role!);

			await msg.delete();

			const quarantineEmbed = new MessageEmbed()
				.setTitle('Quarantine')
				.setAuthor({
					name: member?.user.tag!,
					iconURL: member?.user.avatarURL()!,
				})
				.setDescription(
					`${member?.user} Was succesfully quarantined. \n For attempting to mention ${msg.content}`
				)
				.setColor('#2F3136');
			msg.channel.send({ embeds: [quarantineEmbed] });

			const logs = await prisma.logsChannel.findUnique({
				where: { guild: msg.guild?.id! },
			});
			const pinglogEmbed = new MessageEmbed()
				.setTitle(`**Member Quarantined**: ${member?.user.tag}`)
				.setDescription(
					`**Reason**: Attemting to ping. \n **Message**: ${msg.content}`
				)
				.setColor('#2F3136')
				.setThumbnail(member?.user.avatarURL()!);
			const logsChannel = msg.guild?.channels.cache.get(
				logs?.id!
			) as TextChannel;
			logsChannel.send({ embeds: [pinglogEmbed] });
		}
	});
};
