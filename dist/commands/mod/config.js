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
var limitTypeCheck = function (message, args) {
    if (!args[1]) {
        message.channel.send(':x: | **Provide The limit**');
        return;
    }
    try {
        if (Number(args[1]) < 1) {
            message.channel.send(':x: | **The limit cannot be zero or negative number**');
            return;
        }
    }
    catch (_) {
        message.channel.send(':x: | **The limit has to be a number**');
        return;
    }
};
exports.default = {
    name: 'config',
    run: function (_a) {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17;
        var message = _a.message, args = _a.args, db = _a.db;
        return __awaiter(this, void 0, void 0, function () {
            var bruh, disabled, rcl, rdl, ccl, cdl, bl, kl, logs_1, punish, show, channel_1, logs, channel;
            return __generator(this, function (_18) {
                switch (_18.label) {
                    case 0:
                        bruh = new discord_js_1.MessageEmbed()
                            .setTitle('<:Settings:939853181180080168> **Anti-Raid | Config**')
                            .setDescription("\n\t\t\t\t\t**The Options are listed below:**\n\t\t\t\t\tconfig channelCreateLimit\n\t\t\t\t\tconfig channelDeleteLimit\n\t\t\t\t\tconfig roleCreateLimit\n\t\t\t\t\tconfig roleDeleteLimit\n\t\t\t\t\tconfig banLimit\n\t\t\t\t\tconfig kickLimit\n\t\t\t\t\tconfig logs\n\t\t\t\t\tconfig show\n\t\t\t\t\tconfig punishment\n\t\t\t\t\tconfig help\n\t\t\t\t")
                            .setColor('#FF0000')
                            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                            .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL(),
                        })
                            .setFooter({
                            text: ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.name) || ':x:',
                            iconURL: (_c = message.guild) === null || _c === void 0 ? void 0 : _c.iconURL(),
                        });
                        switch ((_d = args[0]) === null || _d === void 0 ? void 0 : _d.toLowerCase()) {
                            case 'show':
                                disabled = ':x: Disabled';
                                rcl = (_f = db.get("rolecreate_".concat((_e = message.guild) === null || _e === void 0 ? void 0 : _e.id))) === null || _f === void 0 ? void 0 : _f.toString();
                                rdl = (_h = db.get("roledelete_".concat((_g = message.guild) === null || _g === void 0 ? void 0 : _g.id))) === null || _h === void 0 ? void 0 : _h.toString();
                                ccl = (_k = db.get("channelcreate_".concat((_j = message.guild) === null || _j === void 0 ? void 0 : _j.id))) === null || _k === void 0 ? void 0 : _k.toString();
                                cdl = (_m = db.get("channeldelete_".concat((_l = message.guild) === null || _l === void 0 ? void 0 : _l.id))) === null || _m === void 0 ? void 0 : _m.toString();
                                bl = (_p = db.get("banlimit_".concat((_o = message.guild) === null || _o === void 0 ? void 0 : _o.id))) === null || _p === void 0 ? void 0 : _p.toString();
                                kl = (_r = db.get("kicklimit_".concat((_q = message.guild) === null || _q === void 0 ? void 0 : _q.id))) === null || _r === void 0 ? void 0 : _r.toString();
                                logs_1 = (_t = db.get("logs_".concat((_s = message.guild) === null || _s === void 0 ? void 0 : _s.id))) === null || _t === void 0 ? void 0 : _t.slice(1);
                                punish = db.get("punish_".concat((_u = message.guild) === null || _u === void 0 ? void 0 : _u.id));
                                show = new discord_js_1.MessageEmbed()
                                    .setTitle('**Anti-Raid | Config**')
                                    .setAuthor({
                                    name: message.author.tag,
                                    iconURL: message.author.displayAvatarURL({ dynamic: true }),
                                })
                                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                                    .setFooter({
                                    text: ((_v = message.guild) === null || _v === void 0 ? void 0 : _v.name) || '',
                                    iconURL: (_x = (_w = message.guild) === null || _w === void 0 ? void 0 : _w.iconURL()) !== null && _x !== void 0 ? _x : '',
                                })
                                    .addField('Channel Create Limit', ccl !== null && ccl !== void 0 ? ccl : disabled)
                                    .addField('Channel Delete Limit', cdl !== null && cdl !== void 0 ? cdl : disabled)
                                    .addField('Role Create Limit', rcl !== null && rcl !== void 0 ? rcl : disabled)
                                    .addField('Role Delete Limit', rdl !== null && rdl !== void 0 ? rdl : disabled)
                                    .addField('Ban Limits', bl !== null && bl !== void 0 ? bl : disabled)
                                    .addField('Kick Limits', kl !== null && kl !== void 0 ? kl : disabled)
                                    .addField('Logs', logs_1 ? "<#".concat(logs_1, ">") : disabled)
                                    .addField('Punishment', punish !== null && punish !== void 0 ? punish : disabled)
                                    .setColor('GREEN');
                                message.channel.send({ embeds: [show] });
                                break;
                            case 'channelcreatelimit':
                                if (!((_y = message.member) === null || _y === void 0 ? void 0 : _y.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                                    message.channel.send("You don't have permission to do this!");
                                    break;
                                }
                                limitTypeCheck(message, args);
                                db.set("channelcreate_".concat((_z = message.guild) === null || _z === void 0 ? void 0 : _z.id), Number(args[1]));
                                message.channel.send('**The channel Create limit has been set to ' + Number(args[1]) + '**');
                                break;
                            case 'channeldeletelimit':
                                if (!((_0 = message.member) === null || _0 === void 0 ? void 0 : _0.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                                    message.channel.send("You don't have permission to do this!");
                                    break;
                                }
                                limitTypeCheck(message, args);
                                db.set("channeldelete_".concat((_1 = message.guild) === null || _1 === void 0 ? void 0 : _1.id), Number(args[1]));
                                message.channel.send('**The channel Delete limit has been set to ' + Number(args[1]) + '**');
                                break;
                            case 'rolecreatelimit':
                                if (!((_2 = message.member) === null || _2 === void 0 ? void 0 : _2.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                                    message.channel.send("You don't have permission to do this!");
                                    break;
                                }
                                limitTypeCheck(message, args);
                                db.set("rolecreate_".concat((_3 = message.guild) === null || _3 === void 0 ? void 0 : _3.id), Number(args[1]));
                                message.channel.send('**The role Create limit has been set to ' + args[1] + '**');
                                break;
                            case 'roledeletelimit':
                                if (!((_4 = message.member) === null || _4 === void 0 ? void 0 : _4.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                                    message.channel.send("You don't have permission to do this!");
                                    break;
                                }
                                limitTypeCheck(message, args);
                                db.set("roledelete_".concat((_5 = message.guild) === null || _5 === void 0 ? void 0 : _5.id), Number(args[1]));
                                message.channel.send('**The role Delete limit has been set to ' + args[1] + '**');
                                break;
                            case 'banlimit':
                                if (!((_6 = message.member) === null || _6 === void 0 ? void 0 : _6.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                                    message.channel.send("You don't have permission to do this!");
                                    break;
                                }
                                limitTypeCheck(message, args);
                                db.set("banlimit_".concat((_7 = message.guild) === null || _7 === void 0 ? void 0 : _7.id), Number(args[1]));
                                message.channel.send('**The ban limit has been set to ' + Number(args[1]) + '**');
                                break;
                            case 'kicklimit':
                                if (!((_8 = message.member) === null || _8 === void 0 ? void 0 : _8.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                                    message.channel.send("You don't have permission to do this!");
                                    break;
                                }
                                limitTypeCheck(message, args);
                                db.set("kicklimit_".concat((_9 = message.guild) === null || _9 === void 0 ? void 0 : _9.id), Number(args[1]));
                                message.channel.send('**The kick limit has been set to ' + Number(args[1]) + '**');
                                break;
                            case 'punishment':
                                if (!((_10 = message.member) === null || _10 === void 0 ? void 0 : _10.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                                    message.channel.send("You don't have permission to do this!");
                                    break;
                                }
                                if (!args[1]) {
                                    message.channel.send(':x: | **Provide The punishment**');
                                    break;
                                }
                                if (!(args[1] === 'ban' || args[1] === 'kick' || args[1] === 'demote' || args[1] === 'quarantine')) {
                                    message.channel.send(':x: | **The punishment can only be kick, ban, quarantine or demote**');
                                    break;
                                }
                                db.set("punish_".concat((_11 = message.guild) === null || _11 === void 0 ? void 0 : _11.id), args[1].toLowerCase());
                                message.channel.send('**The punishment has been set to ' + args[1] + '**');
                                break;
                            case 'logs':
                                if (!((_12 = message.member) === null || _12 === void 0 ? void 0 : _12.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                                    message.channel.send("You don't have permission to do this!");
                                    break;
                                }
                                channel_1 = message.mentions.channels.first();
                                if (!channel_1) {
                                    message.channel.send(':x: | **Mention The channel**');
                                    break;
                                }
                                else if (channel_1.guild.id !== ((_13 = message.guild) === null || _13 === void 0 ? void 0 : _13.id)) {
                                    message.channel.send(':x: | **That channel is not from this server**');
                                    break;
                                }
                                db.set("logs_".concat((_14 = message.guild) === null || _14 === void 0 ? void 0 : _14.id), "i".concat(channel_1.id));
                                channel_1.send('**Anti Raid logs Channel**');
                                message.channel.send('**The logs channel has been set to ' + args[1] + '**');
                                break;
                            case 'help':
                                message.channel.send({ embeds: [bruh] });
                                break;
                            default:
                                message.channel.send(':x: | **Enter a valid subcommand, EXAMPLE: .config help**');
                        }
                        logs = (_16 = db.get("logs_".concat((_15 = message.guild) === null || _15 === void 0 ? void 0 : _15.id))) === null || _16 === void 0 ? void 0 : _16.slice(1);
                        return [4, ((_17 = message.guild) === null || _17 === void 0 ? void 0 : _17.channels.fetch(logs))];
                    case 1:
                        channel = _18.sent();
                        if (!channel) {
                            message.reply("\nThe logs channel isn't set, consider to set with `.config logs <logs_channel>`!");
                        }
                        return [2];
                }
            });
        });
    },
};
