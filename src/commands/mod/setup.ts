import type { Role, TextChannel } from 'discord.js';
import type { ICommandArgs } from '../..';
import { MessageEmbed } from "discord.js"

process.on('uncaughtException', (err) => {
    console.log(err.message);
});

export default {
	name: 'setup',
	async run({ message, db }: ICommandArgs) {
		try {
			message.guild?.channels.create('spy bot logs', {
				type: 'GUILD_TEXT',
				permissionOverwrites: [
					{
						id: message.guild.id,
						deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
					},
				],
			});
			let muteRole: Role | undefined;
			const dbmute = await db.get(`muterole_${message.guild?.id}`);
			let guildMuteRole = message.guild?.roles.cache.find(
				r => r.name === 'muted'
			);

			if (!message.guild?.roles.cache.has(dbmute)) {
				muteRole = guildMuteRole;
			} else {
				muteRole = message.guild.roles.cache.get(dbmute);
			}

			if (!muteRole) {
				muteRole = await message.guild?.roles.create({
					color: 'RED',
					name: 'Muted',
          position: 5,
				});
				message.guild?.channels.cache.forEach(async c => {
					const channel = c as TextChannel;
					await channel.permissionOverwrites.create(muteRole || '', {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false,
						SPEAK: false,
						CONNECT: false,
					});
				});
			}
			const setupEmbed = new MessageEmbed()
				.setTitle('Setup Was Completed')
				.setDescription('✅ Setup was successfully completed')
				.setColor('#2F3136')
				.setFooter({
					text: 'Spy Bot',
					iconURL: 'https://cdn.discordapp.com/avatars/939629038178295828/46177dc48e152f86718afb5f05884159.webp?size=80%22)',
				});
			message.channel.send({ embeds: [setupEmbed] });
		} catch (err) {
			const setupEmbed = new MessageEmbed()
				.setTitle('Setup Not Completed')
				.setDescription('❌ Setup not was successfully completed')
				.setColor('#2F3136')
				.setFooter({
					text: 'Spy Bot',
					iconURL: 'https://cdn.discordapp.com/avatars/939629038178295828/46177dc48e152f86718afb5f05884159.webp?size=80%22)',
				});
			message.channel.send({ embeds: [setupEmbed] });
			console.error(err);
		}
	},
};
