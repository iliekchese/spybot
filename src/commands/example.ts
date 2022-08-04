import type { Command } from '../types';
import { MessageEmbed } from 'discord.js';

export default {
	name: 'example',
	run({ message, args }) {
    switch (args[0]) {
			case 'join':
				const joinEmbed = new MessageEmbed()
          .setAuthor({ name: 'glitchtrap/eldi mindcrafter#7765', iconURL: 'https://cdn.discordapp.com/avatars/713745288619360306/dc241dd6f4d78ee2cd7984942a23b466.webp?size=80' })
					.setTitle('New user joined!')
          .addFields(
					{
						name: 'Account Created',
						value: '`2 Years Ago`',
					}
				)
				.setColor('#2F3136')
				message.channel.send({
          embeds: [joinEmbed], 
        });

    case 'raid':
				const raidEmbed = new MessageEmbed()
					.setTitle('Multiple accounts joined!')
          .setDescription('Multiple accounts have joined, all of them are being kicked.')
          .addFields(
					{
						name: 'Accounts Joining',
						value: '`100`',
					}
				)
				.setColor('#2F3136')
				message.channel.send({
          content: '@everyone Theres a raid!',
          embeds: [raidEmbed], 
        });
        
		case 'alt':
			const altEmbed = new MessageEmbed()
        .setAuthor({ name: 'Ash Flower#7563', iconURL: 'https://cdn.discordapp.com/avatars/875049420893343744/f600faed1542ab68b5df853ebc956603.webp?size=80' })
				.setTitle('Alternative Account Joined')
        .addFields(
					{
						name: 'Account Created',
						value: '`1 hour ago`',
						inline: true,
					},
        	{
						name: 'Account Invited By',
						value: '`glitchtrap/eldi mindcrafter`',
						inline: true,
					} 
				)
				.setColor('#2F3136')
					message.channel.send({ 
          	embeds: [altEmbed],
        	});
				break;
		}
	},
} as Command;