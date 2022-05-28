import type { Command } from '../types';
import { MessageEmbed } from 'discord.js';

export default {
	name: 'moderate',
	async run({ message, args }) {
		const member =
			message.mentions.members?.first() ||
			message.guild?.members.cache.get(args[0]) ||
			message.member!;

     member.setNickname('Moderated Name', 'Users name was moderated by a server admin.');
    
    const moderateEmbed = new MessageEmbed()
			.setTitle('Name Moderated')
      .setDescription(`${member.user} name was moderated`)
			.setColor('#2F3136')
		message.channel.send({ embeds: [moderateEmbed] });
	},
} as Command;
