import type { CommandArgs } from '../..';
import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';

export default {
	name: 'info',
	async run({ message, args }: CommandArgs) {
		const member =
			message.mentions.members?.first() ||
			message.guild?.members.cache.get(args[0]) ||
			message.member!;
		const infoEmbed = new MessageEmbed()
			.setTitle(`Who is ${member.user.tag}?`)
			.addField(`Username`, `${member.user.tag}`)
			.addField(`Id`, `${member.user.id}`)
			.addField(
				`Account Created`,
				`<t:${Math.floor(member.user.createdTimestamp / 1000) + 3600}:R>`
			)
			.addField(
				`Joined`,
				`<t:${Math.floor(member.joinedTimestamp! / 1000) + 3600}:R>`
			)
			.addField(`Bot`, member.user.bot.toString())
			.addField(
				`Roles`,
				member.roles.cache
					.filter(role => role.name !== '@everyone')
					.map(role => `<@&${role.id}>`)
					.join(member.roles.cache.size >= 10 ? ' | ' : '\n')
			)
			.setThumbnail(member.user.avatarURL()!)
			.setColor('#2F3136')
			.setFooter({
				text: 'Spy Bot',
				iconURL:
					'https://cdn.discordapp.com/avatars/939629038178295828/861602a3003bf4b82e3397aaf1285ed2.webp?size=80)',
			});

		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setURL(member.user.avatarURL()!)
				.setLabel('Users Avatar')
				.setStyle('LINK')
		);

		message.channel.send({ embeds: [infoEmbed], components: [row] });
	},
};
