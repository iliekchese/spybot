import type { Handler } from "../types"
import type { TextChannel } from 'discord.js'
import { prisma } from "../database"
import { MessageEmbed } from "discord.js"

export const handler: Handler = ({ client }) => {
	client.on("messageDelete", async message => {
		const audit = await message.guild?.fetchAuditLogs({
			type: "MESSAGE_DELETE",
			limit: 1
		})
		const user = audit?.entries.first()?.executor
		const whitelist = await prisma.whitelist.findUnique({
			where: { guild: message.guildId! },
			select: { users: true }
		})
		if (whitelist?.users.some(id => id === user?.id)) return;
		const logs = await prisma.channel.findUnique({
			where: { guild_type: { guild: message.guildId!, type: 'LOGS' } },
			select: { channel: true }
		})
		const messageDeleteEmbed = new MessageEmbed()
			.setAuthor({
				name: message.member?.user.tag!,
				iconURL: message.member?.user.avatarURL()!,
			})
			.setTitle('Deleted Message')
			.setDescription(`${message.content}`)
			.addField("Channel", message.channel.toString())
			.addField('Deleted By', user?.toString()!)
			.setColor('#2F3136');
		const logsChannel = (await message.guild?.channels.fetch(logs?.channel!)) as TextChannel;
		logsChannel?.send({ embeds: [messageDeleteEmbed] }); 
	})

	client.on('messageUpdate', async message => {
		const whitelist = await prisma.whitelist.findUnique({
			where: { guild: message.guildId! },
			select: { users: true }
		})
		if (whitelist?.users.some(id => id === message.author?.id)) return;
		const logs = await prisma.channel.findUnique({
			where: { guild_type: { guild: message.guildId!, type: 'LOGS' } },
			select: { channel: true }
		})
		const msg = await message.channel.messages.fetch(message.id)
		const messageEditEmbed = new MessageEmbed()
			.setAuthor({
				name: message.member?.user.tag!,
				iconURL: message.member?.user.avatarURL()!,
			})
			.setTitle('Edited Message')
			.addField("Old", message.content!)
			.addField("New", msg.content!)
			.addField("Channel", message.channel.toString())
			.setColor('#2F3136');
		const logsChannel = (await message.guild?.channels.fetch(logs?.channel!)) as TextChannel;
		logsChannel?.send({ embeds: [messageEditEmbed] }); 
	})
}