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
					select: { channel: true },
				});
				if (message.channel.id !== verificationChannel?.channel) break;
				const captcha = new Captcha();
				const embed = new MessageEmbed()
					.setTitle('Type out the captcha to complete the verification')
					.setColor('#2F3136');
				const msg = await message.channel.send({
					embeds: [embed],
					files: [new MessageAttachment(captcha.JPEGStream, 'captcha.jpeg')],
				});
				const collected = await message.channel.awaitMessages({
					filter: msg => msg.author.id === message.author.id,
					max: 1,
				});
				if (collected.first()?.content.toLowerCase() !== captcha.value.toLowerCase()) {
					message.member?.send(':x: | **Verification failed!**');
					await collected.first()?.delete()
					await message.delete()
					await msg.delete()
					break;
				}
				const verificationRole = await prisma.role.findUnique({
					where: { guild_type: { guild: message.guildId!, type: 'VERIFICATION' } },
					select: { role: true }
				})
				message.member?.roles.add(verificationRole?.role!)
				message.member?.send(':white_check_mark: | **Verification completed succesfully!**');
        await collected.first()?.delete()
				await message.delete()
				await msg.delete()
				const logs = await prisma.channel.findUnique({
					where: { guild_type: { guild: message.guild?.id!, type: 'LOGS' } },
					select: { channel: true },
				});
				const verifylogEmbed = new MessageEmbed()
					.setTitle(`Verification Successful:`)
					.setDescription(`User ${message.author} has verified successfully!`)
					.setThumbnail(message.author.avatarURL()!)
					.setColor('GREEN');
				const logsChannel = message.guild?.channels.cache.get(logs?.channel!) as TextChannel;
				logsChannel?.send({ embeds: [verifylogEmbed] });
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
					.setTitle('🤖 Captcha Verification')
					.setDescription('<:arrow:951862606958821506> Welcome to the server! \n Complete the captcha verification by typing `.verification start` to acsess the server \n \n Make sure to also follow the server rules!')
					.setColor('#2F3136');
				channel.send({ embeds: [verifyEmbed] });
				message.channel.send(`:white_check_mark: | **The Verification Channel has been set to ${args[1]}**`);

			case 'role':
				const role = message.mentions.roles?.first()
				await prisma.role.upsert({
					where: { guild_type: { guild: message.guildId!, type: 'VERIFICATION' } },
					update: { role: role?.id! },
					create: { guild: message.guildId!, type: 'VERIFICATION', role: role?.id!  }
				})
				message.channel.send(`:white_check_mark: | **The Verification Role has been set to ${args[1]}**`)
		}
	},
} as Command;
