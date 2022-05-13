import type { Slash } from '../types';
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

export default {
	command: new SlashCommandBuilder().setName('commands').setDescription('Displays all commands!'),
	async run({ interaction }) {
		const commandsEmbed = new MessageEmbed()
			.setTitle('<:spybot:939656950231236618> Commands')
			.setDescription('<:arrow:951862606958821506> All bot commands, Prefix .')
			.addField(
				'Config Commands',
				'**```.config channelcreatelimit, .config channeldeletelimit, .config rolecreatelimit, .config roledeletelimit, .config kicklimit, .config banlimit, .config punishment, .config logs, .whitelist add, .whitelist remove, .whitelist show, .clearuser, .config help, .setup```**'
			)
			.addField('Information Commands', '**```.help, .credits, .vote, .commands, .info```**')
			.addField('Moderation', '**```.kick, .ban, .warns add, .warns show, .warns remove```**')
			.setColor('#2F3136')
			.setFooter({
				text: 'Spy Bot',
				iconURL:
					'https://cdn.discordapp.com/avatars/939629038178295828/861602a3003bf4b82e3397aaf1285ed2.webp?size=80)',
			});

		await interaction.reply({ embeds: [commandsEmbed] });
	},
} as Slash;
