import type { CommandArgs } from '../types';
import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';

export default {
	name: 'kick',
	run({ message, args, client }: CommandArgs) {
		const member = message.mentions.members?.first();
		const kickEmbed = new MessageEmbed()
			.setTitle(`Are you sure you want to kick ${member?.user.tag}?`)
			.setDescription('Please click below if you would like to continue')
			.setColor('#2F3136')
			.setFooter({
				text: 'Spy Bot',
				iconURL:
					'https://cdn.discordapp.com/avatars/939629038178295828/79c386588754ef3775b8ffd4654669f3.webp?size=80)',
			});

		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('kickAllowed')
				.setLabel('Continue')
				.setStyle('SUCCESS'),
			new MessageButton()
				.setCustomId('kickNotAllowed')
				.setLabel('Cancel')
				.setStyle('DANGER')
		);

		message.channel.send({ embeds: [kickEmbed], components: [row] });

		client.on('interactionCreate', async interaction => {
			if (!interaction.isButton()) return;
			if (interaction.customId === 'kickAllowed') {
				member?.kick(args[1]);
				await interaction.reply(`${member?.user} was succesfully kicked!`);
			} else if (interaction.customId === 'kickNotAllowed') {
				await interaction.reply('Operation canceled.');
			}
		});
	},
};
