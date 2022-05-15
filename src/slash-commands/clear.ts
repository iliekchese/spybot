import type { Slash } from "../types"
import type { TextChannel } from "discord.js"
import { SlashCommandBuilder } from '@discordjs/builders';
import { Permissions } from "discord.js"

export default {
	command: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Delete many messages in 1 channel')
		.addIntegerOption(amount => amount.setName("amount").setDescription("The amount to delete").setRequired(true)),
	
	async run({ interaction }) {
		if (!interaction.memberPermissions?.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
			await interaction.reply(":x: | **You don't have permission to do this!**");
			return;
		}
		const amount = interaction.options.getInteger('amount')
		await (interaction.channel as TextChannel)?.bulkDelete(amount! + 1)
		await interaction.reply({ content: `:white_check_mark: | **Deleted ${amount} messages**`, ephemeral: true })
	}
} as Slash