import type { ICommandArgs } from '../..';
import type { TextChannel } from 'discord.js';
import { MessageEmbed } from 'discord.js';

export default {
	name: 'suggestions',
	run({ client, message, args, db }: ICommandArgs) {
		switch (args[0]) {
			case 'set':
				const channel = message.mentions.channels.first() as TextChannel;
				if (!channel)
					return message.channel.send(':x: | **Mention The channel**');
				if (channel.guild.id !== message.guild?.id)
					return message.channel.send(
						':x: | **That channel is not from this server**'
					);
				db.set(`suggestions_${message.guild?.id}`, channel.id);
				channel.send('**Suggestions Channel**');
				return message.channel.send(
					`**The suggestions channel has been set to ${args[1]}**`
				);

			case 'new':
				const embed = new MessageEmbed()
					.setTitle(`A new suggestion was submitted by ${message.author.tag}`)
					.setDescription(args.slice(1).join(' '))
					.setColor('#2F3136');
				const suggestionsChannel = client.channels.cache.get(
					db.get(`suggestions_${message.guild?.id}`)
				) as TextChannel;
				suggestionsChannel?.send({ embeds: [embed] }).then(({ react }) => {
					react('✅');
					react('❌');
				});
		}
	},
};