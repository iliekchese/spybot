import type { CommandArgs } from '../types';
import { MessageAttachment, MessageEmbed } from 'discord.js';
import Captcha from '@haileybot/captcha-generator';
import { prisma } from '../database';

export default {
	name: 'verification',
	async run({ message, args }: CommandArgs) {
		switch(args[0]) {
			case 'start':
				const captcha = new Captcha()
				const embed = new MessageEmbed().setTitle('Type out the captcha to complete the verification').setColor('#2F3136')
				message.channel.send({ embeds: [embed], files: [new MessageAttachment(captcha.JPEGStream, "captcha.jpeg")] })
		
				const collected = await message.channel.awaitMessages({
					filter: (msg) => msg.author.id === message.author.id,
					max: 1
				})
				if (collected.first()?.content.toLowerCase() === captcha.value.toLowerCase()) {
					message.channel.send("Verification completed succesfully!")
				} else {
					message.channel.send("Verification failed!")
				}
				break;

        case 'set':
	        const infoEmbed = new MessageEmbed()
	            .setTitle('<:spybot:939656950231236618>  Verification')
	            .setDescription(
	                '<:arrow:951862606958821506> This server requires you to complete a captcha verification. \n Type `.verification start` to start the verification.')
	            .setColor('#2F3136')
	            .setFooter({
	                text: 'Spy Bot',
	                iconURL:
	                    'https://cdn.discordapp.com/avatars/939629038178295828/79c386588754ef3775b8ffd4654669f3.webp?size=80)',
	            });
	
	        message.channel.send({ embeds: [infoEmbed], });
						await prisma.verificationChannel.upsert({
							where: { guild: message.guildId! },
							update: { channel: args[1] }
						})
		}
	}
};