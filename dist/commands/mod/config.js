"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var database_1 = require("../../database");
exports.default = {
    name: 'config',
    run: function (_a) {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        var message = _a.message, args = _a.args;
        return __awaiter(this, void 0, void 0, function () {
            var logs, _m, disabled, punish, show, channel_1, helpEmbed, channel;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0: return [4, database_1.prisma.logsChannel.findUnique({
                            where: { guild: message.guildId },
                            select: { id: true }
                        })];
                    case 1:
                        logs = _o.sent();
                        _m = (_b = args[0]) === null || _b === void 0 ? void 0 : _b.toLowerCase();
                        switch (_m) {
                            case 'show': return [3, 2];
                            case 'punishment': return [3, 4];
                            case 'logs': return [3, 6];
                        }
                        return [3, 8];
                    case 2:
                        disabled = ':x: Disabled';
                        return [4, database_1.prisma.punish.findUnique({
                                where: { guild: message.guildId },
                                select: { option: true }
                            })];
                    case 3:
                        punish = _o.sent();
                        show = new discord_js_1.MessageEmbed()
                            .setTitle('**Anti-Raid | Config**')
                            .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL({ dynamic: true }),
                        })
                            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                            .setFooter({
                            text: (_c = message.guild) === null || _c === void 0 ? void 0 : _c.name,
                            iconURL: (_d = message.guild) === null || _d === void 0 ? void 0 : _d.iconURL(),
                        })
                            .addField('Logs', (logs === null || logs === void 0 ? void 0 : logs.id) ? "<#".concat(logs.id, ">") : disabled)
                            .addField('Punishment', (_e = punish === null || punish === void 0 ? void 0 : punish.option) !== null && _e !== void 0 ? _e : disabled)
                            .setColor('GREEN');
                        message.channel.send({ embeds: [show] });
                        return [3, 9];
                    case 4:
                        if (!((_f = message.member) === null || _f === void 0 ? void 0 : _f.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                            message.channel.send("You don't have permission to do this!");
                            return [3, 9];
                        }
                        if (!args[1]) {
                            message.channel.send(':x: | **Provide The punishment**');
                            return [3, 9];
                        }
                        if (!(args[1] === 'ban' || args[1] === 'kick' || args[1] === 'demote' || args[1] === 'quarantine')) {
                            message.channel.send(':x: | **The punishment can only be kick, ban, quarantine or demote**');
                            return [3, 9];
                        }
                        return [4, database_1.prisma.punish.upsert({
                                where: { guild: message.guildId },
                                update: { option: args[1] },
                                create: {
                                    guild: message.guildId,
                                    option: args[1]
                                }
                            })];
                    case 5:
                        _o.sent();
                        message.channel.send('**The punishment has been set to ' + args[1] + '**');
                        return [3, 9];
                    case 6:
                        if (!((_g = message.member) === null || _g === void 0 ? void 0 : _g.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                            message.channel.send("You don't have permission to do this!");
                            return [3, 9];
                        }
                        channel_1 = message.mentions.channels.first();
                        if (!channel_1) {
                            message.channel.send(':x: | **Mention The channel**');
                            return [3, 9];
                        }
                        if (channel_1.guild.id !== ((_h = message.guild) === null || _h === void 0 ? void 0 : _h.id)) {
                            message.channel.send(':x: | **That channel is not from this server**');
                            return [3, 9];
                        }
                        return [4, database_1.prisma.logsChannel.upsert({
                                where: { guild: message.guildId },
                                update: { id: channel_1.id },
                                create: {
                                    guild: message.guildId,
                                    id: channel_1.id
                                }
                            })];
                    case 7:
                        _o.sent();
                        channel_1.send('**Anti Raid logs Channel**');
                        message.channel.send('**The logs channel has been set to ' + args[1] + '**');
                        return [3, 9];
                    case 8:
                        helpEmbed = new discord_js_1.MessageEmbed()
                            .setTitle('<:Settings:939853181180080168> **Anti-Raid | Config**')
                            .setDescription("\n\t\t\t\t\t\t\t**The Options are listed below:**\n\t\t\t\t\t\t\tconfig show\n\t\t\t\t\t\t\tconfig logs\n\t\t\t\t\t\t\tconfig punishment\n\t\t\t\t\t\t")
                            .setColor('#FF0000')
                            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                            .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL(),
                        })
                            .setFooter({
                            text: (_j = message.guild) === null || _j === void 0 ? void 0 : _j.name,
                            iconURL: (_k = message.guild) === null || _k === void 0 ? void 0 : _k.iconURL(),
                        });
                        message.channel.send({ embeds: [helpEmbed] });
                        return [3, 9];
                    case 9: return [4, ((_l = message.guild) === null || _l === void 0 ? void 0 : _l.channels.fetch(logs === null || logs === void 0 ? void 0 : logs.id))];
                    case 10:
                        channel = _o.sent();
                        if (!channel) {
                            message.reply("\nThe logs channel isn't set, consider to set with `.config logs <logs_channel>`!");
                        }
                        return [2];
                }
            });
        });
    },
};
