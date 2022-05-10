import type { SlashArgs } from '../types';
import { MessageEmbed, TextChannel } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { prisma } from '../database';

export default {
	command: new SlashCommandBuilder()
		.setName('suggestions')
		.setDescription('Suggestions command')
		.addSubcommand(subcommand =>
			subcommand
				.setName('set')
				.setDescription('Sets the suggestions channel')
				.addChannelOption(channel =>
					channel.setName('channel').setDescription('The channel').setRequired(true)
				)
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('new')
				.setDescription('Add new suggestion')
				.addStringOption(title =>
					title.setName('title').setDescription("The suggestion's title").setRequired(true)
				)
				.addStringOption(body =>
					body.setName('title').setDescription("The suggestion's title").setRequired(true)
				)
		),

	async run({ client, interaction }: SlashArgs) {
		switch (interaction.options.getSubcommand()) {
			case 'set':
				const channel = interaction.options.getChannel('channel') as TextChannel | null;
				await prisma.suggestionsChannel.upsert({
					where: { guild: interaction.guildId! },
					update: { channel: channel?.id! },
					create: { guild: interaction.guildId!, channel: channel?.id! },
				});
				channel?.send('**Suggestions Channel**');
				await interaction.reply(`**The suggestions channel has been set to <#${channel?.id}>**`);
				break;

			case 'new':
				await interaction.reply('**Suggestion submitted**');
				const title = interaction.options.getString('title');
				const body = interaction.options.getString('body');
				const embed = new MessageEmbed()
					.setTitle(`**${title}**`)
					.setDescription(body!)
					.setColor('#2F3136')
					.setAuthor({
						name: interaction.user.tag,
						iconURL: interaction.user.avatarURL()!,
					});
				const suggestions = await prisma.suggestionsChannel.findUnique({
					where: { guild: interaction.guildId! },
					select: { channel: true },
				});
				if (!suggestions) {
					await interaction.reply(
						':x: | **There is no suggestions channel set:** `.suggestions set <channel>`'
					);
					break;
				}
				const suggestionsChannel = client.channels.cache.get(suggestions.channel!) as TextChannel;
				const msg = await suggestionsChannel?.send({ embeds: [embed] });
				msg.react('✅');
				msg.react('❌');
				await interaction.reply('**Suggestion submitted**');
				break;
		}
	},
};
