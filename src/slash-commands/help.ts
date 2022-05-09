import type { SlashArgs } from '../types';
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';

export default {
	command: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays help command!'),

	async run({ interaction }: SlashArgs) {
		const helpEmbed = new MessageEmbed()
			.setTitle('<:spybot:939656950231236618>  Help Guide')
			.setDescription(
				'<:arrow:951862606958821506> First type `.setup` \n \n Next to setup the configs type `.config help` \n  \n Make sure the bots role is under the owner role. \n Now make sure to whitelist admins by using the whitelist command `.whitelist add <user>` \n \n Next select the limits like the channel create ones roles etc. \n \n Make sure to type `.config <limit options> <limitammount>` Do one of the limits from the configs and do a ammount of channels you want a admin to be abble to create. \n \n  Next type `.config punishment <demote/kick/ban>` do one of these you want to happen to the admin who bypasses one of the limits.'
			)
			.setColor('#2F3136')
			.setFooter({
				text: 'Spy Bot',
				iconURL:
					'https://cdn.discordapp.com/avatars/939629038178295828/861602a3003bf4b82e3397aaf1285ed2.webp?size=80)',
			});
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setURL(
					'https://discord.com/api/oauth2/authorize?client_id=939629038178295828&permissions=8&scope=bot%20applications.commands'
				)
				.setLabel('Invite')
				.setStyle('LINK'),
			new MessageButton()
				.setURL('https://eldiplayz.gitbook.io/spy-bot-docs/')
				.setLabel('Docs')
				.setStyle('LINK'),
			new MessageButton()
				.setURL('https://discord.gg/5qv5sHBPew')
				.setLabel('Support Server')
				.setStyle('LINK')
		);
		await interaction.reply({ embeds: [helpEmbed], components: [row] });
	},
};
