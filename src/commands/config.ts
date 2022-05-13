import type { Command } from '../types';
import type { TextChannel } from 'discord.js';
import { MessageEmbed, Permissions } from 'discord.js';
import { prisma } from '../database';
import { PunishOption } from '@prisma/client';

export default {
	name: 'config',
	async run({ message, args }) {
		const logs = await prisma.channel.findUnique({
			where: { guild_type: { guild: message.guildId!, type: 'LOGS' } },
			select: { channel: true },
		});
		switch (args[0]?.toLowerCase()) {
			case 'show':
				const disabled = ':x: Disabled';
				const punish = await prisma.punish.findUnique({
					where: { guild: message.guildId! },
					select: { option: true },
				});
				const show = new MessageEmbed()
					.setTitle('**Spy Bot | Config**')
					.setAuthor({
						name: message.author.tag,
						iconURL: message.author.displayAvatarURL({ dynamic: true }),
					})
					.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
					.setFooter({
						text: message.guild?.name!,
						iconURL: message.guild?.iconURL()!,
					})
					.addField('Logs: ', logs?.channel ? `<#${logs.channel}>` : disabled, false)
					.addField('Punishment: ', punish?.option ?? disabled, false)
					.setColor('GREEN');
				message.channel.send({ embeds: [show] });
				break;

			case 'punishment':
				if (!message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
					message.channel.send("You don't have permission to do this!");
					break;
				}
				const punishment = args[1]?.toUpperCase() as PunishOption;
				if (!punishment) {
					message.channel.send(':x: | **Provide The punishment**');
					break;
				}
				if (
					!(
						punishment === 'BAN' ||
						punishment === 'KICK' ||
						punishment === 'DEMOTE' ||
						punishment === 'QUARANTINE'
					)
				) {
					message.channel.send(
						':x: | **The punishment can only be kick, ban, quarantine or demote**'
					);
					break;
				}
				await prisma.punish.upsert({
					where: { guild: message.guildId! },
					update: { option: punishment },
					create: {
						guild: message.guildId!,
						option: punishment,
					},
				});

				message.channel.send('**The punishment has been set to ' + args[1] + '**');
				break;

			case 'logs':
				if (!message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
					message.channel.send("You don't have permission to do this!");
					break;
				}
				const channel = message.mentions.channels.first()! as TextChannel;
				if (!channel) {
					message.channel.send(':x: | **Mention The channel**');
					break;
				}
				if (channel.guild.id !== message.guild?.id) {
					message.channel.send(':x: | **That channel is not from this server**');
					break;
				}
				await prisma.channel.upsert({
					where: { guild_type: { guild: message.guildId!, type: 'LOGS' } },
					update: { channel: channel.id },
					create: {
						guild: message.guildId!,
						type: 'LOGS',
						channel: channel.id,
					},
				});
				channel.send('**Anti Raid logs Channel**');
				message.channel.send('**The logs channel has been set to ' + args[1] + '**');
				break;

			default:
				const helpEmbed = new MessageEmbed()
					.setTitle('<:Settings:939853181180080168> **Anti-Raid | Config**')
					.setDescription(
						`
							**The Options are listed below:**
							config show
							config logs
							config punishment
						`
					)
					.setColor('#FF0000')
					.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
					.setAuthor({
						name: message.author.tag,
						iconURL: message.author.displayAvatarURL(),
					})
					.setFooter({
						text: message.guild?.name!,
						iconURL: message.guild?.iconURL()!,
					});
				message.channel.send({ embeds: [helpEmbed] });
				break;
		}
		const channel = await message.guild?.channels.fetch(logs?.channel!);
		if (!channel) {
			message.reply(
				"The logs channel isn't set, consider to setting it with `.config logs #<logs_channel>`"
			);
		}
	},
} as Command;
