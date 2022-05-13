import type { Command } from '../types';
import { MessageEmbed, Permissions } from 'discord.js';

export default {
	name: 'quarantine',
	async run({ message, args }) {
		if (!message.member?.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
			message.channel.send("You don't have permission to do this!");
			return;
		}
		const member = message.mentions.members?.first();
		const role = member?.guild.roles.cache.find(role => role.name === 'Quarantine');
		switch (args[0]) {
			case 'add':
				const quarantineEmbed = new MessageEmbed()
					.setTitle('Quarantine')
					.setDescription(`${member?.user} Was succsesfully quarantined.`)
					.setColor('#2F3136');
				message.channel.send({ embeds: [quarantineEmbed] });

				const quarantineDMEmbed = new MessageEmbed()
					.setTitle('Quarantine')
					.setDescription(
						`You were quarantined in \`${message.guild?.name}\` \n By server moderators.`
					)
					.setColor('#2F3136');

				member?.user.send({ embeds: [quarantineDMEmbed] });
				member?.roles.cache
					.filter(r => r.name !== '@everyone')
					.forEach(async r => await member?.roles.remove(r.id));
				member?.roles.add(role!);
				break;

			case 'remove':
				const unquarantineEmbed = new MessageEmbed()
					.setTitle('Quarantine')
					.setDescription(`${member?.user} Was succsesfully unquarantined.`)
					.setColor('#2F3136');
				message.channel.send({ embeds: [unquarantineEmbed] });

				const unquarantineDMEmbed = new MessageEmbed()
					.setTitle('Quarantine')
					.setDescription(
						`You were unquarantined in \`${message.guild?.name}\` \n By server moderators.`
					)
					.setColor('#2F3136');
				member?.user.send({ embeds: [unquarantineDMEmbed] });
				member?.roles.remove(role!);
				break;
		}
	},
} as Command;
