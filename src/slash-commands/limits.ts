import type { Slash } from '../types';
import { Permissions } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { prisma } from '../database';
import { LimitType } from '@prisma/client';

export default {
	data: new SlashCommandBuilder()
		.setName('limits')
		.setDescription('Manages limits for server')
		.addSubcommand(subcommand =>
			subcommand
				.setName('channelcreate')
				.setDescription('Set the channel create limit!')
				.addIntegerOption(limit => limit.setName('limit').setDescription('The limit').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('channeldelete')
				.setDescription('Set the channel delete limit!')
				.addIntegerOption(limit => limit.setName('limit').setDescription('The limit').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('rolecreate')
				.setDescription('Set the role create limit!')
				.addIntegerOption(limit => limit.setName('limit').setDescription('The limit').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('roledelete')
				.setDescription('Set the role delete limit!')
				.addIntegerOption(limit => limit.setName('limit').setDescription('The limit').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('ban')
				.setDescription('Set the ban limit!')
				.addIntegerOption(limit => limit.setName('limit').setDescription('The limit').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('kick')
				.setDescription('Set the kick limit!')
				.addIntegerOption(limit => limit.setName('limit').setDescription('The limit').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('warn')
				.setDescription('Set the warn limit!')
				.addIntegerOption(limit => limit.setName('limit').setDescription('The limit').setRequired(true))
		),

	async run({ interaction }) {
		const type = interaction.options.getSubcommand().toUpperCase() as LimitType;
		const limit = interaction.options.getInteger('limit');
		if (!interaction.memberPermissions?.has(Permissions.FLAGS.ADMINISTRATOR)) {
			await interaction.reply("You don't have permission to do this!");
			return;
		}
		const isLimit =
			type === 'CHANNELCREATE' ||
			type === 'CHANNELDELETE' ||
			type === 'ROLECREATE' ||
			type === 'ROLEDELETE' ||
			type === 'KICK' ||
			type === 'BAN' ||
			type === 'WARN';

		if (!isLimit) {
			await interaction.reply(`
				Not a valid limit, valid limits are:

				**channelcreate, channeldelete,
				rolecreate, roledelete, 
				kick, ban,
				warn**
			`);
			return;
		}
		await prisma.limit.upsert({
			where: { guild_type: { guild: interaction.guildId!, type } },
			update: { limit: limit! },
			create: {
				guild: interaction.guildId!,
				type,
				limit: limit!,
			},
		});
		await interaction.reply(`${limit} has been updated!`);
	},
} as Slash;
