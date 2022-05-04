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
				db.set(`suggestions_${message.guild?.id}`, `s${channel.id}`);
				channel.send('**Suggestions Channel**');
				return message.channel.send(
					`**The suggestions channel has been set to ${args[1]}**`
				);

			case 'new':
				const embed = new MessageEmbed()
					.setTitle(`A new suggestion was submitted by ${message.author.tag}`)
          .setThumbnail(message.author.avatarURL()!)
					.setDescription(args.slice(1).join(' '))
					.setColor('#2F3136');
				const suggestionsChannel = client.channels.cache.get(
					db.get(`suggestions_${message.guild?.id}`).slice(1)
				) as TextChannel;
				console.log(db.get(`suggestions_${message.guild?.id}`).slice(1))
				suggestionsChannel?.send({ embeds: [embed] }).then((msg) => {
					msg.react('✅');
					msg.react('❌');
          message.channel.send("**Suggestion submitted**")
				});
		}
	},
};
