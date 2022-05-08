import type { ICommandArgs } from '../..';
import type { TextChannel } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { prisma } from '../../database';

export default {
	name: 'suggestions',
	async run({ client, message, args }: ICommandArgs) {
		switch (args[0]) {
			case 'set':
				const channel = message.mentions.channels.first() as TextChannel;
				if (!channel) {
					message.channel.send(':x: | **Mention The channel**');
					break;
				}
				if (channel.guild.id !== message.guild?.id) {
					message.channel.send(
						':x: | **That channel is not from this server**'
					);
					break;
				}
				await prisma.suggestionsChannel.create({
					data: { guild: message.guild?.id!, id: channel.id }
				})
				channel.send('**Suggestions Channel**');
				message.channel.send(
					`**The suggestions channel has been set to ${args[1]}**`
				);
				break;

			case 'new':
				const embed = new MessageEmbed()
					.setTitle(`A new suggestion was submitted by ${message.author.tag}`)
          .setThumbnail(message.author.avatarURL()!)
					.setDescription(args.slice(1).join(' '))
					.setColor('#2F3136');
				const suggestions = await prisma.suggestionsChannel.findUnique({
					where: { guild: message.guild?.id! }
				})
				if (!suggestions) {
					message.channel.send(":x: | **There is no suggestions channel set:** `.suggestions set <channel>`");
					break;
				}
				const suggestionsChannel = client.channels.cache.get(suggestions?.id!) as TextChannel;
				suggestionsChannel?.send({ embeds: [embed] }).then((msg) => {
					msg.react('✅');
					msg.react('❌');
          message.channel.send("**Suggestion submitted**")
				});
		}
	},
};
