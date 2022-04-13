import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

export default {
	name: 'config',
	command: new SlashCommandBuilder()
		.setName('config')
		.setDescription('Displays config')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('show')
				.setDescription('Info about the server permissions')
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('channelcreatelimit')
				.setDescription('Set the channel create limit!')
				.addNumberOption((limit) =>
					limit.setName('limit').setDescription('The limit').setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('channeldeletelimit')
				.setDescription('Set the channel delete limit!')
				.addNumberOption((limit) =>
					limit.setName('limit').setDescription('The limit').setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('rolecreatelimit')
				.setDescription('Set the role create limit!')
				.addNumberOption((limit) =>
					limit.setName('limit').setDescription('The limit').setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('roledeletelimit')
				.setDescription('Set the role delete limit!')
				.addNumberOption((limit) =>
					limit.setName('limit').setDescription('The limit').setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('banlimit')
				.setDescription('Set the ban limit!')
				.addNumberOption((limit) =>
					limit.setName('limit').setDescription('The limit').setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('kicklimit')
				.setDescription('Set the kick limit!')
				.addNumberOption((limit) =>
					limit.setName('limit').setDescription('The limit').setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('punishment')
				.setDescription('Set the punishment!')
				.addStringOption((pun) =>
					pun
						.setName('punishment')
						.setDescription('The punishment')
						.setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('logs')
				.setDescription('Configure logs channel!')
				.addChannelOption((channel) =>
					channel
						.setName('channel')
						.setDescription('The channel')
						.setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand.setName('help').setDescription('Config Preview')
		),
	async run(client, interaction, db) {
		switch (interaction.options.getSubcommand()) {
			case 'show':
				const disabled = ':x: Disabled';
				const rcl = db.get(`rolecreate_${interaction.guild.id}`);
				const rdl = db.get(`roledelete_${interaction.guild.id}`);
				const ccl = db.get(`channelcreate_${interaction.guild.id}`);
				const cdl = db.get(`channeldelete_${interaction.guild.id}`);
				const bl = db.get(`banlimit_${interaction.guild.id}`);
				const kl = db.get(`kicklimit_${interaction.guild.id}`);
				const logs = db.get(`logs_${interaction.guild.id}`) || disabled;
				const punish = db.get(`punish_${interaction.guild.id}`);
				const logsChannel = client.channels.cache.get(logs) || disabled;
				const show = new MessageEmbed()
					.setTitle('**Anti-Raid | Config**')
					.setAuthor({
						name: interaction.user.tag,
						iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
					})
					.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
					.setFooter({
						text: interaction.guild.name,
						iconURL: interaction.guild.iconURL(),
					})
					.addField('Channel Create Limit', `${ccl || disabled}`)
					.addField('Channel Delete Limit', `${cdl || disabled}`)
					.addField('Role Create Limit', `${rcl || disabled}`)
					.addField('Role Delete Limit', `${rdl || disabled}`)
					.addField('Ban Limits', `${bl || disabled}`)
					.addField('Kick Limits', `${kl || disabled}`)
					.addField('Logs', logsChannel.toString() || disabled)
					.addField('Punishment', `${punish || disabled}`)
					.setColor('GREEN');
				await interaction.reply({ embeds: [show] });
				break;

			case 'channelcreatelimit':
				const ccLimit = interaction.options.getNumber('limit');
				if (ccLimit < 1)
					await interaction.reply(
						':x: | **The limit cannot be zero or negative number**'
					);
				db.set(`channelcreate_${interaction.guild.id}`, ccLimit);
				await interaction.reply(
					`**The channel Create limit has been set to ${ccLimit} **`
				);
				break;

			case 'channeldeletelimit':
				const cdLimit = interaction.options.getNumber('limit');
				if (cdLimit < 1)
					await interaction.reply(
						':x: | **The limit cannot be zero or negative number**'
					);
				db.set(`channeldelete_${interaction.guild.id}`, cdLimit);
				await interaction.reply(
					`**The channel Delete limit has been set to ${cdLimit} **`
				);
				break;

			case 'rolecreatelimit':
				const rcLimit = interaction.options.getNumber('limit');
				if (rcLimit < 1)
					await interaction.reply(
						':x: | **The limit cannot be zero or negative number**'
					);
				db.set(`rolecreate_${interaction.guild.id}`, rcLimit);
				await interaction.reply(
					`**The role Create limit has been set to ${rcLimit} **`
				);
				break;

			case 'roledeletelimit':
				const rdLimit = interaction.options.getNumber('limit');
				if (rdLimit < 1)
					await interaction.reply(
						':x: | **The limit cannot be zero or negative number**'
					);
				db.set(`roledelete_${interaction.guild.id}`, rdLimit);
				await interaction.reply(
					`**The role Delete limit has been set to ${rdLimit} **`
				);
				break;

			case 'banlimit':
				const banLimit = interaction.options.getNumber('limit');
				if (banLimit < 1)
					await interaction.reply(
						':x: | **The limit cannot be zero or negative number**'
					);
				db.set(`banlimit_${interaction.guild.id}`, banLimit);
				await interaction.reply(
					`**The ban limit has been set to ${banLimit} **`
				);
				break;

			case 'kicklimit':
				const kickLimit = interaction.options.getNumber('limit');
				if (kickLimit < 1)
					await interaction.reply(
						':x: | **The limit cannot be zero or negative number**'
					);
				db.set(`kicklimit_${interaction.guild.id}`, kickLimit);
				await interaction.reply(
					`**The kick limit has been set to ${kickLimit} **`
				);
				break;

			case 'punishment':
				const pun = interaction.options.getString('punishment');
				if (!(pun === 'kick' || pun === 'ban' || pun === 'demote')) {
					await interaction.reply(
						':x: | **The punishment can only be kick, ban or demote**'
					);
					break;
				}
				db.set(`punish_${interaction.guild.id}`, pun.toLowerCase());
				await interaction.reply(`**The punishment has been set to ${pun} **`);
				break;

			case 'logs':
				const channel = interaction.options.getChannel('channel');
				db.set(`logs_${interaction.guild.id}`, channel.id);
				channel.send('**Anti Raid logs Channel**');
				await interaction.reply(
					`**The logs channel has been set to <#${channel.id}> **`
				);
				break;

			case 'help':
				const ops = [
					'channelCreateLimit',
					'channelDeleteLimit',
					'roleCreateLimit',
					'roleDeleteLimit',
					'banLimit',
					'kickLimit',
					'logs',
					'show',
					'punishment',
				];
				const helpEmbed = new MessageEmbed()
					.setTitle('<:Settings:939853181180080168> **Anti-Raid | Config**')
					.setDescription(
						`
						**The Options are listed below:**
						config ${ops.join('\n config ')}
					`
					)
					.setColor('#FF0000')
					.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
					.setAuthor({
						name: interaction.user.tag,
						iconURL: interaction.user.displayAvatarURL(),
					})
					.setFooter({
						text: interaction.guild.name,
						iconURL: interaction.guild.iconURL(),
					});
				await interaction.reply({ embeds: [helpEmbed] });
				break;
		}
	},
};
