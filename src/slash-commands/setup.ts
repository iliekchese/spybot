import type { SlashArgs } from '../types';
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed, TextChannel } from 'discord.js';

export default {
	name: 'setup',
	command: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Setup command'),

	async run({ interaction }: SlashArgs) {
		const setupEmbed = new MessageEmbed().setColor('#2F3136').setFooter({
			text: 'Spy Bot',
			iconURL:
				'https://cdn.discordapp.com/avatars/939629038178295828/861602a3003bf4b82e3397aaf1285ed2.webp?size=80)',
		});

		try {
			interaction.guild?.channels.create('spy-bot-logs', {
				type: 'GUILD_TEXT',
				permissionOverwrites: [
					{
						id: interaction.guild.id,
						deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
					},
				],
			});
			const muteRole = await interaction.guild?.roles.create({
				color: 'RED',
				name: 'Quarantine',
				position: interaction.guild?.roles.cache.size - 1,
				reason: 'Server setup',
			});
			interaction.guild?.channels.cache.forEach(async c => {
				if (c instanceof TextChannel) {
					await c.permissionOverwrites.create(muteRole!, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false,
						SPEAK: false,
						CONNECT: false,
						ADMINISTRATOR: false,
						VIEW_CHANNEL: false,
					});
				}
			});
			setupEmbed
				.setTitle('Setup Was Completed')
				.setDescription('✅ Setup was successfully completed');
		} catch (_) {
			setupEmbed
				.setTitle('Setup Not Completed')
				.setDescription('❌ Setup was not successfully completed');
		} finally {
			await interaction.reply({ embeds: [setupEmbed] });
		}
	},
};
