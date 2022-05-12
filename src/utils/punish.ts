import type { GuildMember } from 'discord.js';
import { prisma } from '../database';

const punish = async (member: GuildMember, reason: string, guild: string): Promise<string> => {
	const whitelist = await prisma.whitelist.findUnique({
		where: { guild },
		select: { users: true },
	});
	if (whitelist?.users.some(id => id === member.user.id)) return 'whitelist';
	const punish = await prisma.punish.findUnique({
		where: { guild },
		select: { option: true },
	});
	switch (punish?.option) {
		case 'kick':
			await member?.kick(reason);
			break;

		case 'ban':
			await member?.ban({ reason });
			break;

		case 'demote':
			member?.roles.cache
				.filter(r => r.name !== '@everyone')
				.forEach(async r => await member?.roles.remove(r.id));
			break;

		case 'quarantine':
			const quarantineRole = member?.guild.roles.cache.find(role => role.name === 'Quarantine');
			member?.roles.cache
				.filter(r => r.name !== '@everyone')
				.forEach(async r => await member?.roles.remove(r.id));
			member?.roles.add(quarantineRole!);
			break;
	}
	return punish?.option!;
};

export default punish;
