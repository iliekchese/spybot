import type { Logger } from '../types';
import { GuildChannel } from 'discord.js';
import { createLog } from '../utils';

const channelLogger: Logger = client => {
	client.on('channelCreate', async channel => {
		const audits = await channel.guild.fetchAuditLogs({
			type: 'CHANNEL_CREATE',
			limit: 1,
		});
		createLog({
			audits,
			client,
			guild: channel.guild,
			type: 'CHANNELCREATE',
			reason: 'Breaking Channel Create Limit',
		});
	});

	client.on('channelDelete', async channel => {
		if (channel instanceof GuildChannel) {
			const audits = await channel.guild.fetchAuditLogs({
				type: 'CHANNEL_DELETE',
				limit: 1,
			});
			createLog({
				audits,
				client,
				guild: channel.guild,
				type: 'CHANNELDELETE',
				reason: 'Breaking Channel Delete Limit',
			});
		}
	});
};

export default channelLogger;
