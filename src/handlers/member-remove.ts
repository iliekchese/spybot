import type { Handler } from '../types';
import { createLog } from '../utils';

export const handler = ({ client }: Handler) => {
	client.on('guildBanAdd', async ban => {
		const audits = await ban.guild.fetchAuditLogs({
			limit: 1,
			type: 'MEMBER_BAN_ADD',
		});
		createLog({
			audits,
			client,
			guild: ban.guild,
			type: 'ban',
			reason: 'Breaking Ban Limit',
		});
	});

	client.on('guildMemberRemove', async member => {
		const audits = await member.guild.fetchAuditLogs({
			limit: 1,
			type: 'MEMBER_KICK',
		});
		const log = audits.entries.first();
		if (!log) return;
		if (log.createdAt < member.joinedAt!) return;
		createLog({
			audits,
			client,
			guild: member.guild,
			type: 'kick',
			reason: 'Breaking Kick Limit',
		});
	});
};
