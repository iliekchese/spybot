import type { GuildMember, TextChannel } from 'discord.js';
import type { Handler } from '..';
import { MessageEmbed } from 'discord.js';

export const handler = ({ client, db }: Handler) => {
	const disabled = ':x: Disabled';
	client.on('roleCreate', async role => {
		if (role.managed) return;
		const audits = await role.guild.fetchAuditLogs({
			type: 'ROLE_CREATE',
		});
		const log = audits.entries.first();
		const user = log?.executor;
		const whitelist: string[] = db.get(`whitelist_${role.guild.id}`);
		const personLimit: number = db.get(
			`${role.guild.id}_${user?.id}_rolecreate`
		);
		const limit: number = db.get(`rolecreate_${role.guild.id}`);
		if (whitelist?.some(id => id === user?.id)) return;
		if (user?.id === client.user?.id) return;
		if (!limit) return;
		if (!personLimit) return;
		const logsID = db.get(`logs_${role.guild.id}`);
		const punish = db.get(`punish_${role.guild.id}`) || disabled;
		const logs = client.channels.cache.get(logsID?.slice(1))! as TextChannel;
		const embed = new MessageEmbed()
			.setTitle('**Anti-Raid**')
			.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
			.setFooter({
				text: role.guild.name,
				iconURL: role.guild.iconURL() ?? '',
			})
			.addField('User', user?.tag || '')
			.addField('Case', 'Tried To Raid | breaking the role create limits')
			.addField('Punishment', punish)
			.setColor('#2f3136');
		const member = role.guild.members.cache.get(user?.id!);
		if (personLimit >= limit) {
			try {
				switch (punish) {
					case 'kick':
						await member?.kick(
							`You have been kicked for creating too many roles.`
						);
						break;

					case 'ban':
						await member?.ban({
							reason: `You have been banned for creating too many roles.`,
						});
						break;

					case 'demote':
						member?.roles.cache
							.filter(r => r.name !== '@everyone')
							.forEach(async r => await member?.roles.remove(r.id));
						break;

					case 'quarantine':
						const quarantineRole = member?.guild.roles.cache.find(
							role => role.name === 'Quarantine'
						);
						member?.roles.cache
							.filter(r => r.name !== '@everyone')
							.forEach(async r => await member?.roles.remove(r.id));
						member?.roles.add(quarantineRole!);
						break;
				}
				embed.addField(`${punish}ed`, 'Yes');
			} catch (_) {
				embed.addField(`${punish}ed`, 'No');
			} finally {
				logs.send({ embeds: [embed] });
			}
		} else db.add(`${role.guild.id}_${user?.id}_rolecreate`, 1);
	});

	client.on('roleDelete', async role => {
		if (role.managed) return;
		const audits = await role.guild.fetchAuditLogs({
			type: 'ROLE_DELETE',
		});
		const log = audits.entries.first();
		const user = log?.executor;
		const whitelist: GuildMember[] = db.get(`whitelist_${role.guild.id}`);
		const personLimit: number = db.get(
			`${role.guild.id}_${user?.id}_roledelete`
		);
		const limit: number = db.get(`roledelete_${role.guild.id}`);
		if (user?.id === client.user?.id) return;
		if (whitelist?.find(x => x.user.id === user?.id)) return;
		if (!personLimit) return;
		if (limit!) return;
		const logsID = db.get(`logs_${role.guild.id}`);
		const punish = db.get(`punish_${role.guild.id}`) || disabled;
		const logs = client.channels.cache.get(logsID?.slice(1))! as TextChannel;
		const embed = new MessageEmbed()
			.setTitle('**Anti-Raid**')
			.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
			.setFooter({
				text: role.guild.name,
				iconURL: role.guild.iconURL() ?? '',
			})
			.addField('User', user?.tag || '')
			.addField('Case', 'Tried To Raid | breaking the role delete limits')
			.addField('Punishment', punish)
			.setColor('#2f3136');
		const member = role.guild.members.cache.get(user?.id!);
		if (personLimit >= limit) {
			try {
				switch (punish) {
					case 'kick':
						await member?.kick(
							`You have been kicked for creating too many roles.`
						);
						break;

					case 'ban':
						await member?.ban({
							reason: `You have been banned for creating too many roles.`,
						});
						break;

					case 'demote':
						member?.roles.cache
							.filter(r => r.name !== '@everyone')
							.forEach(async r => await member?.roles.remove(r.id));
						break;

					case 'quarantine':
						const quarantineRole = member?.guild.roles.cache.find(
							role => role.name === 'Quarantine'
						);
						member?.roles.cache
							.filter(r => r.name !== '@everyone')
							.forEach(async r => await member?.roles.remove(r.id));
						member?.roles.add(quarantineRole!);
						break;
				}
				embed.addField(`${punish}ed`, 'Yes');
			} catch (_) {
				embed.addField(`${punish}ed`, 'No');
			} finally {
				logs.send({ embeds: [embed] });
			}
		} else db.add(`${role.guild.id}_${user?.id}_roledelete`, 1);
	});
};
