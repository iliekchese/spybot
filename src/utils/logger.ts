import type { LimitType } from '@prisma/client';
import type { Client, Guild, GuildAuditLogs, TextChannel } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { prisma } from '../database';
import punish from './punish';

interface LoggerOptions {
	type: LimitType;
	audits: GuildAuditLogs<any>;
	reason: string;
	client: Client;
	guild: Guild;
}

export const createLog = async ({ type, audits, reason, guild, client }: LoggerOptions) => {
	const log = audits.entries.first();
	const user = log?.executor;
	if (user?.id === client.user?.id) return;
	const personLimit = await prisma.userLimit.findUnique({
		where: { guild_user_type: { guild: guild.id, user: user?.id!, type } },
		select: { limit: true },
	});
	const rcl = await prisma.limit.findUnique({
		where: { guild_type: { guild: guild.id, type } },
		select: { limit: true },
	});
	const whitelist = await prisma.whitelist.findUnique({
		where: { guild: guild.id },
		select: { users: true },
	});
	if (whitelist?.users.some(id => id === user?.id)) return;
	if (!rcl?.limit) return;
	if ((personLimit?.limit || 0) !== 0 && personLimit?.limit! % rcl.limit === 0) {
		const logsID = await prisma.channel.findUnique({
			where: { guild_type: { guild: guild.id, type: 'LOGS' } },
			select: { channel: true },
		});
		if (!logsID) return;
		const logs = client.channels.cache.get(logsID.channel) as TextChannel;
		if (!logs) return;
		const punishment = await prisma.punish.findUnique({
			where: { guild: guild.id },
			select: { option: true },
		});
		if (!punishment?.option) return;
		const embed = new MessageEmbed()
			.setTitle('**Spy Bot**')
			.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
			.setFooter({
				text: guild.name,
				iconURL: guild.iconURL()!,
			})
			.addField('User', user?.tag!)
			.addField('Case', reason)
			.addField('Punishment', punishment.option)
			.setColor('#2f3136');
		const punishCheck =
			punishment.option === 'QUARANTINE' || punishment.option === 'DEMOTE' ? 'd' : 'ed';
		try {
			await punish(await guild.members.fetch(user?.id!)!, reason, guild.id);
			embed.addField(punishment.option.concat(punishCheck), 'Yes');
		} catch (err) {
			embed.addField(punishment.option.concat(punishCheck), 'No');
			console.error(err);
		} finally {
			logs.send({ embeds: [embed] });
		}
	}
	await prisma.userLimit.upsert({
		where: { guild_user_type: { guild: guild.id, user: user?.id!, type } },
		update: { limit: (personLimit?.limit || 0) + 1 },
		create: {
			guild: guild.id,
			user: user?.id!,
			type,
			limit: 1,
		},
	});
};
