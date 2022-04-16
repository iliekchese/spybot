import type { Role, TextChannel } from 'discord.js';
import type { ICommandArgs } from '../..';

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
		} catch (err) {
			console.error(err);
		}
	},
};
