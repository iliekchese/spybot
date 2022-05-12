import type { CommandArgs } from '../types';
import { prisma } from '../database';
import { MessageEmbed, Permissions } from 'discord.js';

export default {
	name: 'limits',
	async run({ message, args }: CommandArgs) {
		if (args[0] === 'show') {
			const limits = await prisma.limit.findMany();
			const limitsEmbed = new MessageEmbed()
				.setTitle('**Spy Bot | Limits**')
				.setDescription(
					"If a limit is not here it means that it's not set, to set it do: `.limits <type: EXAMPLE -> channelcreate> <amount: EXAMPLE -> 5>`"
				)
				.setAuthor({
					name: message.author.tag,
					iconURL: message.author.displayAvatarURL({ dynamic: true }),
				})
				.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
				.setFooter({
					text: message.guild?.name!,
					iconURL: message.guild?.iconURL()!,
				})
				.setColor('GREEN');
			limits.forEach(({ type, limit }) => {
				limitsEmbed.addField(type, limit.toString(), true);
			});
			message.channel.send({ embeds: [limitsEmbed] });
			return;
		}
		const [type, limit] = args;
		if (!message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			message.channel.send("You don't have permission to do this!");
			return;
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

		const isLimit =
			type === 'channelcreate' ||
			type === 'channeldelete' ||
			type === 'rolecreate' ||
			type === 'roledelete' ||
			type === 'kick' ||
			type === 'ban' ||
			type === 'warn';

		if (!isLimit) {
			message.channel.send(`
				Not a valid limit, valid limits are:

				**channelcreate, channeldelete,
				rolecreate, roledelete, 
				kick, ban,
				warn**
			`);
			return;
		}
		await prisma.limit.upsert({
			where: { guild_type: { guild: message.guildId!, type } },
			update: { limit: Number(limit) },
			create: {
				guild: message.guildId!,
				type,
				limit: Number(limit),
			},
		});
		message.channel.send(`**${type}** has been updated to ${limit}!`);
	},
};
