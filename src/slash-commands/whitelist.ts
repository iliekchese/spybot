import type { Slash } from '../types';
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { prisma } from '../database';

export default {
	name: 'whitelist',
	command: new SlashCommandBuilder()
		.setName('whitelist')
		.setDescription('Manage Whitelist of a server')
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Add a user to the whitelist')
				.addUserOption(option =>
					option.setName('user').setDescription('The user to add to the whitelist')
				)
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('remove')
				.setDescription('Remove a user from the whitelist')
				.addUserOption(option =>
					option.setName('user').setDescription('The user to remove from the whitelist')
				)
		)
		.addSubcommand(subcommand =>
			subcommand.setName('show').setDescription('List all users on the whitelist')
		),

	async run({ interaction }) {
		const whitelist = await prisma.whitelist.findUnique({
			where: { guild: interaction.guildId! },
			select: { users: true },
		});
		const user = interaction.options.getUser('user');
		switch (interaction.options.getSubcommand()) {
			case 'add':
				if (interaction.user.id !== interaction.guildId) {
					await interaction.reply(':x: | **Only The owner of the Server can whitelist people**');
					break;
				}
				if (!user) {
					await interaction.reply(':x: | **Mention The User**');
					break;
				}
				if (whitelist?.users.some(id => id === user.id)) {
					await interaction.reply(':x: | **The User is already whitelisted**');
					break;
				}
				await prisma.whitelist.upsert({
					where: { guild: interaction.guild?.id! },
					update: {
						users: {
							push: user.id,
						},
					},
					create: { guild: interaction.guildId!, users: [user.id] },
				});
				await interaction.reply(`**The user has been whitelisted!**`);
				break;

			case 'remove':
				if (interaction.user.id !== interaction.guild?.id) {
					await interaction.reply(':x: | **Only The owner of the Server can unwhitelist people**');
					break;
				}
				if (!user) {
					await interaction.reply(':x: | **Mention The User**');
					break;
				}
				if (!whitelist?.users?.find(id => id === user?.id)) {
					await interaction.reply(':x: | **The user is not whitelisted!**');
					break;
				}
				await prisma.whitelist.update({
					where: { guild: interaction.guildId! },
					data: { users: whitelist.users.filter(id => id !== user?.id) },
				});
				await interaction.reply('**The user has been unwhitelisted!**');
				break;

			case 'show':
				const embed = new MessageEmbed()
					.setTitle('**The list of whitelisted users**')
					.setAuthor({
						name: interaction.user.tag,
						iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
					})
					.setFooter({
						text: interaction.guild?.name!,
						iconURL: interaction.guild?.iconURL()!,
					})
					.setThumbnail(interaction.guild?.iconURL()!);
				const whitelisted = whitelist?.users?.map(id => `<@${id}>`);
				if (whitelisted?.length) {
					embed.addField('**Users**', `${whitelisted.join('\n')}`);
					embed.setColor('GREEN');
				} else {
					embed.setDescription(':x: | **No whitelisted Users Found**');
					embed.setColor('#FF0000');
				}
				await interaction.reply({ embeds: [embed] });
				break;
		}
	},
} as Slash;
