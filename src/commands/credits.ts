import type { Command } from '../types';
import { MessageEmbed } from 'discord.js';

export default {
	name: 'credits',
	run({ message }) {
		const creditsEmbed = new MessageEmbed()
			.setTitle('Credits')
			.setThumbnail(
				'https://cdn.discordapp.com/avatars/939629038178295828/79c386588754ef3775b8ffd4654669f3.webp?size=80'
			)
			.setDescription(
				'Worked on by the 2 devs below \n \n <:badgebotdeveloper:950068791667224606> `eldi mindcrafter#0503` \n \n <:badgebotdeveloper:950068791667224606> `AngelNext#9162`\n'
			)
			.setColor('#2F3136')
			.setFooter({
				text: 'Spy Bot',
				iconURL:
					'https://cdn.discordapp.com/avatars/939629038178295828/79c386588754ef3775b8ffd4654669f3.webp?size=80)',
			});
		message.channel.send({ embeds: [creditsEmbed] });
	},
} as Command;
