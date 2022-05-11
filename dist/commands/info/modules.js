"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
    name: 'modules',
    run: function (_a) {
        var message = _a.message;
        var modulesEmbed = new discord_js_1.MessageEmbed()
            .setTitle('<:spybot:939656950231236618> Modules')
            .setDescription('Test')
            .setColor('#2F3136')
            .setFooter({
            text: 'Spy Bot',
            iconURL: 'https://cdn.discordapp.com/avatars/939629038178295828/861602a3003bf4b82e3397aaf1285ed2.webp?size=80)',
        });
        message.channel.send({ embeds: [modulesEmbed] });
    },
};
