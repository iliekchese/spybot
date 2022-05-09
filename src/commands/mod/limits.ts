import type { CommandArgs } from '../../types';
import { prisma } from '../../database';
import { Permissions } from 'discord.js';

export default {
	name: 'limits',
	async run({ message, args }: CommandArgs) {
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
				message.channel.send(
					':x: | **The limit cannot be zero or negative number**'
				);
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
			where: { guild: message.guildId!, type },
			update: { limit: Number(limit) },
			create: {
				guild: message.guildId!,
				type,
				limit: Number(limit),
			},
		});
		message.channel.send(`${limit} has been updated!`);
	},
};
