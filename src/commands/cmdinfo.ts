import type { CommandArgs } from '../types';
import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';

export default {
	name: 'command',
	run({ message, args }: CommandArgs) {
		switch (args[0]) {
			case 'channelcreatelimit':
				const channelcreatelimitEmbed = new MessageEmbed()
					.setTitle('Channel Create Limit')
					.setDescription(
						'**Examples:** \n `.config channelcreatelimit 5` \n \n Replace the five with the ammount of channels you want a admin to be able to create.'
					)
					.setColor('#2F3136')
					.setFooter({
						text: 'Spy Bot',
						iconURL:
							'https://cdn.discordapp.com/avatars/939629038178295828/79c386588754ef3775b8ffd4654669f3.webp?size=80)',
					});
				const limit1 = new MessageActionRow().addComponents(
					new MessageButton()
						.setURL(
							'https://eldiplayz.gitbook.io/spy-bot-docs/basic-setups/limits/channel-create-limit'
						)
						.setLabel('Docs')
						.setStyle('LINK')
				);
				message.channel.send({
					embeds: [channelcreatelimitEmbed],
					components: [limit1],
				});
				break;

			case 'channeldeletelimit':
				const channeldeletelimitEmbed = new MessageEmbed()
					.setTitle('Channel Delete Limit')
					.setDescription(
						'**Examples:** \n `.config channeldeletelimit 5` \n \n Replace the five with the ammount of channels you want a admin to be able to delete.'
					)
					.setColor('#2F3136')
					.setFooter({
						text: 'Spy Bot',
						iconURL:
							'https://cdn.discordapp.com/avatars/939629038178295828/79c386588754ef3775b8ffd4654669f3.webp?size=80)',
					});
				const limit2 = new MessageActionRow().addComponents(
					new MessageButton()
						.setURL(
							'https://eldiplayz.gitbook.io/spy-bot-docs/basic-setups/limits/channel-delete-limit'
						)
						.setLabel('Docs')
						.setStyle('LINK')
				);
				message.channel.send({
					embeds: [channeldeletelimitEmbed],
					components: [limit2],
				});
				break;

			case 'rolecreatelimit':
				const rolecreatelimitEmbed = new MessageEmbed()
					.setTitle('Role Create Limit')
					.setDescription(
						'**Examples:** \n `.config rolecreatelimit 5` \n \n Replace the five with the ammount of roles you want a admin to be able to create.'
					)
					.setColor('#2F3136')
					.setFooter({
						text: 'Spy Bot',
						iconURL:
							'https://cdn.discordapp.com/avatars/939629038178295828/79c386588754ef3775b8ffd4654669f3.webp?size=80)',
					});
				const limit3 = new MessageActionRow().addComponents(
					new MessageButton()
						.setURL(
							'https://eldiplayz.gitbook.io/spy-bot-docs/basic-setups/limits/role-create-limit'
						)
						.setLabel('Docs')
						.setStyle('LINK')
				);
				message.channel.send({
					embeds: [rolecreatelimitEmbed],
					components: [limit3],
				});
				break;

			case 'roledeletelimit':
				const roledeletelimitEmbed = new MessageEmbed()
					.setTitle('Role Delete Limit')
					.setDescription(
						'**Examples:** \n `.config rolecreatelimit 5` \n \n Replace the five with the ammount of roles you want a admin to be able to delete.'
					)
					.setColor('#2F3136')
					.setFooter({
						text: 'Spy Bot',
						iconURL:
							'https://cdn.discordapp.com/avatars/939629038178295828/79c386588754ef3775b8ffd4654669f3.webp?size=80)',
					});
				const limit4 = new MessageActionRow().addComponents(
					new MessageButton()
						.setURL(
							'https://eldiplayz.gitbook.io/spy-bot-docs/basic-setups/limits/role-delete-limit'
						)
						.setLabel('Docs')
						.setStyle('LINK')
				);
				message.channel.send({
					embeds: [roledeletelimitEmbed],
					components: [limit4],
				});
				break;

			case 'kicklimit':
				const kicklimitEmbed = new MessageEmbed()
					.setTitle('Kick Limit')
					.setDescription(
						'**Examples:** \n `.config kicklimit 5` \n \n Replace the five with the ammount of members you want a admin to be able to kick.'
					)
					.setColor('#2F3136')
					.setFooter({
						text: 'Spy Bot',
						iconURL:
							'https://cdn.discordapp.com/avatars/939629038178295828/79c386588754ef3775b8ffd4654669f3.webp?size=80)',
					});
				const limit5 = new MessageActionRow().addComponents(
					new MessageButton()
						.setURL(
							'https://eldiplayz.gitbook.io/spy-bot-docs/basic-setups/limits/kick-limit'
						)
						.setLabel('Docs')
						.setStyle('LINK')
				);
				message.channel.send({
					embeds: [kicklimitEmbed],
					components: [limit5],
				});
				break;

			case 'banlimit':
				const banlimitEmbed = new MessageEmbed()
					.setTitle('Ban Limit')
					.setDescription(
						'**Examples:** \n `.config kicklimit 5` \n \n Replace the five with the ammount of members you want a admin to be able to ban.'
					)
					.setColor('#2F3136')
					.setFooter({
						text: 'Spy Bot',
						iconURL:
							'https://cdn.discordapp.com/avatars/939629038178295828/79c386588754ef3775b8ffd4654669f3.webp?size=80)',
					});
				const limit6 = new MessageActionRow().addComponents(
					new MessageButton()
						.setURL(
							'https://eldiplayz.gitbook.io/spy-bot-docs/basic-setups/limits/ban-limit'
						)
						.setLabel('Docs')
						.setStyle('LINK')
				);
				message.channel.send({ embeds: [banlimitEmbed], components: [limit6] });
				break;

			case 'logs':
				const logsEmbed = new MessageEmbed()
					.setTitle('Logs')
					.setDescription(
						'**Examples:** \n `.config logs #logs-channel` \n \n Replace the #logs-channel with your server logs channel.'
					)
					.setColor('#2F3136')
					.setFooter({
						text: 'Spy Bot',
						iconURL:
							'https://cdn.discordapp.com/avatars/939629038178295828/79c386588754ef3775b8ffd4654669f3.webp?size=80)',
					});
				const limit7 = new MessageActionRow().addComponents(
					new MessageButton()
						.setURL(
							'https://eldiplayz.gitbook.io/spy-bot-docs/basic-setups/limits/ban-limit'
						)
						.setLabel('Docs')
						.setStyle('LINK')
				);
				message.channel.send({ embeds: [logsEmbed], components: [limit7] });
				break;
		}
	},
};
