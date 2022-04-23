import { MessageEmbed } from 'discord.js';
export default {
    name: 'warn',
    run({ message }) {
        const warnexampleEmbed = new MessageEmbed()
            .setTitle('Warning')
            .setDescription('You were warned in **Spy Bot Support** \n By a server moderator.')
            .setColor('#2F3136');
        message.channel.send({ embeds: [warnexampleEmbed] });
    },
};
