import type { Logger } from '../types';
import { createLog } from '../utils';

const memberRemoveLogger: Logger = client => {
	client.on('guildBanAdd', async ban => {
		const audits = await ban.guild.fetchAuditLogs({
			type: 'MEMBER_BAN_ADD',
			limit: 1,
		});
		createLog({
			audits,
			client,
			guild: ban.guild,
			type: 'BAN',
			reason: 'Breaking Ban Limit',
		});
	});

	client.on('guildMemberRemove', async member => {
		const audits = await member.guild.fetchAuditLogs({
			type: 'MEMBER_KICK',
			limit: 1,
		});
		const log = audits.entries.first();
		if (!log) return;
		if (log.createdAt < member.joinedAt!) return;
		createLog({
			audits,
			client,
			guild: member.guild,
			type: 'KICK',
			reason: 'Breaking Kick Limit',
		});
	});
};

export default memberRemoveLogger;
