import type { ICommandArgs } from '../..';
import { Permissions } from 'discord.js'

export default {
	name: 'clearuser',
	async run({ message, db }: ICommandArgs) {
    if (!message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			message.channel.send("You don't have permission to do this!")
			return;
		}
		const user = message.mentions.users.first();
		const userMods = [
			`${message.guild?.id}_${user?.id}_rolecreate`,
			`${message.guild?.id}_${user?.id}_roledelete`,
			`${message.guild?.id}_${user?.id}_channelcreate`,
			`${message.guild?.id}_${user?.id}_channeldelete`,
			`${message.guild?.id}_${user?.id}_banlimit`,
			`${message.guild?.id}_${user?.id}_kicklimit`,
		];
		userMods.forEach(mod => db.delete(mod));
		return message.channel.send('**Done!**');
	},
};
