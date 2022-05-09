import type { SlashArgs } from '..';
import { Permissions } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { prisma } from '../database';

export default {
	command: new SlashCommandBuilder()
		.setName('limits')
		.setDescription('Manages limits for server')
		.addSubcommand(subcommand =>
			subcommand
				.setName('channelcreate')
				.setDescription('Set the channel create limit!')
				.addIntegerOption(limit =>
					limit.setName('limit').setDescription('The limit').setRequired(true)
				)
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('channeldelete')
				.setDescription('Set the channel delete limit!')
				.addIntegerOption(limit =>
					limit.setName('limit').setDescription('The limit').setRequired(true)
				)
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('rolecreate')
				.setDescription('Set the role create limit!')
				.addIntegerOption(limit =>
					limit.setName('limit').setDescription('The limit').setRequired(true)
				)
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('roledelete')
				.setDescription('Set the role delete limit!')
				.addIntegerOption(limit =>
					limit.setName('limit').setDescription('The limit').setRequired(true)
				)
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('ban')
				.setDescription('Set the ban limit!')
				.addIntegerOption(limit =>
					limit.setName('limit').setDescription('The limit').setRequired(true)
				)
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('kick')
				.setDescription('Set the kick limit!')
				.addIntegerOption(limit =>
					limit.setName('limit').setDescription('The limit').setRequired(true)
				)
		),

	async run({ interaction }: SlashArgs) {
		const type = interaction.options.getSubcommand();
		const limit = interaction.options.getInteger('limit');
		if (!interaction.memberPermissions?.has(Permissions.FLAGS.ADMINISTRATOR)) {
			await interaction.reply("You don't have permission to do this!");
			return;
		}

		const isLimit =
			type === 'channelcreate' ||
			type === 'channeldelete' ||
			type === 'rolecreate' ||
			type === 'roledelete' ||
			type === 'kick' ||
			type === 'ban' ||
			type === 'warn';

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
			where: { guild: interaction.guildId!, type },
			update: { limit: limit! },
			create: {
				guild: interaction.guildId!,
				type,
				limit: limit!,
			},
		});
		await interaction.reply(`${limit} has been updated!`);
	},
};
