import type { TextChannel } from "discord.js"
import type { ICommandArgs } from "../.."
import { MessageEmbed, Permissions } from 'discord.js';
import { nanoid } from "nanoid";

export default {
	name: "warns",
	async run({ message, db, args }: ICommandArgs) {
		switch (args[0]) {
			case 'add':
				if (!message.member?.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
					message.channel.send("You don't have permission to do this!")
					break;
				}
				const member = message.mentions.members?.first()
				if (!member) {
					message.channel.send("You must specify a member!");
					break;
				}
				const wl = db.get(`warnlimit_${message.guild?.id}`)
				const warningsLength = db.get(`${message.guild?.id}_${member?.user.id}_warns`)?.length || 0
				const warnsCount = db.get(`${message.guild?.id}_${member?.user.id}_warnscount`) || 0
				const punish = db.get(`punish_${message.guild?.id}`)
				if (!wl) {
					message.channel.send("There is no warn limit set: `.warns limit <limit>`");
					break;
				}
				if (!args[2]) {
					message.channel.send("You must specify a reason!")
					break;
				}
				db.push(`${message.guild?.id}_${member?.user.id}_warns`, {
					id: nanoid(),
					reason: args.slice(2).join(" ")
				})
				if (warnsCount >= wl) {
					switch (punish) {
						case 'kick':
							await member?.kick(args.slice(2).join(" "));
							break;

						case 'ban':
							await member?.ban({ reason: args.slice(2).join(" ") });
							break;

						case 'demote':
							member?.roles.cache
								.filter(r => r.name !== '@everyone')
								.forEach(async r => await member?.roles.remove(r.id));
							break;

						case 'quarantine':
							const quarantineRole = member?.guild.roles.cache.find(role => role.name === "Quarantine");
							member?.roles.cache
								.filter(r => r.name !== '@everyone')
								.forEach(async r => await member?.roles.remove(r.id));
							member?.roles.add(quarantineRole!);
							break;
					}
					db.set(`${message.guild?.id}_${member?.user.id}_warnscount`, 0)
				} else {
					const logs = db.get(`logs_${message.guild?.id}`)?.slice(1)
					const warnlogEmbed = new MessageEmbed()
						.setTitle(`**Member Warned**: ${member?.user.tag}`)
						.setDescription(`**Reason**: ${args.slice(2).join(" ")} \n\n **Reporter**: ${message.author}`)
						.setColor('#2F3136')
						.setThumbnail(member?.user.avatarURL()!)
					const logsChannel = message.guild?.channels.cache.get(logs) as TextChannel;
					logsChannel.send({ embeds: [warnlogEmbed] })

					const warnEmbed = new MessageEmbed()
						.setDescription(`${member?.user} was warned for ${args.slice(2).join(" ")}`)
						.setColor('#2F3136')
					message.channel.send({ embeds: [warnEmbed] });

					const dmEmbed = new MessageEmbed()
						.setTitle('Warning')
						.setDescription(`You were warned in **${message.guild?.name}** \n You currently have: **${warningsLength + 1}** Warnings`)
						.setColor('#2F3136')

					member.user.send({ embeds: [dmEmbed] });
					db.add(`${message.guild?.id}_${member?.user.id}_warnscount`, 1)
				}
				break;

			case 'remove':
				if (!message.member?.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
					message.channel.send("You don't have permissions to do this!")
					break;
				}
				const { user } = message.mentions.members?.first()! || message.member!
				if (!args[2]) {
					db.set(`${message.guild?.id}_${user.id}_warns`, []);
					message.channel.send(`Removed warnings from ${user}!`);
					break;
				}
				const warnings = db.get(`${message.guild?.id}_${user.id}_warns`)
				const index = warnings.findIndex((w: any) => w.id === args[2])
				delete warnings[index]
				const fix = warnings.filter((w: any) => !!w)
				db.set(`${message.guild?.id}_${user.id}_warns`, fix);
				if (index === -1) {
					message.channel.send(`Warning with id \`${args[2]}\` doesn't exist!`);
				} else {
					message.channel.send(`Removed warning from ${user}!`);
				}
				break;

			case 'show':
				const showMember = message.mentions.members?.first() || message.member
				const warns = await db.get(`${message.guild?.id}_${showMember?.user.id}_warns`)!

				const warningsEmbed = new MessageEmbed()
					.setTitle(`Warnings for ${showMember?.user.tag}`)
					.setDescription(`**Warnings - 0**`)
					.setThumbnail(showMember?.user.avatarURL()!)
					.setColor('#2F3136')

				if (warns) {
					warningsEmbed.setDescription(`**Warnings - ${warns?.length}**`)
					warns.forEach((w: any) => {
						warningsEmbed.addField(w.id, w.reason)
					})
				}

				message.channel.send({ embeds: [warningsEmbed] });
				break;

			case 'limit':
				if (!message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
					message.channel.send("You don't have permission to do this!")
					break;
				}
				if (!args[1]) {
					message.channel.send(':x: | **Provide The limit**');
					return;
				}
				try {
					if (Number(args[1]) < 1) {
						message.channel.send(':x: | **The limit cannot be zero or negative number**');
						return;
					}
				} catch (_) {
					message.channel.send(':x: | **The limit has to be a number**');
					return;
				}
				db.set(`warnlimit_${message.guild?.id}`, Number(args[1]));
				message.channel.send(`**The warn limit has been set to ${args[1]}**`);
				break;
		}
	}
}