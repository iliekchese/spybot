import type { TextChannel } from 'discord.js';
import type { CommandArgs } from '../types';
import { MessageEmbed, Permissions } from 'discord.js';
import { prisma } from '../database';

export default {
	name: 'warns',
	async run({ message, args }: CommandArgs) {
		const reason = args.slice(2).join(' ');
		const warns = await prisma.warn.findMany();
		switch (args[0]) {
			case 'add':
				if (!message.member?.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
					message.channel.send("You don't have permission to do this!");
					break;
				}
				const member = message.mentions.members?.first();
				if (!member) {
					message.channel.send('You must specify a member!');
					break;
				}
				const wl = await prisma.limit.findUnique({
					where: { guild_type: { guild: message.guildId!, type: 'warn' } },
					select: { limit: true },
				});
				const punish = await prisma.punish.findUnique({
					where: { guild: message.guildId! },
					select: { option: true },
				});
				if (!wl?.limit) {
					message.channel.send('There is no warn limit set: `.limits warn <limit>`');
					break;
				}
				if (!reason) {
					message.channel.send('You must specify a reason!');
					break;
				}
				await prisma.warn.create({
					data: {
						reason,
						guild: message.guildId!,
						user: member.id,
					},
				});
				if (warns.length % wl.limit === 0) {
					switch (punish?.option) {
						case 'kick':
							await member?.kick(reason);
							break;

						case 'ban':
							await member?.ban({ reason });
							break;

						case 'demote':
							member?.roles.cache
								.filter(r => r.name !== '@everyone')
								.forEach(async r => await member?.roles.remove(r.id));
							break;

						case 'quarantine':
							const quarantineRole = member?.guild.roles.cache.find(
								role => role.name === 'Quarantine'
							);
							member?.roles.cache
								.filter(r => r.name !== '@everyone')
								.forEach(async r => await member?.roles.remove(r.id));
							member?.roles.add(quarantineRole!);
							break;
					}
					break;
				}
				const logs = await prisma.logsChannel.findUnique({
					where: { guild: message.guildId! },
					select: { id: true },
				});
				const warnlogEmbed = new MessageEmbed()
					.setTitle(`**Member Warned**: ${member?.user.tag}`)
					.setDescription(`**Reason**: ${reason} \n\n **Reporter**: ${message.author}`)
					.setColor('#2F3136')
					.setThumbnail(member?.user.avatarURL()!);
				const logsChannel = message.guild?.channels.cache.get(logs?.id!) as TextChannel;
				logsChannel.send({ embeds: [warnlogEmbed] });

				const warnEmbed = new MessageEmbed()
					.setDescription(`${member?.user} was warned for ${reason}`)
					.setColor('#2F3136');
				message.channel.send({ embeds: [warnEmbed] });

				const dmEmbed = new MessageEmbed()
					.setTitle('Warning')
					.setDescription(
						`You were warned in **${message.guild?.name}** \n You currently have: **${warns.length}** Warnings`
					)
					.setColor('#2F3136');

				member.user.send({ embeds: [dmEmbed] });
				break;

			case 'remove':
				if (!message.member?.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
					message.channel.send("You don't have permissions to do this!");
					break;
				}
				const { user } = message.mentions.members?.first()! || message.member!;
				if (!args[2]) {
					await prisma.warn.delete({
						where: { guild_user: { guild: message.guildId!, user: user.id } },
					});
					message.channel.send(`Removed warnings from ${user}!`);
					break;
				}
				if (!warns.some(w => w.id === args[2])) {
					message.channel.send(`Warning with id \`${args[2]}\` doesn't exist!`);
					break;
				}
				await prisma.warn.delete({
					where: { guild_user: { guild: message.guildId!, user: user.id } },
				});
				message.channel.send(`Removed warning from ${user} with id \`${args[2]}\`!`);
				break;

			case 'show':
				const showMember = message.mentions.members?.first() || message.member;

				const warningsEmbed = new MessageEmbed()
					.setTitle(`Warnings for ${showMember?.user.tag}`)
					.setDescription(`**Warnings - 0**`)
					.setThumbnail(showMember?.user.avatarURL()!)
					.setColor('#2F3136');

				if (warns) {
					warningsEmbed.setDescription(`**Warnings - ${warns?.length}**`);
					warns.forEach(w => {
						warningsEmbed.addField(w.id, w.reason);
					});
				}

				message.channel.send({ embeds: [warningsEmbed] });
				break;
		}
	},
};
