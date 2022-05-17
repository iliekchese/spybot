import type { GuildMember } from 'discord.js';
import { prisma } from '../database';

interface PunisherOption {
	member: GuildMember;
	reason: string;
	guild: string;
}

type Punish = (args: PunisherOption) => Promise<string>;

const punish: Punish = async ({ member, reason, guild }) => {
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
			await member.roles.set([]);
			break;

		case 'QUARANTINE':
			const quarantineRole = member?.guild.roles.cache.find(role => role.name === 'Quarantine');
			await member.roles.set([quarantineRole!]);
			break;
	}
	return punish?.option!;
};

export default punish;
