"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
    name: 'whitelist',
    run: function (_a) {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        var message = _a.message, args = _a.args, db = _a.db;
        var whitelist = db.get("whitelist_".concat((_b = message.guild) === null || _b === void 0 ? void 0 : _b.id));
        console.log(whitelist);
        var user = message.mentions.users.first();
        switch (args[0]) {
            case 'add':
                if (!((_c = message.member) === null || _c === void 0 ? void 0 : _c.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                    message.channel.send("You don't have permission to do this!");
                    break;
                }
                if (!user) {
                    message.channel.send(':x: | **Mention The User**');
                    break;
                }
                if (whitelist === null || whitelist === void 0 ? void 0 : whitelist.some(function (id) { return id === user.id; })) {
                    message.channel.send(':x: | **The User is already whitelisted**');
                    break;
                }
                db.push("whitelist_".concat((_d = message.guild) === null || _d === void 0 ? void 0 : _d.id), user.id);
                message.channel.send("**The user has been whitelisted!**");
                break;
            case 'remove':
                if (!((_e = message.member) === null || _e === void 0 ? void 0 : _e.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                    message.channel.send("You don't have permission to do this!");
                    break;
                }
                if (!user) {
                    db.set("whitelist_".concat((_f = message.guild) === null || _f === void 0 ? void 0 : _f.id), []);
                    message.channel.send('**Whitelist has been resetted!**');
                    break;
                }
                ;
                if (!(whitelist === null || whitelist === void 0 ? void 0 : whitelist.some(function (id) { return id === (user === null || user === void 0 ? void 0 : user.id); }))) {
                    message.channel.send(':x: | **The user is not whitelisted!**');
                    break;
                }
                var index = whitelist.indexOf(user.id);
                delete whitelist[index];
                db.set("whitelist_".concat((_g = message.guild) === null || _g === void 0 ? void 0 : _g.id), whitelist.filter(function (x) { return !!x; }));
                message.channel.send('**The user has been unwhitelisted!**');
                break;
            case 'show':
                var embed = new discord_js_1.MessageEmbed()
                    .setTitle('**The list of whitelisted users**')
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setFooter({ text: (_h = message.guild) === null || _h === void 0 ? void 0 : _h.name, iconURL: (_j = message.guild) === null || _j === void 0 ? void 0 : _j.iconURL() })
                    .setThumbnail((_l = (_k = message.guild) === null || _k === void 0 ? void 0 : _k.iconURL()) !== null && _l !== void 0 ? _l : '');
                var whitelisted = whitelist === null || whitelist === void 0 ? void 0 : whitelist.map(function (id) { return "<@".concat(id, ">"); });
                if (whitelisted === null || whitelisted === void 0 ? void 0 : whitelisted.length) {
                    embed.addField('**Users**', "".concat(whitelisted.join('\n')));
                    embed.setColor('GREEN');
                }
                else {
                    embed.setDescription(':x: | **No whitelisted Users Found**');
                    embed.setColor('RED');
                }
                message.channel.send({ embeds: [embed] });
        }
    },
};
