import { MessageEmbed } from 'discord.js';
export default {
    name: 'test',
    run({ message }) {
        const testEmbed = new MessageEmbed()
            .setTitle('Account Kicked!')
            .setDescription('<:arrow:951862606958821506>A supicious new account was kicked \n \n `Username:` Account username here \n `Account Created:` Account Creation Date Here \n `Account joined with the invite:` Invite here')
            .setColor('#2F3136')
            .setFooter({
            text: 'Spy Bot',
            iconURL: 'https://cdn.discordapp.com/avatars/939629038178295828/46177dc48e152f86718afb5f05884159.webp?size=80%22)',
        });
        message.channel.send({ embeds: [testEmbed] });
    },
};
