import type { Command } from '../types';
import { MessageAttachment, MessageEmbed, TextChannel } from 'discord.js';
import Captcha from '@haileybot/captcha-generator';
import { prisma } from '../database';

export default {
	name: 'verification',
	async run({ message, args }) {
		switch (args[0]) {
			case 'start':
				const verificationChannel = await prisma.channel.findUnique({
					where: { guild_type: { guild: message.guildId!, type: 'VERIFICATION' } },
					select: { channel: true }
				})
				if (message.channel.id !== verificationChannel?.channel) break;
				const captcha = new Captcha();
				const embed = new MessageEmbed()
					.setTitle('Type out the captcha to complete the verification')
					.setColor('#2F3136');
				message.channel.send({
					embeds: [embed],
					files: [new MessageAttachment(captcha.JPEGStream, 'captcha.jpeg')],
				});
				const collected = await message.channel.awaitMessages({
					filter: msg => msg.author.id === message.author.id,
					max: 1,
				});
				if (collected.first()?.content.toLowerCase() === captcha.value.toLowerCase()) {
					message.channel.send(':white_check_mark: | **Verification completed succesfully!**');
          const logs = await prisma.channel.findUnique({
						where: { guild_type: { guild: message.guild?.id!, type: 'LOGS' } },
						select: { channel: true },
					});
					const verifylogEmbed = new MessageEmbed()
						.setTitle(`Verification Successful:`)
						.setDescription(`User ${message.author} has verified successfully!`)
						.setThumbnail(message.author.avatarURL()!)
						.setColor('GREEN')
					const logsChannel = message.guild?.channels.cache.get(logs?.channel!) as TextChannel;
					logsChannel?.send({ embeds: [verifylogEmbed] })
				} else {
					message.channel.send(':x: | **Verification failed!**');
				}
				break;

			case 'channel':
				const channel = message.mentions.channels.first() as TextChannel;
				if (!channel) {
					message.channel.send(':x: | **Mention The channel**');
					break;
				}
				if (channel.guild.id !== message.guild?.id) {
					message.channel.send(':x: | **That channel is not from this server**');
					break;
				}
				await prisma.channel.upsert({
					where: { guild_type: { guild: message.guildId!, type: 'VERIFICATION' } },
					update: { channel: channel.id },
					create: { guild: message.guildId!, type: 'VERIFICATION', channel: channel.id },
				});
				const verifyEmbed = new MessageEmbed()
					.setTitle('<:spybot:939656950231236618>  Verification')
					.setDescription(
						'<:arrow:951862606958821506> This server requires you to complete a captcha verification. \n Type `.verification start` to start the verification.'
					)
					.setColor('#2F3136');
				channel.send({ embeds: [verifyEmbed] });
				message.channel.send(`**The Verification channel has been set to ${args[1]}**`);
		}
	},
} as Command;
