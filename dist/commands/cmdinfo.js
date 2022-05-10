"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
    name: 'command',
    run: function (_a) {
        var message = _a.message, args = _a.args;
        switch (args[0]) {
            case 'channelcreatelimit':
                var channelcreatelimitEmbed = new discord_js_1.MessageEmbed()
                    .setTitle('Channel Create Limit')
                    .setDescription('**Examples:** \n `.config channelcreatelimit 5` \n \n Replace the five with the ammount of channels you want a admin to be able to create.')
                    .setColor('#2F3136')
                    .setFooter({
                    text: 'Spy Bot',
                    iconURL: 'https://cdn.discordapp.com/avatars/939629038178295828/861602a3003bf4b82e3397aaf1285ed2.webp?size=80)',
                });
                var limit1 = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                    .setURL('https://eldiplayz.gitbook.io/spy-bot-docs/basic-setups/limits/channel-create-limit')
                    .setLabel('Docs')
                    .setStyle('LINK'));
                message.channel.send({
                    embeds: [channelcreatelimitEmbed],
                    components: [limit1],
                });
                break;
            case 'channeldeletelimit':
                var channeldeletelimitEmbed = new discord_js_1.MessageEmbed()
                    .setTitle('Channel Delete Limit')
                    .setDescription('**Examples:** \n `.config channeldeletelimit 5` \n \n Replace the five with the ammount of channels you want a admin to be able to delete.')
                    .setColor('#2F3136')
                    .setFooter({
                    text: 'Spy Bot',
                    iconURL: 'https://cdn.discordapp.com/avatars/939629038178295828/861602a3003bf4b82e3397aaf1285ed2.webp?size=80)',
                });
                var limit2 = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                    .setURL('https://eldiplayz.gitbook.io/spy-bot-docs/basic-setups/limits/channel-delete-limit')
                    .setLabel('Docs')
                    .setStyle('LINK'));
                message.channel.send({
                    embeds: [channeldeletelimitEmbed],
                    components: [limit2],
                });
                break;
            case 'rolecreatelimit':
                var rolecreatelimitEmbed = new discord_js_1.MessageEmbed()
                    .setTitle('Role Create Limit')
                    .setDescription('**Examples:** \n `.config rolecreatelimit 5` \n \n Replace the five with the ammount of roles you want a admin to be able to create.')
                    .setColor('#2F3136')
                    .setFooter({
                    text: 'Spy Bot',
                    iconURL: 'https://cdn.discordapp.com/avatars/939629038178295828/861602a3003bf4b82e3397aaf1285ed2.webp?size=80)',
                });
                var limit3 = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                    .setURL('https://eldiplayz.gitbook.io/spy-bot-docs/basic-setups/limits/role-create-limit')
                    .setLabel('Docs')
                    .setStyle('LINK'));
                message.channel.send({
                    embeds: [rolecreatelimitEmbed],
                    components: [limit3],
                });
                break;
            case 'roledeletelimit':
                var roledeletelimitEmbed = new discord_js_1.MessageEmbed()
                    .setTitle('Role Delete Limit')
                    .setDescription('**Examples:** \n `.config rolecreatelimit 5` \n \n Replace the five with the ammount of roles you want a admin to be able to delete.')
                    .setColor('#2F3136')
                    .setFooter({
                    text: 'Spy Bot',
                    iconURL: 'https://cdn.discordapp.com/avatars/939629038178295828/861602a3003bf4b82e3397aaf1285ed2.webp?size=80)',
                });
                var limit4 = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                    .setURL('https://eldiplayz.gitbook.io/spy-bot-docs/basic-setups/limits/role-delete-limit')
                    .setLabel('Docs')
                    .setStyle('LINK'));
                message.channel.send({
                    embeds: [roledeletelimitEmbed],
                    components: [limit4],
                });
                break;
            case 'kicklimit':
                var kicklimitEmbed = new discord_js_1.MessageEmbed()
                    .setTitle('Kick Limit')
                    .setDescription('**Examples:** \n `.config kicklimit 5` \n \n Replace the five with the ammount of members you want a admin to be able to kick.')
                    .setColor('#2F3136')
                    .setFooter({
                    text: 'Spy Bot',
                    iconURL: 'https://cdn.discordapp.com/avatars/939629038178295828/861602a3003bf4b82e3397aaf1285ed2.webp?size=80)',
                });
                var limit5 = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                    .setURL('https://eldiplayz.gitbook.io/spy-bot-docs/basic-setups/limits/kick-limit')
                    .setLabel('Docs')
                    .setStyle('LINK'));
                message.channel.send({
                    embeds: [kicklimitEmbed],
                    components: [limit5],
                });
                break;
            case 'banlimit':
                var banlimitEmbed = new discord_js_1.MessageEmbed()
                    .setTitle('Ban Limit')
                    .setDescription('**Examples:** \n `.config kicklimit 5` \n \n Replace the five with the ammount of members you want a admin to be able to ban.')
                    .setColor('#2F3136')
                    .setFooter({
                    text: 'Spy Bot',
                    iconURL: 'https://cdn.discordapp.com/avatars/939629038178295828/861602a3003bf4b82e3397aaf1285ed2.webp?size=80)',
                });
                var limit6 = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                    .setURL('https://eldiplayz.gitbook.io/spy-bot-docs/basic-setups/limits/ban-limit')
                    .setLabel('Docs')
                    .setStyle('LINK'));
                message.channel.send({ embeds: [banlimitEmbed], components: [limit6] });
                break;
            case 'logs':
                var logsEmbed = new discord_js_1.MessageEmbed()
                    .setTitle('Logs')
                    .setDescription('**Examples:** \n `.config logs #logs-channel` \n \n Replace the #logs-channel with your server logs channel.')
                    .setColor('#2F3136')
                    .setFooter({
                    text: 'Spy Bot',
                    iconURL: 'https://cdn.discordapp.com/avatars/939629038178295828/861602a3003bf4b82e3397aaf1285ed2.webp?size=80)',
                });
                var limit7 = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                    .setURL('https://eldiplayz.gitbook.io/spy-bot-docs/basic-setups/limits/ban-limit')
                    .setLabel('Docs')
                    .setStyle('LINK'));
                message.channel.send({ embeds: [logsEmbed], components: [limit7] });
                break;
        }
    },
};
