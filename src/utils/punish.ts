import type { GuildMember } from 'discord.js';
import { prisma } from '../database';

const punish = async (member: GuildMember, reason: string, guild: string): Promise<string> => {
	const whitelist = await prisma.whitelist.findUnique({
		where: { guild },
		select: { users: true },
	});
	if (whitelist?.users.some(id => id === member?.user.id)) return 'whitelist';
	const punish = await prisma.punish.findUnique({
		where: { guild },
		select: { option: true },
	});
	switch (punish?.option) {
		case 'KICK':
			await member?.kick(reason);
			break;

		case 'BAN':
			await member?.ban({ reason });
			break;

		case 'DEMOTE':
			member.roles.set([]);
			break;

		case 'QUARANTINE':
			const quarantineRole = member?.guild.roles.cache.find(role => role.name === 'Quarantine');
			member.roles.set([quarantineRole!]);
			break;
	}
	return punish?.option!;
};

export default punish;
