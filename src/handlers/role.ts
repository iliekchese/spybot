import type { Handler } from '../types';
import { createLog } from '../utils';

export const handler: Handler = ({ client }) => {
	client.on('roleCreate', async role => {
		const audits = await role.guild.fetchAuditLogs({
			type: 'ROLE_CREATE',
		});
		createLog({
			audits,
			client,
			guild: role.guild,
			type: 'ROLECREATE',
			reason: 'Breaking Role Create Limit',
		});
	});

	client.on('roleDelete', async role => {
		const audits = await role.guild.fetchAuditLogs({
			type: 'ROLE_DELETE',
		});
		createLog({
			audits,
			client,
			guild: role.guild,
			type: 'ROLEDELETE',
			reason: 'Breaking Role Delete Limit',
		});
	});
};
