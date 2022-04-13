import express from 'express';
import { Client, Collection, Intents, MessageEmbed } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';
import db from 'quick.db';
import('./handlers/command.js').then(({ handler }) => handler(client));
import('./handlers/slash.js').then(({ handler }) => handler(client));

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN || '');
const PREFIX = '.';

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
		await rest.put(
			Routes.applicationCommands('939629038178295828'), {
				body: client.slashCommands.map(c => c.command),
		})

		console.log("-------------------------------------");
		console.log('Successfully reloaded application (/) commands.');
		console.log("-------------------------------------");
	} catch (error) {
		console.error(error);
	}
	console.log(`[INFO]: Ready on client (${client.user?.tag})`);
	console.log(
		`[INFO]: watching ${client.guilds.cache.size} Servers, ${client.channels.cache.size} channels & ${client.users.cache.size} users`
	);
	console.log('-------------------------------------');
	client.user?.setActivity(' for Raiders | .help', {
		type: 'WATCHING',
	});
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.slashCommands.find(
		c => c.name === interaction.commandName
	);
	command?.run(client, interaction, db);
});

client.on('messageCreate', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(PREFIX)) return;

	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const cmd = args.shift()?.toLowerCase();

	const command = client.commands.get(cmd || '');
	command?.run(client, message, args, db);
});

client.on('roleCreate', async role => {
	if (role.managed === true) return;
	const log = await role.guild
		.fetchAuditLogs({
			type: 'ROLE_CREATE',
		})
		.then(audit => audit.entries.first());
	const user = log?.executor;
	if (user?.id === client.user?.id) return;
	let whitelist = db.get(`whitelist_${role.guild.id}`);
	if (whitelist && whitelist.find(x => x.user === user?.id)) {
		return;
	}
	let person = db.get(`${role.guild.id}_${user?.id}_rolecreate`);
	let limit = db.get(`rolecreate_${role.guild.id}`);
	if (limit === null) {
		return;
	}
	let logsID = db.get(`logs_${role.guild.id}`);
	let punish = db.get(`punish_${role.guild.id}`);

	const logs = client.channels.cache.get(logsID);

	if (person > limit - 1) {
		if (punish === 'ban') {
			await role.guild.members.ban(user?.id || '');
			try {
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
					.addField('Banned', 'Yes')
					.setColor('#2f3136');
				if (logs?.isText()) {
					logs.send({ embeds: [embed] });
				}
			} catch (_) {
				let embed = new MessageEmbed()
					.setTitle('**Anti-Raid**')
					.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
					.setFooter(role.guild.name + '', role.guild.iconURL() ?? '')
					.addField('User', user?.tag || '')
					.addField('Case', 'Tried To Raid | breaking the role create limits')
					.addField('Punishment', punish)
					.addField('Banned', 'No')
					.setColor('#2f3136');
				if (logs?.isText()) {
					logs.send({ embeds: [embed] });
				}
			}
		} else if (punish === 'kick') {
			try {
				await role.guild.members.cache.get(user?.id || '')?.kick();
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
					.addField('kicked', 'Yes')
					.setColor('#2f3136');
				if (logs?.isText()) {
					logs.send({ embeds: [embed] });
				}
			} catch (_) {
				let embed = new MessageEmbed()
					.setTitle('**Anti-Raid**')
					.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
					.setFooter(role.guild.name + '', role.guild.iconURL() ?? '')
					.addField('User', user?.tag || '')
					.addField('Case', 'Tried To Raid | breaking the role create limits')
					.addField('Punishment', punish)
					.addField('kicked', 'No')
					.setColor('#2f3136');
				if (logs?.isText()) {
					logs.send({ embeds: [embed] });
				}
			}
		} else if (punish === 'demote') {
			try {
				role.guild.members.cache.get(user?.id || '')?.roles.cache.forEach(r => {
					if (r.name !== '@everyone') {
						role.guild.members.cache.get(user?.id || '')?.roles.remove(r.id);
					}
				});
				const embed = new MessageEmbed()
					.setTitle('**Anti-Raid**')
					.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
					.setFooter(role.guild.name + '', role.guild.iconURL() ?? '')
					.addField('User', user?.tag || '')
					.addField('Case', 'Tried To Raid | breaking the role create limits')
					.addField('Punishment', punish)
					.addField('demoted', 'Yes')
					.setColor('#2f3136');

				if (logs?.isText()) {
					logs.send({ embeds: [embed] });
				}
			} catch (_) {
				const embed = new MessageEmbed()
					.setTitle('**Anti-Raid**')
					.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
					.setFooter(role.guild.name + '', role.guild.iconURL() ?? '')
					.setColor('#2f3136')
					.addField('User', user?.tag || '')
					.addField('Case', 'Tried to Raid | Breaking role create limits')
					.addField('Punishment', punish)
					.addField('demoted', 'No');

				if (logs?.isText()) {
					logs.send({ embeds: [embed] });
				}
			}
		}
	} else {
		db.add(`${role.guild.id}_${user?.id}_rolecreate`, 1);
		let pog = db.get(`${role.guild.id}_${user?.id}_rolecreate`);
		let embed = new MessageEmbed()
			.setTitle('**Anti-Raid**')
			.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
			.setFooter(role.guild.name + '', role.guild.iconURL() ?? '')
			.addField('User', user?.tag || '')
			.addField('Case', 'Creating Roles...')
			.addField('Punishment', punish)
			.addField('Times', `${pog || 0}/${limit || 0}`)
			.setColor('#2f3136');
		if (logs?.isText()) {
			logs.send({ embeds: [embed] });
		}
	}
});

client.on('roleDelete', async role => {
	if (role.managed === true) return;
	const log = await role.guild
		.fetchAuditLogs({
			type: 'ROLE_DELETE',
		})
		.then(audit => audit.entries.first());
	const user = log?.executor;
	if (user?.id === client.user?.id) return;
	let whitelist = db.get(`whitelist_${role.guild.id}`);
	if (whitelist && whitelist.find(x => x.user === user?.id)) {
		return;
	}
	let person = db.get(`${role.guild.id}_${user?.id}_roledelete`);
	let limit = db.get(`roledelete_${role.guild.id}`);
	if (limit === null) {
		return;
	}
	let logsID = db.get(`logs_${role.guild.id}`);
	let punish = db.get(`punish_${role.guild.id}`);
	let logs = client.channels.cache.get(logsID);
	if (person > limit - 1) {
		if (punish === 'ban') {
			role.guild.members
				.ban(user?.id || '')
				.then(_ => {
					let embed = new MessageEmbed()
						.setTitle('**Anti-Raid**')
						.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
						.setFooter(role.guild.name, role.guild.iconURL() ?? '')
						.addField('User', user?.tag || '')
						.addField('Case', 'Tried To Raid | breaking the role delete limits')
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
						.setFooter(role.guild.name + '', role.guild.iconURL() ?? '')
						.addField('User', user?.tag || '')
						.addField('Case', 'Tried To Raid | breaking the role delete limits')
						.addField('Punishment', punish)
						.addField('Banned', 'No')
						.setColor('#FF0000');
					if (logs?.isText()) {
						logs.send({ embeds: [embed] });
					}
				});
		} else if (punish === 'kick') {
			role.guild.members.cache
				.get(user?.id || '')
				?.kick()
				.then(xdbruhlolmoment => {
					let embed = new MessageEmbed()
						.setTitle('**Anti-Raid**')
						.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
						.setFooter(role.guild.name + '', role.guild.iconURL() ?? '')
						.addField('User', user?.tag || '')
						.addField('Case', 'Tried To Raid | breaking the role delete limits')
						.addField('Punishment', punish)
						.addField('kicked', 'Yes')
						.setColor('#2f3136');
					if (logs?.isText()) {
						logs.send({ embeds: [embed] });
					}
				})
				.catch(err => {
					let embed = new MessageEmbed()
						.setTitle('**Anti-Raid**')
						.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
						.setFooter(
							role.guild.name + ' | made by legendjs#0001',
							role.guild.iconURL() ?? ''
						)
						.addField('User', user?.tag || '')
						.addField('Case', 'Tried To Raid | breaking the role delete limits')
						.addField('Punishment', punish)
						.addField('kicked', 'No')
						.setColor('#FF0000');
					if (logs?.isText()) {
						logs.send({ embeds: [embed] });
					}
				});
		} else if (punish === 'demote') {
			try {
				role.guild.members.cache.get(user?.id || '')?.roles.cache.forEach(r => {
					if (r.name !== '@everyone') {
						role.guild.members.cache.get(user?.id || '')?.roles.remove(r.id);
					}
				});
				let embed = new MessageEmbed()
					.setTitle('**Anti-Raid**')
					.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
					.setFooter(role.guild.name + '', role.guild.iconURL() ?? '')
					.addField('User', user?.tag || '')
					.addField('Case', 'Tried To Raid | breaking the role delete limits')
					.addField('Punishment', punish)
					.addField('demoted', 'Yes')
					.setColor('#2f3136');
				if (logs?.isText()) {
					logs.send({ embeds: [embed] });
				}
			} catch (err) {
				let embed = new MessageEmbed()
					.setTitle('**Anti-Raid**')
					.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
					.setFooter(role.guild.name + '', role.guild.iconURL() ?? '')
					.setColor('#2f3136')
					.addField('User', user?.tag || '')
					.addField('Case', 'Tried to Raid | Breaking role delete limits')
					.addField('Punishment', punish)
					.addField('demoted', 'No');
				if (logs?.isText()) {
					logs.send({ embeds: [embed] });
				}
			}
		}
	} else {
		db.add(`${role.guild.id}_${user?.id}_roledelete`, 1);
		let pog = db.get(`${role.guild.id}_${user?.id}_roledelete`);
		let embed = new MessageEmbed()
			.setTitle('**Anti-Raid**')
			.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
			.setFooter(role.guild.name + '', role.guild.iconURL() ?? '')
			.addField('User', user?.tag || '')
			.addField('Case', 'Deleting Roles...')
			.addField('Punishment', punish)
			.addField('Times', `${pog || 0}/${limit || 0}`)
			.setColor('#2f3136');
		if (logs?.isText()) {
			logs.send({ embeds: [embed] });
		}
	}
});

client.on('channelCreate', async channel => {
	const log = await channel.guild
		.fetchAuditLogs({
			type: 'CHANNEL_CREATE',
		})
		.then(audit => audit.entries.first());
	const user = log?.executor;
	if (user?.id === client.user?.id) return;
	let whitelist = db.get(`whitelist_${channel.guild.id}`);
	if (whitelist && whitelist.find(x => x.user === user?.id)) {
		return;
	}
	let person = db.get(`${channel.guild.id}_${user?.id}_channelcreate`);
	let limit = db.get(`channelcreate_${channel.guild.id}`);
	if (limit === null) {
		return;
	}
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
						.addField(
							'Case',
							'Tried To Raid | breaking the channel create limits'
						)
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
						.addField(
							'Case',
							'Tried To Raid | breaking the channel create limits'
						)
						.addField('Punishment', punish)
						.addField('Banned', 'No')
						.setColor('#2f3136');
					if (logs?.isText()) {
						logs.send({ embeds: [embed] });
					}
				});
		} else if (punish === 'kick') {
			channel.guild.members.cache
				.get(user?.id || '')
				?.kick()
				.then(jsisj => {
					let embed = new MessageEmbed()
						.setTitle('**Anti-Raid**')
						.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
						.setFooter(channel.guild.name + '', channel.guild.iconURL() ?? '')
						.addField('User', user?.tag || '')
						.addField(
							'Case',
							'Tried To Raid | breaking the channel create limits'
						)
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
						.addField(
							'Case',
							'Tried To Raid | breaking the channel create limits'
						)
						.addField('Punishment', punish)
						.addField('kicked', 'No')
						.setColor('#2f3136');
					if (logs?.isText()) {
						logs.send({ embeds: [embed] });
					}
				});
		} else if (punish === 'demote') {
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
					.addField(
						'Case',
						'Tried To Raid | breaking the channel create limits'
					)
					.addField('Punishment', punish)
					.addField('demoted', 'Yes')
					.setColor('GREEN');
				if (logs?.isText()) {
					logs.send({ embeds: [embed] });
				}
			} catch (_) {
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
	} else {
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

client.on('channelDelete', async channel => {
	const guild = client.guilds.cache.find(g =>
		Array.from(g.channels.cache.values()).some(c => c.id === channel.id)
	);
	const log = await guild
		?.fetchAuditLogs({
			type: 'CHANNEL_DELETE',
		})
		.then(audit => audit.entries.first());
	const user = log?.executor;
	if (user?.id === client.user?.id) return;
	let whitelist = db.get(`whitelist_${guild?.id}`);
	if (whitelist && whitelist.find(x => x.user === user?.id)) {
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
				.then(hahsh => {
					let embed = new MessageEmbed()
						.setTitle('**Anti-Raid**')
						.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
						.setFooter(guild.name, guild.iconURL() ?? '')
						.addField('User', user?.tag || '')
						.addField(
							'Case',
							'Tried To Raid | breaking the channel delete limits'
						)
						.addField('Punishment', punish)
						.addField('Banned', 'Yes')
						.setColor('#2f3136');
					if (logs?.isText()) {
						logs.send({ embeds: [embed] });
					}
				})
				.catch(err => {
					let embed = new MessageEmbed()
						.setTitle('**Anti-Raid**')
						.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
						.setFooter(guild.name + '', guild.iconURL() ?? '')
						.addField('User', user?.tag || '')
						.addField(
							'Case',
							'Tried To Raid | breaking the channel delete limits'
						)
						.addField('Punishment', punish)
						.addField('Banned', 'No')
						.setColor('##2f3136');
					if (logs?.isText()) {
						logs.send({ embeds: [embed] });
					}
				});
		} else if (punish === 'kick') {
			try {
				guild?.members.cache
					.get(user?.id || '')
					?.kick()
					.then(gsy => {
						let embed = new MessageEmbed()
							.setTitle('**Anti-Raid**')
							.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
							.setFooter(guild.name, guild.iconURL() ?? '')
							.addField('User', user?.tag || '')
							.addField(
								'Case',
								'Tried To Raid | breaking the channel delete limits'
							)
							.addField('Punishment', punish)
							.addField('kicked', 'Yes')
							.setColor('#2f3136');
						if (logs?.isText()) {
							logs.send({ embeds: [embed] });
						}
					});
			} catch (err) {
				let embed = new MessageEmbed()
					.setTitle('**Anti-Raid**')
					.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
					.setFooter(guild?.name || '', guild?.iconURL() ?? '')
					.addField('User', user?.tag || '')
					.addField(
						'Case',
						'Tried To Raid | breaking the channel delete limits'
					)
					.addField('Punishment', punish)
					.addField('kicked', 'No')
					.setColor('#2f3136');
				if (logs?.isText()) {
					logs.send({ embeds: [embed] });
				}
			}
		} else if (punish === 'demote') {
			try {
				guild?.members.cache.get(user?.id || '')?.roles.cache.forEach(r => {
					if (r.name !== '@everyone') {
						guild?.members.cache.get(user?.id || '')?.roles.remove(r.id);
					}
				});
				let embed = new MessageEmbed()
					.setTitle('**Anti-Raid**')
					.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
					.setFooter(guild?.name + '', guild?.iconURL() ?? '')
					.addField('User', user?.tag || '')
					.addField(
						'Case',
						'Tried To Raid | breaking the channel delete limits'
					)
					.addField('Punishment', punish)
					.addField('demoted', 'Yes')
					.setColor('#2f3136');
				if (logs?.isText()) {
					logs.send({ embeds: [embed] });
				}
			} catch (err) {
				let embed = new MessageEmbed()
					.setTitle('**Anti-Raid**')
					.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
					.setFooter(guild?.name || '', guild?.iconURL() ?? '')
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
	} else {
		db.add(`${guild?.id}_${guild?.id}_channeldelete`, 1);
		let pog = db.get(`${guild?.id}_${user?.id}_channeldelete`);
		let bruh = db.get(`channeldelete_${guild?.id}`);
		let embed = new MessageEmbed()
			.setTitle('**Anti-Raid**')
			.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
			.setFooter(guild?.name || '', guild?.iconURL() ?? '')
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

client.on('guildMemberRemove', async member => {
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
	if (user?.id === client.user?.id) return;
	let whitelist = db.get(`whitelist_${member.guild.id}`);
	if (whitelist && whitelist.find(x => x.user === user?.id)) {
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
				.catch(err => {
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
		} else if (punish === 'kick') {
			member?.guild?.members?.cache
				?.get(user?.id || '')
				?.kick()
				.then(ehbruh => {
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
		} else if (punish === 'demote') {
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
			} catch (_) {
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
	} else {
		db.add(`${member.guild.id}_${user?.id}_kicklimit`, 1);
		let pog = db.get(`${member.guild.id}_${user?.id}_kicklimit`);
		let bruh = db.get(`kicklimit_${member.guild.id}`);
		let embed = new MessageEmbed()
			.setTitle('**Anti-Raid**')
			.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
			.setFooter(
				member.guild.name + ' | made by legendjs#0001',
				member.guild.iconURL() ?? ''
			)
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

client.on('guildBanAdd', async (ban, userr) => {
	let member = ban.guild.members.cache.get(ban.user.id);
	const log = await member?.guild
		.fetchAuditLogs({
			type: 'MEMBER_BAN_ADD',
		})
		.then(audit => audit.entries.first());
	const user = log?.executor;
	if (user?.id === client.user?.id) return;
	let whitelist = db.get(`whitelist_${member?.guild.id}`);
	if (whitelist && whitelist.find(x => x.user === user?.id)) {
		return;
	}
	let person = db.get(`${member?.guild.id}_${user?.id}_banlimit`);
	let limit = db.get(`banlimit_${member?.guild.id}`);
	if (limit === null) {
		return;
	}
	let logsID = db.get(`logs_${member?.guild.id}`);
	let logs = client.channels.cache.get(logsID);
	let punish = db.get(`punish_${member?.guild.id}`);
	if (person > limit - 1) {
		if (punish === 'ban') {
			member?.guild.members
				.ban(user?.id || '')
				.then(lolxdbruh => {
					let embed = new MessageEmbed()
						.setTitle('**Anti-Raid**')
						.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
						.setFooter(member?.guild.name || '', member?.guild.iconURL() ?? '')
						.addField('User', user?.tag || '')
						.addField('Case', 'Tried To Raid | breaking the ban limits')
						.addField('Punishment', punish)
						.addField('Banned', 'Yes')
						.setColor('#2f3136');
					if (logs?.isText()) {
						logs.send({ embeds: [embed] });
					}
				})
				.catch(err => {
					let embed = new MessageEmbed()
						.setTitle('**Anti-Raid**')
						.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
						.setFooter(member?.guild.name || '', member?.guild.iconURL() || '')
						.addField('User', user?.tag || '')
						.addField('Case', 'Tried To Raid | breaking the ban limits')
						.addField('Punishment', punish)
						.addField('Banned', 'No')
						.setColor('#2f3136');
					if (logs?.isText()) {
						logs.send({ embeds: [embed] });
					}
				});
		} else if (punish === 'kick') {
			member?.guild?.members?.cache
				?.get(user?.id || '')
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
					if (logs?.isText()) {
						logs.send({ embeds: [embed] });
					}
				})
				.catch(err => {
					let embed = new MessageEmbed()
						.setTitle('**Anti-Raid**')
						.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
						.setFooter(member?.guild.name || '', member?.guild.iconURL() ?? '')
						.addField('User', user?.tag || '')
						.addField('Case', 'Tried To Raid | breaking the ban limits')
						.addField('Punishment', punish)
						.addField('kicked', 'No')
						.setColor('#2f3136');
					if (logs?.isText()) {
						logs.send({ embeds: [embed] });
					}
				});
		} else if (punish === 'demote') {
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
					.setFooter(member?.guild.name || '', member?.guild.iconURL() ?? '')
					.addField('User', user?.tag || '')
					.addField('Case', 'Tried To Raid | breaking the ban limits')
					.addField('Punishment', punish)
					.addField('demoted', 'Yes')
					.setColor('#2f3136');
				if (logs?.isText()) {
					logs.send({ embeds: [embed] });
				}
			} catch (_) {
				let embed = new MessageEmbed()
					.setTitle('**Anti-Raid**')
					.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
					.setFooter(member?.guild.name || '', member?.guild.iconURL() ?? '')
					.setColor('#2f3136')
					.addField('User', user?.tag || '')
					.addField('Case', 'Tried to Raid | Breaking ban limits')
					.addField('Punishment', punish)
					.addField('demoted', 'No');
				if (logs?.isText()) {
					logs.send({ embeds: [embed] });
				}
			}
		}
	} else {
		db.add(`${member?.guild.id}_${user?.id}_banlimit`, 1);
		let pog = db.get(`${member?.guild.id}_${user?.id}_banlimit`);
		let bruh = db.get(`banlimit_${member?.guild.id}`);
		let embed = new MessageEmbed()
			.setTitle('**Anti-Raid**')
			.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
			.setFooter(member?.guild.name || '', member?.guild.iconURL() ?? '')
			.addField('User', user?.tag || '')
			.addField('Case', 'banning members...')
			.addField('Punishment', punish)
			.addField('Times', `${pog || 0}/${bruh || 0}`)
			.setColor('#2f3136');
		if (logs?.isText()) {
			logs.send({ embeds: [embed] });
		}
	}
});

const app = express();

app.get('/', (_, res) => {
	res.send('hello');
});

app.listen(3000, () => {
	console.log('Project is ready!');
});

client
	.login(process.env.TOKEN)
	.catch(_ => console.log('[ERROR]: Invalid Token Provided'));
