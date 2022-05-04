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
var builders_1 = require("@discordjs/builders");
var discord_js_1 = require("discord.js");
var handleIsNegative = function (interaction, limit) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(limit < 1)) return [3, 2];
                return [4, interaction.reply(':x: | **The limit cannot be zero or negative number**')];
            case 1:
                _a.sent();
                return [2];
            case 2: return [2];
        }
    });
}); };
exports.default = {
    command: new builders_1.SlashCommandBuilder()
        .setName('config')
        .setDescription('Displays config')
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('show')
            .setDescription('Info about the server permissions');
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('channelcreatelimit')
            .setDescription('Set the channel create limit!')
            .addNumberOption(function (limit) {
            return limit.setName('limit').setDescription('The limit').setRequired(true);
        });
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('channeldeletelimit')
            .setDescription('Set the channel delete limit!')
            .addNumberOption(function (limit) {
            return limit.setName('limit').setDescription('The limit').setRequired(true);
        });
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('rolecreatelimit')
            .setDescription('Set the role create limit!')
            .addNumberOption(function (limit) {
            return limit.setName('limit').setDescription('The limit').setRequired(true);
        });
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('roledeletelimit')
            .setDescription('Set the role delete limit!')
            .addNumberOption(function (limit) {
            return limit.setName('limit').setDescription('The limit').setRequired(true);
        });
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('banlimit')
            .setDescription('Set the ban limit!')
            .addNumberOption(function (limit) {
            return limit.setName('limit').setDescription('The limit').setRequired(true);
        });
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('kicklimit')
            .setDescription('Set the kick limit!')
            .addNumberOption(function (limit) {
            return limit.setName('limit').setDescription('The limit').setRequired(true);
        });
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('punishment')
            .setDescription('Set the punishment!')
            .addStringOption(function (pun) {
            return pun
                .setName('punishment')
                .setDescription('The punishment')
                .setRequired(true);
        });
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('logs')
            .setDescription('Configure logs channel!')
            .addChannelOption(function (channel) {
            return channel
                .setName('channel')
                .setDescription('The channel')
                .setRequired(true);
        });
    })
        .addSubcommand(function (subcommand) {
        return subcommand.setName('help').setDescription('Config Preview');
    }),
    run: function (_a) {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
        var client = _a.client, interaction = _a.interaction, db = _a.db;
        return __awaiter(this, void 0, void 0, function () {
            var _7, disabled, rcl, rdl, ccl, cdl, bl, kl, logs, punish, logsChannel, show, ccLimit, cdLimit, rcLimit, rdLimit, banLimit, kickLimit, pun, channel, helpEmbed;
            return __generator(this, function (_8) {
                switch (_8.label) {
                    case 0:
                        _7 = interaction.options.getSubcommand();
                        switch (_7) {
                            case 'show': return [3, 1];
                            case 'channelcreatelimit': return [3, 3];
                            case 'channeldeletelimit': return [3, 5];
                            case 'rolecreatelimit': return [3, 7];
                            case 'roledeletelimit': return [3, 9];
                            case 'banlimit': return [3, 11];
                            case 'kicklimit': return [3, 13];
                            case 'punishment': return [3, 15];
                            case 'logs': return [3, 19];
                            case 'help': return [3, 21];
                        }
                        return [3, 23];
                    case 1:
                        disabled = ':x: Disabled';
                        rcl = db.get("rolecreate_".concat((_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.id)) || disabled;
                        rdl = db.get("roledelete_".concat((_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.id)) || disabled;
                        ccl = db.get("channelcreate_".concat((_d = interaction.guild) === null || _d === void 0 ? void 0 : _d.id)) || disabled;
                        cdl = db.get("channeldelete_".concat((_e = interaction.guild) === null || _e === void 0 ? void 0 : _e.id)) || disabled;
                        bl = db.get("banlimit_".concat((_f = interaction.guild) === null || _f === void 0 ? void 0 : _f.id)) || disabled;
                        kl = db.get("kicklimit_".concat((_g = interaction.guild) === null || _g === void 0 ? void 0 : _g.id)) || disabled;
                        logs = ((_j = db.get("logs_".concat((_h = interaction.guild) === null || _h === void 0 ? void 0 : _h.id))) === null || _j === void 0 ? void 0 : _j.slice(1)) || disabled;
                        punish = db.get("punish_".concat((_k = interaction.guild) === null || _k === void 0 ? void 0 : _k.id)) || disabled;
                        logsChannel = ((_l = client.channels.cache.get(logs)) === null || _l === void 0 ? void 0 : _l.toString()) || disabled;
                        show = new discord_js_1.MessageEmbed()
                            .setTitle('**Anti-Raid | Config**')
                            .setAuthor({
                            name: interaction.user.tag,
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                        })
                            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                            .setFooter({
                            text: ((_m = interaction.guild) === null || _m === void 0 ? void 0 : _m.name) || '',
                            iconURL: (_p = (_o = interaction.guild) === null || _o === void 0 ? void 0 : _o.iconURL()) !== null && _p !== void 0 ? _p : '',
                        })
                            .addField('Channel Create Limit', ccl.toString())
                            .addField('Channel Delete Limit', cdl.toString())
                            .addField('Role Create Limit', rcl.toString())
                            .addField('Role Delete Limit', rdl.toString())
                            .addField('Ban Limits', bl.toString())
                            .addField('Kick Limits', kl.toString())
                            .addField('Logs', logsChannel.toString())
                            .addField('Punishment', punish.toString())
                            .setColor('GREEN');
                        return [4, interaction.reply({ embeds: [show] })];
                    case 2:
                        _8.sent();
                        return [3, 23];
                    case 3:
                        ccLimit = (_q = interaction.options.getNumber('limit')) !== null && _q !== void 0 ? _q : 1;
                        handleIsNegative(interaction, ccLimit);
                        db.set("channelcreate_".concat((_r = interaction.guild) === null || _r === void 0 ? void 0 : _r.id), ccLimit);
                        return [4, interaction.reply("**The channel Create limit has been set to ".concat(ccLimit, " **"))];
                    case 4:
                        _8.sent();
                        return [3, 23];
                    case 5:
                        cdLimit = (_s = interaction.options.getNumber('limit')) !== null && _s !== void 0 ? _s : 1;
                        handleIsNegative(interaction, cdLimit);
                        db.set("channeldelete_".concat((_t = interaction.guild) === null || _t === void 0 ? void 0 : _t.id), cdLimit);
                        return [4, interaction.reply("**The channel Delete limit has been set to ".concat(cdLimit, " **"))];
                    case 6:
                        _8.sent();
                        return [3, 23];
                    case 7:
                        rcLimit = (_u = interaction.options.getNumber('limit')) !== null && _u !== void 0 ? _u : 1;
                        handleIsNegative(interaction, rcLimit);
                        db.set("rolecreate_".concat((_v = interaction.guild) === null || _v === void 0 ? void 0 : _v.id), rcLimit);
                        return [4, interaction.reply("**The role Create limit has been set to ".concat(rcLimit, " **"))];
                    case 8:
                        _8.sent();
                        return [3, 23];
                    case 9:
                        rdLimit = (_w = interaction.options.getNumber('limit')) !== null && _w !== void 0 ? _w : 1;
                        handleIsNegative(interaction, rdLimit);
                        db.set("roledelete_".concat((_x = interaction.guild) === null || _x === void 0 ? void 0 : _x.id), rdLimit);
                        return [4, interaction.reply("**The role Delete limit has been set to ".concat(rdLimit, " **"))];
                    case 10:
                        _8.sent();
                        return [3, 23];
                    case 11:
                        banLimit = (_y = interaction.options.getNumber('limit')) !== null && _y !== void 0 ? _y : 1;
                        handleIsNegative(interaction, banLimit);
                        db.set("banlimit_".concat((_z = interaction.guild) === null || _z === void 0 ? void 0 : _z.id), banLimit);
                        return [4, interaction.reply("**The ban limit has been set to ".concat(banLimit, " **"))];
                    case 12:
                        _8.sent();
                        return [3, 23];
                    case 13:
                        kickLimit = (_0 = interaction.options.getNumber('limit')) !== null && _0 !== void 0 ? _0 : 1;
                        handleIsNegative(interaction, kickLimit);
                        db.set("kicklimit_".concat((_1 = interaction.guild) === null || _1 === void 0 ? void 0 : _1.id), kickLimit);
                        return [4, interaction.reply("**The kick limit has been set to ".concat(kickLimit, " **"))];
                    case 14:
                        _8.sent();
                        return [3, 23];
                    case 15:
                        pun = interaction.options.getString('punishment');
                        if (!!(pun === 'kick' || pun === 'ban' || pun === 'demote')) return [3, 17];
                        return [4, interaction.reply(':x: | **The punishment can only be kick, ban or demote**')];
                    case 16:
                        _8.sent();
                        return [3, 23];
                    case 17:
                        db.set("punish_".concat((_2 = interaction.guild) === null || _2 === void 0 ? void 0 : _2.id), pun.toLowerCase());
                        return [4, interaction.reply("**The punishment has been set to ".concat(pun, " **"))];
                    case 18:
                        _8.sent();
                        return [3, 23];
                    case 19:
                        channel = interaction.options.getChannel('channel');
                        db.set("logs_".concat((_3 = interaction.guild) === null || _3 === void 0 ? void 0 : _3.id), "".concat(channel === null || channel === void 0 ? void 0 : channel.id));
                        channel === null || channel === void 0 ? void 0 : channel.send('**Anti Raid logs Channel**');
                        return [4, interaction.reply("**The logs channel has been set to <#".concat(channel.id, "> **"))];
                    case 20:
                        _8.sent();
                        return [3, 23];
                    case 21:
                        helpEmbed = new discord_js_1.MessageEmbed()
                            .setTitle('<:Settings:939853181180080168> **Anti-Raid | Config**')
                            .setDescription("\n\t\t\t\t\t\t**The Options are listed below:**\n\t\t\t\t\t\tconfig channelCreateLimit\n\t\t\t\t\t\tconfig channelDeleteLimit\n\t\t\t\t\t\tconfig roleCreateLimit\n\t\t\t\t\t\tconfig roleDeleteLimit\n\t\t\t\t\t\tconfig banLimit\n\t\t\t\t\t\tconfig kickLimit\n\t\t\t\t\t\tconfig logs\n\t\t\t\t\t\tconfig show\n\t\t\t\t\t\tconfig punishment\n\t\t\t\t\t\tconfig help\n\t\t\t\t\t")
                            .setColor('#FF0000')
                            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                            .setAuthor({
                            name: interaction.user.tag,
                            iconURL: interaction.user.displayAvatarURL(),
                        })
                            .setFooter({
                            text: ((_4 = interaction.guild) === null || _4 === void 0 ? void 0 : _4.name) || '',
                            iconURL: (_6 = (_5 = interaction.guild) === null || _5 === void 0 ? void 0 : _5.iconURL()) !== null && _6 !== void 0 ? _6 : '',
                        });
                        return [4, interaction.reply({ embeds: [helpEmbed] })];
                    case 22:
                        _8.sent();
                        return [3, 23];
                    case 23: return [2];
                }
            });
        });
    },
};
