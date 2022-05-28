import type { TextChannel, GuildMember } from 'discord.js';
import type { Slash } from '../types';
import { MessageEmbed, Permissions } from 'discord.js';
import { prisma } from '../database';
import { punish } from '../utils';
import { SlashCommandBuilder } from '@discordjs/builders';

export default {
	data: new SlashCommandBuilder()
		.setName('warns')
		.setDescription('Manages warns for server')
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Adds a warn to a user')
				.addUserOption(user => user.setName('user').setDescription('The user').setRequired(true))
				.addStringOption(reason => reason.setName('reason').setDescription('The reason').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('remove')
				.setDescription('Removes a warn from a user')
				.addUserOption(user => user.setName('user').setDescription('The user'))
				.addStringOption(id => id.setName('id').setDescription('The id of the warn'))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('show')
				.setDescription("Shows a user's warns")
				.addUserOption(user => user.setName('user').setDescription('The user'))
		),
	async run({ interaction }) {
		const member = interaction.options.getMember('user') as GuildMember | null;
		const warns = await prisma.warn.findMany({
			where: { guild: interaction.guildId!, user: member?.user.id || interaction.user.id },
		});
		switch (interaction.options.getSubcommand()) {
			case 'add':
				const reason = interaction.options.getString('reason');
				if (!interaction.memberPermissions?.has(Permissions.FLAGS.KICK_MEMBERS)) {
					await interaction.reply("You don't have permission to do this!");
					break;
				}
				if (!member) {
					await interaction.reply('You must specify a member!');
					break;
				}
				const wl = await prisma.limit.findUnique({
					where: { guild_type: { guild: interaction.guildId!, type: 'WARN' } },
					select: { limit: true },
				});
				if (!wl?.limit) {
					await interaction.reply('There is no warn limit set: `.limits warn <limit>`');
					break;
				}
				if (!reason) {
					await interaction.reply('You must specify a reason!');
					break;
				}
				await prisma.warn.create({
					data: {
						reason,
						guild: interaction.guildId!,
						user: member.id,
					},
				});
				const warnings = (await prisma.warn.findMany()).length;
				if (warnings % wl.limit === 0) {
					await punish({
						member,
						reason,
						guild: interaction.guildId!,
					});
				}
				const logs = await prisma.channel.findUnique({
					where: { guild_type: { guild: interaction.guildId!, type: 'LOGS' } },
					select: { channel: true },
				});
				if (!logs) break;
				const warnLogEmbed = new MessageEmbed()
					.setTitle(`**Member Warned**: ${member?.user.tag}`)
					.setDescription(`**Reason**: ${reason} \n\n **Reporter**: ${interaction.user}`)
					.setColor('#2F3136')
					.setThumbnail(member?.user.avatarURL()!);
				const logsChannel = (await interaction.guild?.channels.fetch(logs?.channel!)) as TextChannel;
				if (!logsChannel) break;
				logsChannel.send({ embeds: [warnLogEmbed] });

				const warnEmbed = new MessageEmbed().setDescription(`${member?.user} was warned for ${reason}`).setColor('#2F3136');
				await interaction.reply({ embeds: [warnEmbed] });

				const dmEmbed = new MessageEmbed()
					.setTitle('Warning')
					.setDescription(`You were warned in **${interaction.guild?.name}** \n You currently have: **${warnings}** Warnings`)
					.setColor('#2F3136');

				member.user.send({ embeds: [dmEmbed] });
				break;

			case 'remove':
				const id = interaction.options.getString('id');
				if (!interaction.memberPermissions?.has(Permissions.FLAGS.KICK_MEMBERS)) {
					interaction.channel?.send("You don't have permissions to do this!");
					break;
				}
				const { user } = member! || interaction.member!;
				if (!id) {
					await prisma.warn.delete({
						where: { guild_user: { guild: interaction.guildId!, user: user.id } },
					});
					await interaction.reply(`Removed warnings from ${user}!`);
					break;
				}
				if (!warns.some(w => w.id === id)) {
					await interaction.reply(`Warning with id \`${id}\` doesn't exist!`);
					break;
				}
				await prisma.warn.delete({
					where: { id },
				});
				await interaction.reply(`Removed warning from ${user} with id \`${id}\`!`);
				break;

			case 'show':
				const showMember = member! || interaction.member!;
				const warningsEmbed = new MessageEmbed()
					.setTitle(`Warnings for ${showMember?.user.tag}`)
					.setDescription(`**Warnings - ${warns?.length}**`)
					.setThumbnail(showMember?.user.avatarURL()!)
					.setColor('#2F3136');
				warns.forEach(w => {
					warningsEmbed.addField(w.id, w.reason);
				});
				await interaction.reply({ embeds: [warningsEmbed] });
				break;
		}
	},
} as Slash;
