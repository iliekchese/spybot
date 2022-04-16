import { MessageEmbed } from 'discord.js';
export const handler = ({ client, db }) => {
    const disabled = ':x: Disabled';
    client.on('roleCreate', async (role) => {
        if (role.managed === true)
            return;
        const audits = await role.guild.fetchAuditLogs({
            type: 'ROLE_CREATE',
        });
        const log = audits.entries.first();
        const user = log?.executor;
        if (user?.id === client.user?.id)
            return;
        const whitelist = db.get(`whitelist_${role.guild.id}`);
        if (whitelist?.find(x => x.user.id === user?.id))
            return;
        const person = db.get(`${role.guild.id}_${user?.id}_rolecreate`);
        const limit = db.get(`rolecreate_${role.guild.id}`);
        if (!limit)
            return;
        if (!person)
            return;
        const logsID = db.get(`logs_${role.guild.id}`);
        const punish = db.get(`punish_${role.guild.id}`) || disabled;
        const logs = client.channels.cache.get(logsID);
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
        if (person >= limit) {
            try {
                switch (punish) {
                    case 'kick':
                        await role.guild.members.kick(user?.id || '', `You have been kicked for creating too many roles.`);
                        break;
                    case 'ban':
                        await role.guild.members.ban(user?.id || '', {
                            reason: `You have been banned for creating too many roles.`,
                        });
                        break;
                    case 'demote':
                        role.guild.members.cache
                            .get(user?.id || '')
                            ?.roles.cache.forEach(async (r) => {
                            if (r.name !== '@everyone') {
                                await role.guild.members.cache
                                    .get(user?.id || '')
                                    ?.roles.remove(r.id);
                            }
                        });
                        break;
                }
                embed.addField(`${punish}ed`, 'Yes');
                await role.guild.members.cache.get(user?.id || '')?.kick();
                await role.guild.members.ban(user?.id || '');
                logs?.send({ embeds: [embed] });
            }
            catch (_) {
                embed.addField(`${punish}ed`, 'No');
                logs?.send({ embeds: [embed] });
            }
        }
        else
            db.add(`${role.guild.id}_${user?.id}_rolecreate`, 1);
    });
    client.on('roleDelete', async (role) => {
        if (role.managed === true)
            return;
        const audits = await role.guild.fetchAuditLogs({
            type: 'ROLE_DELETE',
        });
        const log = audits.entries.first();
        const user = log?.executor;
        if (user?.id === client.user?.id)
            return;
        const whitelist = db.get(`whitelist_${role.guild.id}`);
        if (whitelist?.find(x => x.user.id === user?.id))
            return;
        const person = db.get(`${role.guild.id}_${user?.id}_roledelete`);
        const limit = db.get(`roledelete_${role.guild.id}`);
        if (limit === null)
            return;
        const logsID = db.get(`logs_${role.guild.id}`);
        const punish = db.get(`punish_${role.guild.id}`) || disabled;
        const logs = client.channels.cache.get(logsID);
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
        if (person >= limit) {
            try {
                switch (punish) {
                    case 'ban':
                        await role.guild.members.ban(user?.id || '', {
                            reason: `You have been banned for deleting too many roles.`,
                        });
                        break;
                    case 'kick':
                        await role.guild.members.kick(user?.id || '', `You have been kicked for deleting too many roles.`);
                        break;
                    case 'demote':
                        role.guild.members.cache
                            .get(user?.id || '')
                            ?.roles.cache.forEach(async (r) => {
                            if (r.name !== '@everyone') {
                                await role.guild.members.cache
                                    .get(user?.id || '')
                                    ?.roles.remove(r.id);
                            }
                        });
                }
                embed.addField(`${punish}ed`, 'Yes');
                logs?.send({ embeds: [embed] });
            }
            catch (_) {
                embed.addField(`${punish}ed`, 'No');
                logs?.send({ embeds: [embed] });
            }
        }
        else
            db.add(`${role.guild.id}_${user?.id}_roledelete`, 1);
    });
};
