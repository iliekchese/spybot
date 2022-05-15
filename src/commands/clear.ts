import type { Command } from "../types"
import type { TextChannel } from "discord.js"
import { Permissions } from "discord.js"

export default {
	name: "clear",
	async run({ message, args }) {
		if (!message.member?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
			message.channel.send(":x: | **You don't have permission to do this!**");
			return;
		}
		const [strAmount] = args
		if (!strAmount) {
			message.channel.send(':x: | **You must provide amount**');
			return;
		}
		const amount = parseInt(strAmount)
		if (isNaN(amount)) {
			message.channel.send(':x: | **Amount must be a number**')
			return;
		}
		await (message.channel as TextChannel).bulkDelete(amount + 1)
		const msg = await message.channel.send(`:white_check_mark: | **Deleted ${amount} messages**`)
		setTimeout(async () => {
  		await msg.delete()
		}, 3000)
	}
} as Command