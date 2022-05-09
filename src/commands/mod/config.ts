import type { CommandArgs } from '../..';
import type { TextChannel } from 'discord.js';
import { MessageEmbed, Permissions } from 'discord.js';
import { prisma } from '../../database';

export default {
	name: 'config',
	async run({ message, args }: CommandArgs) {
		const logs = await prisma.logsChannel.findUnique({
			where: { guild: message.guildId! },
			select: { id: true },
		});
		switch (args[0]?.toLowerCase()) {
			case 'show':
				const disabled = ':x: Disabled';
				const punish = await prisma.punish.findUnique({
					where: { guild: message.guildId! },
					select: { option: true },
				});
				const show = new MessageEmbed()
					.setTitle('**Anti-Raid | Config**')
					.setAuthor({
						name: message.author.tag,
						iconURL: message.author.displayAvatarURL({ dynamic: true }),
					})
					.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
					.setFooter({
						text: message.guild?.name!,
						iconURL: message.guild?.iconURL()!,
					})
					.addField('Logs', logs?.id ? `<#${logs.id}>` : disabled)
					.addField('Punishment', punish?.option ?? disabled)
					.setColor('GREEN');
				message.channel.send({ embeds: [show] });
				break;

			case 'punishment':
				if (!message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
					message.channel.send("You don't have permission to do this!");
					break;
				}
				if (!args[1]) {
					message.channel.send(':x: | **Provide The punishment**');
					break;
				}
				if (
					!(
						args[1] === 'ban' ||
						args[1] === 'kick' ||
						args[1] === 'demote' ||
						args[1] === 'quarantine'
					)
				) {
					message.channel.send(
						':x: | **The punishment can only be kick, ban, quarantine or demote**'
					);
					break;
				}
				await prisma.punish.upsert({
					where: { guild: message.guildId! },
					update: { option: args[1] },
					create: {
						guild: message.guildId!,
						option: args[1],
					},
				});

				message.channel.send(
					'**The punishment has been set to ' + args[1] + '**'
				);
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
					message.channel.send(
						':x: | **That channel is not from this server**'
					);
					break;
				}
				await prisma.logsChannel.upsert({
					where: { guild: message.guildId! },
					update: { id: channel.id },
					create: {
						guild: message.guildId!,
						id: channel.id,
					},
				});
				channel.send('**Anti Raid logs Channel**');
				message.channel.send(
					'**The logs channel has been set to ' + args[1] + '**'
				);
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
		const channel = await message.guild?.channels.fetch(logs?.id!);
		if (!channel) {
			message.reply(
				"\nThe logs channel isn't set, consider to set with `.config logs <logs_channel>`!"
			);
		}
	},
};
