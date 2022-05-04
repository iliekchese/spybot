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
exports.default = {
    name: "warns",
    run: function (_a) {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
        var message = _a.message, db = _a.db, args = _a.args;
        return __awaiter(this, void 0, void 0, function () {
            var _0, member_1, wl, warningsLength, warnsCount, punish, _1, quarantineRole, logs, warnlogEmbed, logsChannel, warnEmbed, dmEmbed, user, warnings, index, fix, showMember, warns, warningsEmbed_1;
            var _this = this;
            return __generator(this, function (_2) {
                switch (_2.label) {
                    case 0:
                        _0 = args[0];
                        switch (_0) {
                            case 'add': return [3, 1];
                            case 'remove': return [3, 11];
                            case 'show': return [3, 12];
                            case 'limit': return [3, 14];
                        }
                        return [3, 15];
                    case 1:
                        if (!((_b = message.member) === null || _b === void 0 ? void 0 : _b.permissions.has(discord_js_1.Permissions.FLAGS.KICK_MEMBERS))) {
                            message.channel.send("You don't have permission to do this!");
                            return [3, 15];
                        }
                        member_1 = (_c = message.mentions.members) === null || _c === void 0 ? void 0 : _c.first();
                        if (!member_1) {
                            message.channel.send("You must specify a member!");
                            return [3, 15];
                        }
                        wl = db.get("warnlimit_".concat((_d = message.guild) === null || _d === void 0 ? void 0 : _d.id));
                        warningsLength = ((_f = db.get("".concat((_e = message.guild) === null || _e === void 0 ? void 0 : _e.id, "_").concat(member_1 === null || member_1 === void 0 ? void 0 : member_1.user.id, "_warns"))) === null || _f === void 0 ? void 0 : _f.length) || 0;
                        warnsCount = db.get("".concat((_g = message.guild) === null || _g === void 0 ? void 0 : _g.id, "_").concat(member_1 === null || member_1 === void 0 ? void 0 : member_1.user.id, "_warnscount")) || 0;
                        punish = db.get("punish_".concat((_h = message.guild) === null || _h === void 0 ? void 0 : _h.id));
                        if (!wl) {
                            message.channel.send("There is no warn limit set: `.warns limit <limit>`");
                            return [3, 15];
                        }
                        if (!args[2]) {
                            message.channel.send("You must specify a reason!");
                            return [3, 15];
                        }
                        db.push("".concat((_j = message.guild) === null || _j === void 0 ? void 0 : _j.id, "_").concat(member_1 === null || member_1 === void 0 ? void 0 : member_1.user.id, "_warns"), {
                            id: (0, nanoid_1.nanoid)(),
                            reason: args.slice(2).join(" ")
                        });
                        if (!(warnsCount >= wl)) return [3, 9];
                        _1 = punish;
                        switch (_1) {
                            case 'kick': return [3, 2];
                            case 'ban': return [3, 4];
                            case 'demote': return [3, 6];
                            case 'quarantine': return [3, 7];
                        }
                        return [3, 8];
                    case 2: return [4, (member_1 === null || member_1 === void 0 ? void 0 : member_1.kick(args.slice(2).join(" ")))];
                    case 3:
                        _2.sent();
                        return [3, 8];
                    case 4: return [4, (member_1 === null || member_1 === void 0 ? void 0 : member_1.ban({ reason: args.slice(2).join(" ") }))];
                    case 5:
                        _2.sent();
                        return [3, 8];
                    case 6:
                        member_1 === null || member_1 === void 0 ? void 0 : member_1.roles.cache.filter(function (r) { return r.name !== '@everyone'; }).forEach(function (r) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, (member_1 === null || member_1 === void 0 ? void 0 : member_1.roles.remove(r.id))];
                                case 1: return [2, _a.sent()];
                            }
                        }); }); });
                        return [3, 8];
                    case 7:
                        quarantineRole = member_1 === null || member_1 === void 0 ? void 0 : member_1.guild.roles.cache.find(function (role) { return role.name === "Quarantine"; });
                        member_1 === null || member_1 === void 0 ? void 0 : member_1.roles.cache.filter(function (r) { return r.name !== '@everyone'; }).forEach(function (r) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, (member_1 === null || member_1 === void 0 ? void 0 : member_1.roles.remove(r.id))];
                                case 1: return [2, _a.sent()];
                            }
                        }); }); });
                        member_1 === null || member_1 === void 0 ? void 0 : member_1.roles.add(quarantineRole);
                        return [3, 8];
                    case 8:
                        db.set("".concat((_k = message.guild) === null || _k === void 0 ? void 0 : _k.id, "_").concat(member_1 === null || member_1 === void 0 ? void 0 : member_1.user.id, "_warnscount"), 0);
                        return [3, 10];
                    case 9:
                        logs = (_m = db.get("logs_".concat((_l = message.guild) === null || _l === void 0 ? void 0 : _l.id))) === null || _m === void 0 ? void 0 : _m.slice(1);
                        warnlogEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("**Member Warned**: ".concat(member_1 === null || member_1 === void 0 ? void 0 : member_1.user.tag))
                            .setDescription("**Reason**: ".concat(args.slice(2).join(" "), " \n\n **Reporter**: ").concat(message.author))
                            .setColor('#2F3136')
                            .setThumbnail(member_1 === null || member_1 === void 0 ? void 0 : member_1.user.avatarURL());
                        logsChannel = (_o = message.guild) === null || _o === void 0 ? void 0 : _o.channels.cache.get(logs);
                        logsChannel.send({ embeds: [warnlogEmbed] });
                        warnEmbed = new discord_js_1.MessageEmbed()
                            .setDescription("".concat(member_1 === null || member_1 === void 0 ? void 0 : member_1.user, " was warned for ").concat(args.slice(2).join(" ")))
                            .setColor('#2F3136');
                        message.channel.send({ embeds: [warnEmbed] });
                        dmEmbed = new discord_js_1.MessageEmbed()
                            .setTitle('Warning')
                            .setDescription("You were warned in **".concat((_p = message.guild) === null || _p === void 0 ? void 0 : _p.name, "** \n You currently have: **").concat(warningsLength + 1, "** Warnings"))
                            .setColor('#2F3136');
                        member_1.user.send({ embeds: [dmEmbed] });
                        db.add("".concat((_q = message.guild) === null || _q === void 0 ? void 0 : _q.id, "_").concat(member_1 === null || member_1 === void 0 ? void 0 : member_1.user.id, "_warnscount"), 1);
                        _2.label = 10;
                    case 10: return [3, 15];
                    case 11:
                        if (!((_r = message.member) === null || _r === void 0 ? void 0 : _r.permissions.has(discord_js_1.Permissions.FLAGS.KICK_MEMBERS))) {
                            message.channel.send("You don't have permissions to do this!");
                            return [3, 15];
                        }
                        user = (((_s = message.mentions.members) === null || _s === void 0 ? void 0 : _s.first()) || message.member).user;
                        if (!args[2]) {
                            db.set("".concat((_t = message.guild) === null || _t === void 0 ? void 0 : _t.id, "_").concat(user.id, "_warns"), []);
                            message.channel.send("Removed warnings from ".concat(user, "!"));
                            return [3, 15];
                        }
                        warnings = db.get("".concat((_u = message.guild) === null || _u === void 0 ? void 0 : _u.id, "_").concat(user.id, "_warns"));
                        index = warnings.findIndex(function (w) { return w.id === args[2]; });
                        delete warnings[index];
                        fix = warnings.filter(function (w) { return !!w; });
                        db.set("".concat((_v = message.guild) === null || _v === void 0 ? void 0 : _v.id, "_").concat(user.id, "_warns"), fix);
                        if (index === -1) {
                            message.channel.send("Warning with id `".concat(args[2], "` doesn't exist!"));
                        }
                        else {
                            message.channel.send("Removed warning from ".concat(user, "!"));
                        }
                        return [3, 15];
                    case 12:
                        showMember = ((_w = message.mentions.members) === null || _w === void 0 ? void 0 : _w.first()) || message.member;
                        return [4, db.get("".concat((_x = message.guild) === null || _x === void 0 ? void 0 : _x.id, "_").concat(showMember === null || showMember === void 0 ? void 0 : showMember.user.id, "_warns"))];
                    case 13:
                        warns = _2.sent();
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
                        return [3, 15];
                    case 14:
                        if (!((_y = message.member) === null || _y === void 0 ? void 0 : _y.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                            message.channel.send("You don't have permission to do this!");
                            return [3, 15];
                        }
                        if (!args[1]) {
                            message.channel.send(':x: | **Provide The limit**');
                            return [2];
                        }
                        try {
                            if (Number(args[1]) < 1) {
                                message.channel.send(':x: | **The limit cannot be zero or negative number**');
                                return [2];
                            }
                        }
                        catch (_) {
                            message.channel.send(':x: | **The limit has to be a number**');
                            return [2];
                        }
                        db.set("warnlimit_".concat((_z = message.guild) === null || _z === void 0 ? void 0 : _z.id), Number(args[1]));
                        message.channel.send("**The warn limit has been set to ".concat(args[1], "**"));
                        return [3, 15];
                    case 15: return [2];
                }
            });
        });
    }
};
