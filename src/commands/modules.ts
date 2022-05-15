import type { Command } from '../types';
import { MessageEmbed } from 'discord.js';

export default {
	name: 'modules',
	async run({ message }) {
		const modulesEmbed = new MessageEmbed()
			.setTitle('Modules')
			.setDescription('Bot modules')
			.setColor('#2F3136')
			.addFields(
				{
					name: 'Anti Raid',
					value: '`Enabled`',
					inline: true,
				},
				{
					name: 'Moderation',
					value: '`Enabled`',
					inline: true,
				},
				{
					name: 'Verification',
					value: '`Enabled`',
					inline: true,
				},
				{
					name: 'Logging',
					value: '`Enabled`',
					inline: true,
				}
			)
			.setFooter({
				text: 'Spy Bot',
				iconURL:
					'https://cdn.discordapp.com/avatars/939629038178295828/79c386588754ef3775b8ffd4654669f3.webp?size=80',
			});
		message.channel.send({ embeds: [modulesEmbed] });
	},
} as Command;
