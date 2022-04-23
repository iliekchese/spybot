import type { ICommandArgs } from '../..';
import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';

export default {
	name: 'vote',
	run({ message }: ICommandArgs) {
		const voteEmbed = new MessageEmbed()
			.setTitle('<:spybot:939656950231236618>  Vote')
			.setDescription(
				'<:arrow:951862606958821506> Vote Spy Bot now and help it out. \n All votes will help the bot allot and recommend new users to use it.'
			)
			.setColor('#2F3136')
			.setFooter({
				text: 'Spy Bot',
				iconURL:
					'https://cdn.discordapp.com/avatars/939629038178295828/46177dc48e152f86718afb5f05884159.webp?size=80%22)',
			});

		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setURL('https://discordbotlist.com/bots/spy-bot')
				.setLabel('Discord Bot List')
				.setStyle('LINK'),
      new MessageButton()
				.setURL('https://top.gg/bot/939629038178295828')
				.setLabel('Top.gg')
				.setStyle('LINK'),

		);

		message.channel.send({ embeds: [voteEmbed], components: [row] });
	},
};
