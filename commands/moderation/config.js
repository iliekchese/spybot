import Discord from "discord.js"

export default {
	name: 'config',
	run: async (client, message, args, db) => {
		let ops = [
			'channelCreateLimit',
			'channelDeleteLimit',
			'roleCreateLimit',
			'roleDeleteLimit',
			'banLimit',
			'kickLimit',
			'logs',
			'show',
			'punishment'
		];
		const disabled = ":x: Disabled"
		const check = (msg, arr) => arr.some(op => op.toLowerCase() === msg.toLowerCase())
		const bruh = new Discord.MessageEmbed()
			.setTitle('<:Settings:939853181180080168> **Anti-Raid | Config**')
			.setDescription(`
**The Options are listed below:**
config ${ops.join("\n config ")}
`)
			.setColor("#FF0000")
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
			.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
			.setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
		if (!args[0]) return message.channel.send({ embeds: [bruh] });
		if (check(args[0], ops) === false)
			return message.channel.send(
				':x: | **The only options are: `channelCreateLimit`, `channelDeleteLimit`, `roleCreateLimit`, `roleDeleteLimit`, `banLimit`, `kickLimit`, `logs`, `show` & `punishment`** \n If you need help setting the bot up join our support server https://discord.gg/5qv5sHBPew'
			);
		
		switch (args[0].toLowerCase()) {
			case "show":
				const rcl = db.get(`rolecreate_${message.guild.id}`)
				const rdl = db.get(`roledelete_${message.guild.id}`)
				const ccl = db.get(`channelcreate_${message.guild.id}`)
				const cdl = db.get(`channeldelete_${message.guild.id}`)
				const bl = db.get(`banlimit_${message.guild.id}`)
				const kl = db.get(`kicklimit_${message.guild.id}`)
				let logs = db.get(`logs_${message.guild.id}`)
				const punish = db.get(`punish_${message.guild.id}`)
				if (logs === null) {
					logs = disabled
				} else if (logs !== null && logs !== disabled) {
					logs = client.channels.cache.get(logs)
					if (!logs) {
						logs = disabled
					}
				}
				const show = new Discord.MessageEmbed()
					.setTitle("**Anti-Raid | Config**")
					.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
					.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
					.setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
					.addField("Channel Create Limit", `${ccl || disabled}`)
					.addField("Channel Delete Limit", `${cdl || disabled}`)
					.addField("Role Create Limit", `${rcl || disabled}`)
					.addField("Role Delete Limit", `${rdl || disabled}`)
					.addField("Ban Limits", `${bl || disabled}`)
					.addField("Kick Limits", `${kl || disabled}`)
					.addField("Logs", logs.toString() || disabled)
					.addField("Punishment", `${punish || disabled}`)
					.setColor("GREEN")
				return message.channel.send({ embeds: [show] })
				
			case "channelcreatelimit":
				if (!args[1]) return message.channel.send(":x: | **Provide The limit**")
				if (isNaN(args[1])) return message.channel.send(":x: | **The limit has to be a number**")
				if (Number(args[1]) < 1) return message.channel.send(":x: | **The limit cannot be zero or negative number**")
				db.set(`channelcreate_${message.guild.id}`, Number(args[1]))
				return message.channel.send("**The channel Create limit has been set to " + Number(args[1]) + "**")
			case "channeldeletelimit":
				if (!args[1]) return message.channel.send(":x: | **Provide The limit**")
				if (isNaN(args[1])) return message.channel.send(":x: | **The limit has to be a number**")
				if (Number(args[1]) < 1) return message.channel.send(":x: | **The limit cannot be zero or negative number**")
				db.set(`channeldelete_${message.guild.id}`, Number(args[1]))
				return message.channel.send("**The channel Delete limit has been set to " + Number(args[1]) + "**")

			case "rolecreatelimit":
				if (!args[1]) return message.channel.send(":x: | **Provide The limit**")
				if (isNaN(args[1])) return message.channel.send(":x: | **The limit has to be a number**")
				if (Number(args[1]) < 1) return message.channel.send(":x: | **The limit cannot be zero or negative number**")
				db.set(`rolecreate_${message.guild.id}`, Number(args[1]))
				return message.channel.send("**The role Create limit has been set to " + Number(args[1]) + "**")
			case "roledeletelimit":
				if (!args[1]) return message.channel.send(":x: | **Provide The limit**")
				if (isNaN(args[1])) return message.channel.send(":x: | **The limit has to be a number**")
				if (Number(args[1]) < 1) return message.channel.send(":x: | **The limit cannot be zero or negative number**")
				db.set(`roledelete_${message.guild.id}`, Number(args[1]))
				return message.channel.send("**The role Delete limit has been set to " + Number(args[1]) + "**")
			case "banlimit":
				if (!args[1]) return message.channel.send(":x: | **Provide The limit**")
				if (isNaN(args[1])) return message.channel.send(":x: | **The limit has to be a number**")
				if (Number(args[1]) < 1) return message.channel.send(":x: | **The limit cannot be zero or negative number**")
				db.set(`banlimit_${message.guild.id}`, Number(args[1]))
				return message.channel.send("**The ban limit has been set to " + Number(args[1]) + "**")

			case "kicklimit":
				if (!args[1]) return message.channel.send(":x: | **Provide The limit**")
				if (isNaN(args[1])) return message.channel.send(":x: | **The limit has to be a number**")
				if (Number(args[1]) < 1) return message.channel.send(":x: | **The limit cannot be zero or negative number**")
				db.set(`kicklimit_${message.guild.id}`, Number(args[1]))
				return message.channel.send("**The kick limit has been set to " + Number(args[1]) + "**")

			case "punishment":
				if (!args[1]) return message.channel.send(":x: | **Provide The punishment**")
				if (check(args[1], ["ban", "kick", "demote"]) === false) return message.channel.send(":x: | **The punishment can only be kick, ban or demote**")
				db.set(`punish_${message.guild.id}`, args[1].toLowerCase())
				return message.channel.send("**The punishment has been set to " + args[1] + "**")

			case "logs":
				let channel = message.mentions.channels.first()
				if (!channel) return message.channel.send(":x: | **Mention The channel**")
				if (channel.guild.id !== message.guild.id) return message.channel.send(":x: | **That channel is not from this server**")
				db.set(`logs_${message.guild.id}`, channel.id)
				channel.send("**Anti Raid logs Channel**")
				return message.channel.send("**The logs channel has been set to " + args[1] + "**")

		}
	}
};
