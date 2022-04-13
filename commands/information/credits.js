import { MessageEmbed } from "discord.js"

export default {
	name: "credits",
	run(_, message, __, ___) {
		const creditsEmbed = new MessageEmbed()
			.setTitle("Credits") .setThumbnail("https://cdn.discordapp.com/avatars/939629038178295828/46177dc48e152f86718afb5f05884159.webp?size=80%22")
			.setDescription(" \n Original anti code creation credits go to `legendjs#0001` and `Darkboy#9966` for a whole remake of them. \n \n Other bot commands code currently now being upgraded and worked on by 2 devs below \n \n <:badgebotdeveloper:950068791667224606> `eldi mindcrafter#0503` \n \n <:badgebotdeveloper:950068791667224606> `AngelNext#9162`\n")
			.setColor("2F3136")
			.setFooter({ text: "Spy Bot", iconURL: "https://cdn.discordapp.com/avatars/939629038178295828/46177dc48e152f86718afb5f05884159.webp?size=80%22)" })
		message.channel.send({ embeds: [creditsEmbed] })
	}
}