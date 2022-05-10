import { MessageEmbed } from 'discord.js';
import type { CommandArgs } from '../types';

export default {
	name: 'modules',
	async run({ message }: CommandArgs) {
		const modulesEmbed = new MessageEmbed()
			.setTitle('Modules')
			.setDescription('test')
			.setColor('#2F3136')
			.addFields(
				{
					name: 'Channel Create Limit',
					value: 'Enabled',
					inline: true,
				},
				{
					name: 'Channel Delete Limit',
					value: 'Enabled',
					inline: true,
				},
				{
					name: 'Role Create Limit',
					value: 'Enabled',
					inline: true,
				},
				{
					name: 'Role Delete Limit',
					value: 'Enabled',
					inline: true,
				},
				{
					name: 'Kick Limit',
					value: 'Enabled',
					inline: true,
				},
				{
					name: 'Ban Limit',
					value: 'Enabled',
					inline: true,
				}
			)
			.setFooter({
				text: 'Spy Bot',
				iconURL:
					'https://cdn.discordapp.com/avatars/939629038178295828/861602a3003bf4b82e3397aaf1285ed2.webp?size=80',
			});
		message.channel.send({ embeds: [modulesEmbed] });
	},
};
