import type { ISlashArgs } from '..';
import type { TextChannel } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed, Permissions } from 'discord.js';
import { prisma } from '../database';

export default {
	command: new SlashCommandBuilder()
		.setName('config')
		.setDescription('Displays config')
		.addSubcommand(subcommand =>
			subcommand
				.setName('show')
				.setDescription('Info about the server permissions')
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
							{ name: "ban", value: "ban" },
							{ name: "kick", value: "kick" },
							{ name: "demote", value: "demote" },
							{ name: "quarantine", value: "quarantine" }
						)
						.setRequired(true)
				)
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('logs')
				.setDescription('Configure logs channel!')
				.addChannelOption(channel =>
					channel
						.setName('channel')
						.setDescription('The channel')
						.setRequired(true)
				)
		)
		.addSubcommand(subcommand =>
			subcommand.setName('help').setDescription('Config Preview')
		),

	async run({ interaction }: ISlashArgs) {
		const logs = await prisma.logsChannel.findUnique({
			where: { guild: interaction.guildId! },
			select: { id: true }
		});
		switch (interaction.options.getSubcommand()) {
			case 'show':
				const disabled = ':x: Disabled';
				const punish = await prisma.punish.findUnique({
					where: { guild: interaction.guildId! },
					select: { option: true }
				})
				const show = new MessageEmbed()
					.setTitle('**Anti-Raid | Config**')
					.setAuthor({
						name: interaction.user.tag,
						iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
					})
					.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
					.setFooter({
						text: interaction.guild?.name || '',
						iconURL: interaction.guild?.iconURL() ?? '',
					})
					.addField('Logs', logs?.id ? `<#${logs.id}>` : disabled)
					.addField('Punishment', punish?.option ?? disabled)
					.setColor('GREEN');
				await interaction.reply({ embeds: [show] });
				break;

			case 'punishment':
				const punishment = interaction.options.getString("punishment")
				if (!interaction.memberPermissions?.has(Permissions.FLAGS.ADMINISTRATOR)) {
					await interaction.reply("You don't have permission to do this!")
					break;
				}
				if (!punishment) {
					await interaction.reply(':x: | **Provide The punishment**');
					break;
				}
				if (!(punishment === 'ban' || punishment === 'kick' || punishment === 'demote' || punishment === 'quarantine')) {
					await interaction.reply(':x: | **The punishment can only be kick, ban, quarantine or demote**');
					break;
				}
				await prisma.punish.upsert({
					where: { guild: interaction.guildId! },
					update: { option: punishment },
					create: {
						guild: interaction.guildId!,
						option: punishment
					}
				})

				await interaction.reply('**The punishment has been set to ' + punishment + '**');
				break;

			case 'logs':
				if (!interaction.memberPermissions?.has(Permissions.FLAGS.ADMINISTRATOR)) {
					await interaction.reply("You don't have permission to do this!")
					break;
				}
				const channel = interaction.options.getChannel("channel") as TextChannel | null;
				if (channel?.guildId !== interaction.guildId!) {
					await interaction.reply(':x: | **That channel is not from this server**');
					break;
				}
				await prisma.logsChannel.upsert({
					where: { guild: interaction.guildId! },
					update: { id: channel.id },
					create: {
						guild: interaction.guildId!,
						id: channel.id
					}
				})
				channel.send('**Anti Raid logs Channel**');
				await interaction.reply('**The logs channel has been set to ' + channel + '**');
				break;

			case 'help':
				const helpEmbed = new MessageEmbed()
					.setTitle('<:Settings:939853181180080168> **Anti-Raid | Config**')
					.setDescription(
						`
						**The Options are listed below:**
						config channelCreateLimit
						config channelDeleteLimit
						config roleCreateLimit
						config roleDeleteLimit
						config banLimit
						config kickLimit
						config logs
						config show
						config punishment
						config help
					`
					)
					.setColor('#FF0000')
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
};
