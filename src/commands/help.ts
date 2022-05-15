import type { Command } from '../types';
import type { TextChannel } from "discord.js"
import { MessageEmbed } from 'discord.js';
import { Pagination } from "discordjs-button-embed-pagination";

export default {
	name: 'help',
	aliases: ['h'],
	async run({ message }) {
    const helpEmbed = new MessageEmbed()
			.setTitle("Help")
      .setDescription("<:arrow:951862606958821506> First type `.setup` \n \n Next to setup the configs type `.config help` \n  \n Make sure the bots role is under the owner role. \n Now make sure to whitelist admins by using- the whitelist command `.whitelist add <user>` \n \n Next select the limits like the channel create ones roles etc. \n \n Make sure to type `.config <limit options> <limitammount>` Do one of the limits from the configs and do a ammount of channels you want a admin to be abble to create. \n \n  Next type `.config punishment <demote/kick/ban>` do one of these you want to happen to the admin who bypasses one of the limits.")
      .setColor("#2F3136")
    
		const embed1 = new MessageEmbed()
			.setTitle("Limits")
      .setDescription("`.limits channelcreate` \n `.limits channeldelete` \n `.limits rolecreate` \n `.limits roledelete` \n `.limits kick` \n `.limits ban` \n `.limits show` \n `.config punishment` \n `.config logs` \n `.whitelist add` \n `.whitelist remove` \n `.whitelist remove` \n `.setup`")
      .setColor("#2F3136")
    
		const embed2 = new MessageEmbed()
			.setTitle("Moderation")
      .setDescription("`.kick` \n `.ban` \n `.quarantine add` \n `.quarantine remove` \n `.info`")
      .setColor("#2F3136")

		const embed3 = new MessageEmbed()
			.setTitle("Verification")
      .setDescription("`.verification start` \n `.verification channel` \n `.verification role`")
      .setColor("#2F3136")
    
    const embed4 = new MessageEmbed()
			.setTitle("Other")
      .setDescription("`.modules` \n `.suggestions set` \n `.suggestions new` \n `.vote` \n `.credits` \n `.cmdinfo`")
      .setColor("#2F3136")
    
		await new Pagination(message.channel as TextChannel, [helpEmbed, embed1, embed2, embed3, embed4], "page", 60000, [
			{
				style: "SECONDARY",
				emoji: "⏪"
			},
			{
				style: "SECONDARY",
				emoji: "◀"
			},
			{
				style: "SECONDARY",
				emoji: "❌"
			},
			{
				style: "SECONDARY",
				emoji: "▶"
			},
			{
				style: "SECONDARY",
				emoji: "⏩"
			},
		]).paginate();
	}
} as Command;