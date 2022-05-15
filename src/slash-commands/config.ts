import type { Slash } from '../types';
import type { TextChannel } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed, Permissions } from 'discord.js';
import { prisma } from '../database';
import { PunishOption } from '@prisma/client';

export default {
	name: "config",
	command: new SlashCommandBuilder()
		.setName('config')
		.setDescription('Displays config')
		.addSubcommand(subcommand =>
			subcommand.setName('show').setDescription('Info about the server permissions')
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('punishment')
				.setDescription('Set the punishment!')
				.addStringOption(pun =>
					pun
						.setName('punishment')
						.setDescription('The punishment')
						.addChoices(
							{ name: 'BAN', value: 'BAN' },
							{ name: 'KICK', value: 'KICK' },
							{ name: 'DEMOTE', value: 'DEMOTE' },
							{ name: 'QUARANTINE', value: 'QUARANTINE' }
						)
						.setRequired(true)
				)
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('logs')
				.setDescription('Configure logs channel!')
				.addChannelOption(channel =>
					channel.setName('channel').setDescription('The channel').setRequired(true)
				)
		)
		.addSubcommand(subcommand => subcommand.setName('help').setDescription('Config Preview')),

	async run({ interaction }) {
		const logs = await prisma.channel.findUnique({
			where: { guild_type: { guild: interaction.guildId!, type: 'LOGS' } },
			select: { channel: true },
		});
		switch (interaction.options.getSubcommand()) {
			case 'show':
				const disabled = ':x: Disabled';
				const punish = await prisma.punish.findUnique({
					where: { guild: interaction.guildId! },
					select: { option: true },
				});
				const show = new MessageEmbed()
					.setTitle('**Spy Bot | Config**')
					.setAuthor({
						name: interaction.user.tag,
						iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
					})
					.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
					.setFooter({
						text: interaction.guild?.name || '',
						iconURL: interaction.guild?.iconURL() ?? '',
					})
					.addField('Logs', logs?.channel ? `<#${logs.channel}>` : disabled)
					.addField('Punishment', punish?.option.toLowerCase() ?? disabled)
					.setColor('GREEN');
				await interaction.reply({ embeds: [show] });
				break;

			case 'punishment':
				if (!interaction.memberPermissions?.has(Permissions.FLAGS.ADMINISTRATOR)) {
					await interaction.reply("You don't have permission to do this!");
					break;
				}
				const punishment = interaction.options.getString('punishment') as PunishOption;
				await prisma.punish.upsert({
					where: { guild: interaction.guildId! },
					update: { option: punishment },
					create: {
						guild: interaction.guildId!,
						option: punishment,
					},
				});
				await interaction.reply(`**The punishment has been set to ${punishment}**`);
				break;

			case 'logs':
				if (!interaction.memberPermissions?.has(Permissions.FLAGS.ADMINISTRATOR)) {
					await interaction.reply("You don't have permission to do this!");
					break;
				}
				const channel = interaction.options.getChannel('channel') as TextChannel | null;
				await prisma.channel.upsert({
					where: { guild_type: { guild: interaction.guildId!, type: 'LOGS' } },
					update: { channel: channel?.id! },
					create: {
						guild: interaction.guildId!,
						type: 'LOGS',
						channel: channel?.id!,
					},
				});
				channel?.send('**Spy Bot logs Channel**');
				await interaction.reply(`**The logs channel has been set to <#${channel?.id}>**`);
				break;

			case 'help':
				const helpEmbed = new MessageEmbed()
					.setTitle('<:Settings:939853181180080168> **Anti-Raid | Config**')
					.setDescription(
						`
						**The Options are listed below:**
						config logs
						config show
						config punishment
						config help
						`
					)
					.setColor('RED')
					.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
					.setAuthor({
						name: interaction.user.tag,
						iconURL: interaction.user.displayAvatarURL(),
					})
					.setFooter({
						text: interaction.guild?.name || '',
						iconURL: interaction.guild?.iconURL() ?? '',
					});
				await interaction.reply({ embeds: [helpEmbed] });
				break;
		}
	},
} as Slash;
