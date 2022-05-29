import type { Logger } from '../types';
import { createLog } from '../utils';

const roleLogger: Logger = client => {
	client.on('roleCreate', async role => {
		const audits = await role.guild.fetchAuditLogs({
			type: 'ROLE_CREATE',
			limit: 1,
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
			limit: 1,
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

export default roleLogger;
