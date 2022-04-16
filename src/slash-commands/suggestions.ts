import type { ISlashArgs } from '..';
import { MessageEmbed, TextChannel } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export default {
	command: new SlashCommandBuilder()
		.setName('suggestions')
		.setDescription('Suggestions command')
		.addSubcommand(subcommand =>
			subcommand
				.setName('set')
				.setDescription('Sets the suggestions channel')
				.addChannelOption(channel =>
					channel
						.setName('channel')
						.setDescription('The channel')
						.setRequired(true)
				)
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('new')
				.setDescription('Add new suggestion')
				.addNumberOption(message =>
					message
						.setName('message')
						.setDescription("The suggestion's body")
						.setRequired(true)
				)
		),

	async run({ client, interaction, db }: ISlashArgs) {
		switch (interaction.options.getSubcommand()) {
			case 'set':
				const channel = interaction.options.getChannel(
					'channel'
				) as TextChannel | null;
				db.set(`suggestions_${interaction.guild?.id}`, `s${channel?.id}`);
				channel?.send('**Suggestions Channel**');
				await interaction.reply(
					`**The suggestions channel has been set to <#${channel?.id}>**`
				);
				break;

			case 'new':
				const message = interaction.options.getString('message');
				const embed = new MessageEmbed()
					.setTitle(`A new suggestion was submitted by ${interaction.user.tag}`)
					.setDescription(message ?? ':x: | **No message provided**')
					.setColor('#2F3136');
				const suggestionsChannel = client.channels.cache.get(
					db.get(`suggestions_${interaction.guild?.id}`).slice(1)
				) as TextChannel;
				suggestionsChannel?.send({ embeds: [embed] }).then(({ react }) => {
					react('✅');
					react('❌');
				});
				break;
		}
	},
};
