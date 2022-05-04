"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
    name: 'suggestions',
    run: function (_a) {
        var _b, _c, _d, _e;
        var client = _a.client, message = _a.message, args = _a.args, db = _a.db;
        switch (args[0]) {
            case 'set':
                var channel = message.mentions.channels.first();
                if (!channel)
                    return message.channel.send(':x: | **Mention The channel**');
                if (channel.guild.id !== ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.id))
                    return message.channel.send(':x: | **That channel is not from this server**');
                db.set("suggestions_".concat((_c = message.guild) === null || _c === void 0 ? void 0 : _c.id), "s".concat(channel.id));
                channel.send('**Suggestions Channel**');
                return message.channel.send("**The suggestions channel has been set to ".concat(args[1], "**"));
            case 'new':
                var embed = new discord_js_1.MessageEmbed()
                    .setTitle("A new suggestion was submitted by ".concat(message.author.tag))
                    .setThumbnail(message.author.avatarURL())
                    .setDescription(args.slice(1).join(' '))
                    .setColor('#2F3136');
                var suggestionsChannel = client.channels.cache.get(db.get("suggestions_".concat((_d = message.guild) === null || _d === void 0 ? void 0 : _d.id)).slice(1));
                console.log(db.get("suggestions_".concat((_e = message.guild) === null || _e === void 0 ? void 0 : _e.id)).slice(1));
                suggestionsChannel === null || suggestionsChannel === void 0 ? void 0 : suggestionsChannel.send({ embeds: [embed] }).then(function (msg) {
                    msg.react('✅');
                    msg.react('❌');
                    message.channel.send("**Suggestion submitted**");
                });
        }
    },
};
