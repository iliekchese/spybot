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
var nanoid_1 = require("nanoid");
var database_1 = require("../../database");
exports.default = {
    name: 'warns',
    run: function (_a) {
        var _b, _c, _d, _e, _f, _g, _h;
        var message = _a.message, args = _a.args;
        return __awaiter(this, void 0, void 0, function () {
            var _j, member_1, wl, punish, reason, warns, _k, quarantineRole, logs, warnlogEmbed, logsChannel, warnEmbed, dmEmbed, user, showMember, warningsEmbed_1;
            var _this = this;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _j = args[0];
                        switch (_j) {
                            case 'add': return [3, 1];
                            case 'remove': return [3, 14];
                            case 'show': return [3, 18];
                        }
                        return [3, 19];
                    case 1:
                        if (!((_b = message.member) === null || _b === void 0 ? void 0 : _b.permissions.has(discord_js_1.Permissions.FLAGS.KICK_MEMBERS))) {
                            message.channel.send("You don't have permission to do this!");
                            return [3, 19];
                        }
                        member_1 = (_c = message.mentions.members) === null || _c === void 0 ? void 0 : _c.first();
                        if (!member_1) {
                            message.channel.send('You must specify a member!');
                            return [3, 19];
                        }
                        return [4, database_1.prisma.limit.findUnique({
                                where: { guild: message.guildId, type: 'warn' },
                                select: { limit: true },
                            })];
                    case 2:
                        wl = _l.sent();
                        return [4, database_1.prisma.punish.findUnique({
                                where: { guild: message.guildId },
                                select: { option: true },
                            })];
                    case 3:
                        punish = _l.sent();
                        if (!(wl === null || wl === void 0 ? void 0 : wl.limit)) {
                            message.channel.send('There is no warn limit set: `.limits warn <limit>`');
                            return [3, 19];
                        }
                        if (!args[2]) {
                            message.channel.send('You must specify a reason!');
                            return [3, 19];
                        }
                        reason = args.slice(2).join(' ');
                        return [4, database_1.prisma.warns.create({
                                data: {
                                    guild: message.guildId,
                                    user: member_1.user.id,
                                    warns: { id: (0, nanoid_1.nanoid)(), reason: reason },
                                },
                                select: { warns: true },
                            })];
                    case 4:
                        warns = (_l.sent()).warns;
                        if (!(warns.length % wl.limit === 0)) return [3, 12];
                        _k = punish === null || punish === void 0 ? void 0 : punish.option;
                        switch (_k) {
                            case 'kick': return [3, 5];
                            case 'ban': return [3, 7];
                            case 'demote': return [3, 9];
                            case 'quarantine': return [3, 10];
                        }
                        return [3, 11];
                    case 5: return [4, (member_1 === null || member_1 === void 0 ? void 0 : member_1.kick(reason))];
                    case 6:
                        _l.sent();
                        return [3, 11];
                    case 7: return [4, (member_1 === null || member_1 === void 0 ? void 0 : member_1.ban({ reason: reason }))];
                    case 8:
                        _l.sent();
                        return [3, 11];
                    case 9:
                        member_1 === null || member_1 === void 0 ? void 0 : member_1.roles.cache.filter(function (r) { return r.name !== '@everyone'; }).forEach(function (r) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, (member_1 === null || member_1 === void 0 ? void 0 : member_1.roles.remove(r.id))];
                                case 1: return [2, _a.sent()];
                            }
                        }); }); });
                        return [3, 11];
                    case 10:
                        quarantineRole = member_1 === null || member_1 === void 0 ? void 0 : member_1.guild.roles.cache.find(function (role) { return role.name === 'Quarantine'; });
                        member_1 === null || member_1 === void 0 ? void 0 : member_1.roles.cache.filter(function (r) { return r.name !== '@everyone'; }).forEach(function (r) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, (member_1 === null || member_1 === void 0 ? void 0 : member_1.roles.remove(r.id))];
                                case 1: return [2, _a.sent()];
                            }
                        }); }); });
                        member_1 === null || member_1 === void 0 ? void 0 : member_1.roles.add(quarantineRole);
                        return [3, 11];
                    case 11: return [3, 19];
                    case 12: return [4, database_1.prisma.logsChannel.findUnique({
                            where: { guild: message.guildId },
                            select: { id: true },
                        })];
                    case 13:
                        logs = _l.sent();
                        warnlogEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("**Member Warned**: ".concat(member_1 === null || member_1 === void 0 ? void 0 : member_1.user.tag))
                            .setDescription("**Reason**: ".concat(args.slice(2).join(' '), " \n\n **Reporter**: ").concat(message.author))
                            .setColor('#2F3136')
                            .setThumbnail(member_1 === null || member_1 === void 0 ? void 0 : member_1.user.avatarURL());
                        logsChannel = (_d = message.guild) === null || _d === void 0 ? void 0 : _d.channels.cache.get(logs === null || logs === void 0 ? void 0 : logs.id);
                        logsChannel.send({ embeds: [warnlogEmbed] });
                        warnEmbed = new discord_js_1.MessageEmbed()
                            .setDescription("".concat(member_1 === null || member_1 === void 0 ? void 0 : member_1.user, " was warned for ").concat(reason))
                            .setColor('#2F3136');
                        message.channel.send({ embeds: [warnEmbed] });
                        dmEmbed = new discord_js_1.MessageEmbed()
                            .setTitle('Warning')
                            .setDescription("You were warned in **".concat((_e = message.guild) === null || _e === void 0 ? void 0 : _e.name, "** \n You currently have: **").concat(warns.length, "** Warnings"))
                            .setColor('#2F3136');
                        member_1.user.send({ embeds: [dmEmbed] });
                        return [3, 19];
                    case 14:
                        if (!((_f = message.member) === null || _f === void 0 ? void 0 : _f.permissions.has(discord_js_1.Permissions.FLAGS.KICK_MEMBERS))) {
                            message.channel.send("You don't have permissions to do this!");
                            return [3, 19];
                        }
                        user = (((_g = message.mentions.members) === null || _g === void 0 ? void 0 : _g.first()) || message.member).user;
                        if (!!args[2]) return [3, 16];
                        return [4, database_1.prisma.warns.upsert({
                                where: { guild: message.guildId, user: user.id },
                                update: { warns: [] },
                                create: { guild: message.guildId, user: user.id, warns: [] },
                            })];
                    case 15:
                        _l.sent();
                        message.channel.send("Removed warnings from ".concat(user, "!"));
                        return [3, 19];
                    case 16:
                        if (warns.findIndex(function (w) { return w.id === args[2]; }) === -1) {
                            message.channel.send("Warning with id `".concat(args[2], "` doesn't exist!"));
                            return [3, 19];
                        }
                        return [4, database_1.prisma.warns.upsert({
                                where: { guild: message.guildId, user: user.id },
                                update: { warns: warns.filter(function (w) { return w.id !== args[2]; }) },
                                create: { guild: message.guildId, user: user.id, warns: [] },
                            })];
                    case 17:
                        _l.sent();
                        message.channel.send("Removed warning from ".concat(user, " with id `").concat(args[2], "`!"));
                        return [3, 19];
                    case 18:
                        showMember = ((_h = message.mentions.members) === null || _h === void 0 ? void 0 : _h.first()) || message.member;
                        warningsEmbed_1 = new discord_js_1.MessageEmbed()
                            .setTitle("Warnings for ".concat(showMember === null || showMember === void 0 ? void 0 : showMember.user.tag))
                            .setDescription("**Warnings - 0**")
                            .setThumbnail(showMember === null || showMember === void 0 ? void 0 : showMember.user.avatarURL())
                            .setColor('#2F3136');
                        if (warns) {
                            warningsEmbed_1.setDescription("**Warnings - ".concat(warns === null || warns === void 0 ? void 0 : warns.length, "**"));
                            warns.forEach(function (w) {
                                warningsEmbed_1.addField(w.id, w.reason);
                            });
                        }
                        message.channel.send({ embeds: [warningsEmbed_1] });
                        return [3, 19];
                    case 19: return [2];
                }
            });
        });
    },
};
