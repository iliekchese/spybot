import { Client, Collection, Intents, MessageEmbed, } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';
import { Database } from '@devsnowflake/quick.db';
import { drawCard, LinearGradient } from 'discord-welcome-card';
import Fastify from 'fastify';
import { readdir } from 'fs/promises';
process.on('uncaughtException', ({ name, message, cause }) => {
    console.log(`${name}: ${message}`);
    console.log('--------------------------');
    console.log(cause + '\n');
});
const handlers = await readdir('./handlers/');
handlers
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
    import(`./handlers/${file}`).then(({ handler }) => handler({ client, db }));
});
const db = new Database('database.db');
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN || '');
console.log('[INFO]: Loading...');
console.log('-------------------------------------');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.commands = new Collection();
client.slashCommands = [];
console.log('[CREDITS]: made by eldi mindcrafter#0001 & AngelNext#9162');
client.once('ready', async () => {
    try {
        await rest.put(Routes.applicationCommands('939629038178295828'), {
            body: client.slashCommands.map(c => c.command),
        });
        console.log('-------------------------------------');
        console.log('Successfully reloaded application (/) commands.');
        console.log('-------------------------------------');
    }
    catch (error) {
        console.error(error);
    }
    console.log(`[INFO]: Ready on client (${client.user?.tag})`);
    console.log(`[INFO]: watching ${client.guilds.cache.size} Servers, ${client.channels.cache.size} channels & ${client.users.cache.size} users`);
    console.log('-------------------------------------');
    client.user?.setActivity(' for Raiders | .help', {
        type: 'WATCHING',
    });
});
client.on('channelCreate', async (channel) => {
    const log = await channel.guild
        .fetchAuditLogs({
        type: 'CHANNEL_CREATE',
    })
        .then(audit => audit.entries.first());
    const user = log?.executor;
    if (user?.id === client.user?.id)
        return;
    let whitelist = db.get(`whitelist_${channel.guild.id}`);
    if (whitelist &&
        whitelist.find((x) => x.user === user?.id)) {
        return;
    }
    let person = db.get(`${channel.guild.id}_${user?.id}_channelcreate`);
    let limit = db.get(`channelcreate_${channel.guild.id}`);
    if (!limit)
        return;
    let logsID = db.get(`logs_${channel.guild.id}`);
    let logs = client.channels.cache.get(logsID);
    let punish = db.get(`punish_${channel.guild.id}`);
    if (person > limit - 1) {
        if (punish === 'ban') {
            channel.guild.members
                .ban(user?.id || '')
                .then(_ => {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(channel.guild.name + '', channel.guild.iconURL() ?? '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the channel create limits')
                    .addField('Punishment', punish)
                    .addField('Banned', 'Yes')
                    .setColor('#2f3136');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            })
                .catch(_ => {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(channel.guild.name + '', channel.guild.iconURL() ?? '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the channel create limits')
                    .addField('Punishment', punish)
                    .addField('Banned', 'No')
                    .setColor('#2f3136');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            });
        }
        else if (punish === 'kick') {
            channel.guild.members.cache
                .get(user?.id || '')
                ?.kick()
                .then(_jsisj => {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(channel.guild.name + '', channel.guild.iconURL() ?? '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the channel create limits')
                    .addField('Punishment', punish)
                    .addField('kicked', 'Yes')
                    .setColor('GREEN');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            })
                .catch(_ => {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(channel.guild.name + '', channel.guild.iconURL() ?? '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the channel create limits')
                    .addField('Punishment', punish)
                    .addField('kicked', 'No')
                    .setColor('#2f3136');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            });
        }
        else if (punish === 'demote') {
            try {
                channel?.guild?.members?.cache
                    ?.get(user?.id || '')
                    ?.roles.cache.forEach(r => {
                    if (r.name !== '@everyone') {
                        channel?.guild?.members?.cache
                            ?.get(user?.id || '')
                            ?.roles.remove(r.id);
                    }
                });
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(channel.guild.name + '', channel.guild.iconURL() || '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the channel create limits')
                    .addField('Punishment', punish)
                    .addField('demoted', 'Yes')
                    .setColor('GREEN');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            }
            catch (_) {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(channel.guild.name + '', channel.guild.iconURL() || '')
                    .setColor('#FF0000')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried to Raid | Breaking channel create limits')
                    .addField('Punishment', punish)
                    .addField('demoted', 'No');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            }
        }
    }
    else {
        db.add(`${channel.guild.id}_${user?.id}_channelcreate`, 1);
        let pog = db.get(`${channel.guild.id}_${user?.id}_channelcreate`);
        let bruh = db.get(`channelcreate_${channel.guild.id}`);
        let embed = new MessageEmbed()
            .setTitle('**Anti-Raid**')
            .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
            .setFooter(channel.guild.name || '', channel.guild.iconURL() ?? '')
            .addField('User', user?.tag || '')
            .addField('Case', 'Creating channels...')
            .addField('Punishment', punish)
            .addField('Times', `${pog || 0}/${bruh || 0}`)
            .setColor('#2f3136');
        if (logs?.isText()) {
            logs.send({ embeds: [embed] });
        }
    }
});
client.on('channelDelete', async (channel) => {
    const guild = client.guilds.cache.find(g => Array.from(g.channels.cache.values()).some(c => c.id === channel.id));
    const log = await guild
        ?.fetchAuditLogs({
        type: 'CHANNEL_DELETE',
    })
        .then(audit => audit.entries.first());
    const user = log?.executor;
    if (user?.id === client.user?.id)
        return;
    let whitelist = db.get(`whitelist_${guild?.id}`);
    if (whitelist &&
        whitelist.find((x) => x.user === user?.id)) {
        return;
    }
    let person = db.get(`${guild?.id}_${user?.id}_channeldelete`);
    let limit = db.get(`channeldelete_${guild?.id}`);
    if (limit === null) {
        return;
    }
    let logsID = db.get(`logs_${guild?.id}`);
    let logs = client.channels.cache.get(logsID);
    let punish = db.get(`punish_${guild?.id}`);
    if (person > limit - 1) {
        if (punish === 'ban') {
            guild?.members
                .ban(user?.id || '')
                .then(_hahsh => {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(guild.name, guild.iconURL() ?? '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the channel delete limits')
                    .addField('Punishment', punish)
                    .addField('Banned', 'Yes')
                    .setColor('#2f3136');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            })
                .catch(_err => {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(guild.name + '', guild.iconURL() ?? '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the channel delete limits')
                    .addField('Punishment', punish)
                    .addField('Banned', 'No')
                    .setColor('##2f3136');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            });
        }
        else if (punish === 'kick') {
            try {
                guild?.members.cache
                    .get(user?.id || '')
                    ?.kick()
                    .then(_ => {
                    let embed = new MessageEmbed()
                        .setTitle('**Anti-Raid**')
                        .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                        .setFooter(guild.name, guild.iconURL() ?? '')
                        .addField('User', user?.tag || '')
                        .addField('Case', 'Tried To Raid | breaking the channel delete limits')
                        .addField('Punishment', punish)
                        .addField('kicked', 'Yes')
                        .setColor('#2f3136');
                    if (logs?.isText()) {
                        logs.send({ embeds: [embed] });
                    }
                });
            }
            catch (err) {
                const embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(guild?.name || '', guild?.iconURL() ?? '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the channel delete limits')
                    .addField('Punishment', punish)
                    .addField('kicked', 'No')
                    .setColor('#2f3136');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            }
        }
        else if (punish === 'demote') {
            try {
                guild?.members.cache.get(user?.id || '')?.roles.cache.forEach(r => {
                    if (r.name !== '@everyone')
                        guild?.members.cache.get(user?.id || '')?.roles.remove(r.id);
                });
                const embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter({
                    text: guild?.name + '',
                    iconURL: guild?.iconURL() ?? '',
                })
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the channel delete limits')
                    .addField('Punishment', punish)
                    .addField('demoted', 'Yes')
                    .setColor('#2f3136');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            }
            catch (err) {
                const embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter({
                    text: guild?.name || '',
                    iconURL: guild?.iconURL() ?? '',
                })
                    .setColor('#2f3136')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried to Raid | Breaking channel delete limits')
                    .addField('Punishment', punish)
                    .addField('demoted', 'No');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            }
        }
    }
    else {
        db.add(`${guild?.id}_${guild?.id}_channeldelete`, 1);
        const pog = db.get(`${guild?.id}_${user?.id}_channeldelete`);
        const bruh = db.get(`channeldelete_${guild?.id}`);
        const embed = new MessageEmbed()
            .setTitle('**Anti-Raid**')
            .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
            .setFooter({ text: guild?.name || '', iconURL: guild?.iconURL() ?? '' })
            .addField('User', user?.tag || '')
            .addField('Case', 'Deleting channels...')
            .addField('Punishment', punish || ':x: Disabled')
            .addField('Times', `${pog || 0}/${bruh || 0}`)
            .setColor('#2f3136');
        if (logs?.isText()) {
            logs.send({ embeds: [embed] });
        }
    }
});
client.on('guildMemberRemove', async (member) => {
    const _user = member.user;
    const userData = [
        `${member.guild.id}_${_user.id}_rolecreate`,
        `${member.guild.id}_${_user.id}_roledelete`,
        `${member.guild.id}_${_user.id}_channelcreate`,
        `${member.guild.id}_${_user.id}_channeldelete`,
        `${member.guild.id}_${_user.id}_banlimit`,
        `${member.guild.id}_${_user.id}_kicklimit`,
    ];
    userData.forEach(data => db.delete(data));
    const log = await member.guild
        .fetchAuditLogs({
        type: 'MEMBER_KICK',
    })
        .then(audit => audit.entries.first());
    const user = log?.executor;
    if (user?.id === client.user?.id)
        return;
    let whitelist = db.get(`whitelist_${member.guild.id}`);
    if (whitelist &&
        whitelist.find((x) => x.user === user?.id)) {
        return;
    }
    let person = db.get(`${member.guild.id}_${user?.id}_kicklimit`);
    let limit = db.get(`kicklimit_${member.guild.id}`);
    if (limit === null) {
        return;
    }
    let logsID = db.get(`logs_${member.guild.id}`);
    let punish = db.get(`punish_${member.guild.id}`);
    let logs = client.channels.cache.get(logsID);
    if (person > limit - 1) {
        if (punish === 'ban') {
            member.guild.members
                .ban(user?.id || '')
                .then(_ => {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(member.guild.name + '', member.guild.iconURL() ?? '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the kick limits')
                    .addField('Punishment', punish)
                    .addField('Banned', 'Yes')
                    .setColor('#2f3136');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            })
                .catch(_err => {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(member.guild.name + '', member.guild.iconURL() ?? '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the kick limits')
                    .addField('Punishment', punish)
                    .addField('Banned', 'No')
                    .setColor('#2f3136');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            });
        }
        else if (punish === 'kick') {
            member?.guild?.members?.cache
                ?.get(user?.id || '')
                ?.kick()
                .then(_ehbruh => {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(member.guild.name + '', member.guild.iconURL() ?? '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the kick limits')
                    .addField('Punishment', punish)
                    .addField('kicked', 'Yes')
                    .setColor('#2f3136');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            })
                .catch(_ => {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(member.guild.name + '', member?.guild.iconURL() ?? '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the kick limits')
                    .addField('Punishment', punish)
                    .addField('kicked', 'No')
                    .setColor('#2f3136');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            });
        }
        else if (punish === 'demote') {
            try {
                member?.guild?.members?.cache
                    ?.get(user?.id || '')
                    ?.roles.cache.forEach(r => {
                    if (r.name !== '@everyone') {
                        member?.guild?.members?.cache
                            ?.get(user?.id || '')
                            ?.roles.remove(r.id);
                    }
                });
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(member.guild.name + '', member.guild.iconURL() ?? '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the kick limits')
                    .addField('Punishment', punish)
                    .addField('demoted', 'Yes')
                    .setColor('#2f3136');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            }
            catch (_) {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(member.guild.name + '', member.guild.iconURL() ?? '')
                    .setColor('#2f3136')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried to Raid | Breaking kick limits')
                    .addField('Punishment', punish)
                    .addField('demoted', 'No');
                if (logs?.isText()) {
                    logs.send({ embeds: [embed] });
                }
            }
        }
    }
    else {
        db.add(`${member.guild.id}_${user?.id}_kicklimit`, 1);
        let pog = db.get(`${member.guild.id}_${user?.id}_kicklimit`);
        let bruh = db.get(`kicklimit_${member.guild.id}`);
        let embed = new MessageEmbed()
            .setTitle('**Anti-Raid**')
            .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
            .setFooter(member.guild.name + ' | made by legendjs#0001', member.guild.iconURL() ?? '')
            .addField('User', user?.tag || '')
            .addField('Case', 'kicking members...')
            .addField('Punishment', punish)
            .addField('Times', `${pog || 0}/${bruh || 0}`)
            .setColor('#2f3136');
        if (logs?.isText()) {
            logs.send({ embeds: [embed] });
        }
    }
});
client.on('guildBanAdd', async (ban) => {
    let member = ban.guild.members.cache.get(ban.user.id);
    const log = await member?.guild
        .fetchAuditLogs({
        type: 'MEMBER_BAN_ADD',
    })
        .then(audit => audit.entries.first());
    const user = log?.executor;
    if (user?.id === client.user?.id)
        return;
    let whitelist = db.get(`whitelist_${member?.guild.id}`);
    if (whitelist &&
        whitelist.find((x) => x.user === user?.id)) {
        return;
    }
    let person = db.get(`${member?.guild.id}_${user?.id}_banlimit`);
    let limit = db.get(`banlimit_${member?.guild.id}`);
    if (limit === null) {
        return;
    }
    const logsID = db.get(`logs_${member?.guild.id}`);
    const logs = client.channels.cache.get(logsID.slice(1));
    let punish = db.get(`punish_${member?.guild.id}`);
    if (person > limit - 1) {
        if (punish === 'ban') {
            member?.guild.members
                .ban(user?.id || '')
                .then(_lolxdbruh => {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(member?.guild.name || '', member?.guild.iconURL() ?? '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the ban limits')
                    .addField('Punishment', punish)
                    .addField('Banned', 'Yes')
                    .setColor('#2f3136');
                logs?.send({ embeds: [embed] });
            })
                .catch(_err => {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(member?.guild.name || '', member?.guild.iconURL() || '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the ban limits')
                    .addField('Punishment', punish)
                    .addField('Banned', 'No')
                    .setColor('#2f3136');
                logs?.send({ embeds: [embed] });
            });
        }
        else if (punish === 'kick') {
            member?.guild.members.cache
                .get(user?.id || '')
                ?.kick()
                .then(_ => {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(member?.guild.name || '', member?.guild.iconURL() ?? '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the ban limits')
                    .addField('Punishment', punish)
                    .addField('kicked', 'Yes')
                    .setColor('#2f3136');
                logs?.send({ embeds: [embed] });
            })
                .catch(_ => {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter({
                    text: member?.guild.name || '',
                    iconURL: member?.guild.iconURL() ?? '',
                })
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the ban limits')
                    .addField('Punishment', punish)
                    .addField('kicked', 'No')
                    .setColor('#2f3136');
                logs?.send({ embeds: [embed] });
            });
        }
        else if (punish === 'demote') {
            try {
                member?.guild.members.cache
                    .get(user?.id || '')
                    ?.roles.cache.forEach(r => {
                    if (r.name !== '@everyone') {
                        member?.guild?.members?.cache
                            ?.get(user?.id || '')
                            ?.roles.remove(r.id);
                    }
                });
                const embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(member?.guild.name || '', member?.guild.iconURL() ?? '')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried To Raid | breaking the ban limits')
                    .addField('Punishment', punish)
                    .addField('demoted', 'Yes')
                    .setColor('#2f3136');
                logs?.send({ embeds: [embed] });
            }
            catch (_) {
                let embed = new MessageEmbed()
                    .setTitle('**Anti-Raid**')
                    .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
                    .setFooter(member?.guild.name || '', member?.guild.iconURL() ?? '')
                    .setColor('#2f3136')
                    .addField('User', user?.tag || '')
                    .addField('Case', 'Tried to Raid | Breaking ban limits')
                    .addField('Punishment', punish)
                    .addField('demoted', 'No');
                logs?.send({ embeds: [embed] });
            }
        }
    }
    else {
        db.add(`${member?.guild.id}_${user?.id}_banlimit`, 1);
        const pog = db.get(`${member?.guild.id}_${user?.id}_banlimit`);
        const bruh = db.get(`banlimit_${member?.guild.id}`);
        const embed = new MessageEmbed()
            .setTitle('**Anti-Raid**')
            .setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
            .setFooter(member?.guild.name || '', member?.guild.iconURL() ?? '')
            .addField('User', user?.tag || '')
            .addField('Case', 'banning members...')
            .addField('Punishment', punish)
            .addField('Times', `${pog || 0}/${bruh || 0}`)
            .setColor('#2f3136');
        logs?.send({ embeds: [embed] });
    }
});
client.on('guildMemberAdd', async (member) => {
    const image = await drawCard({
        theme: 'circuit',
        text: {
            title: 'Welcome to Spy Bot Support',
            text: member.user.tag,
            subtitle: 'Please read the Rules',
            color: '#88f',
        },
        avatar: {
            image: member.displayAvatarURL({ format: 'png' }),
            outlineWidth: 5,
            outlineColor: new LinearGradient(['#33f'], ['#f33']),
        },
        background: 'https://images.unsplash.com/photo-1456154875099-97a3a56074d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHVuaXZlcnNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        blur: 1,
        border: true,
        rounded: true,
    });
    const welcomeChannel = client.channels.cache.get('964225446420041809');
    welcomeChannel.send({ files: [image] });
});
const server = Fastify();
server.get('/', async () => 'Hello World');
try {
    await server.listen(3000, '0.0.0.0');
    await client.login(process.env.TOKEN);
}
catch (e) {
    console.error('[ERROR]: The bot or the server failed to start');
}
