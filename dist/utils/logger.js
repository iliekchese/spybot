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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLog = void 0;
var discord_js_1 = require("discord.js");
var database_1 = require("../database");
var punish_1 = __importDefault(require("./punish"));
var createLog = function (_a) {
    var type = _a.type, audits = _a.audits, reason = _a.reason, guild = _a.guild, client = _a.client;
    return __awaiter(void 0, void 0, void 0, function () {
        var log, user, personLimit, rcl, whitelist, logsID, logs, punishment, embed, punishCheck, _b, err_1;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    log = audits.entries.first();
                    user = log === null || log === void 0 ? void 0 : log.executor;
                    if ((user === null || user === void 0 ? void 0 : user.id) === ((_c = client.user) === null || _c === void 0 ? void 0 : _c.id))
                        return [2];
                    return [4, database_1.prisma.userLimit.findUnique({
                            where: { guild_user_type: { guild: guild.id, user: user === null || user === void 0 ? void 0 : user.id, type: type } },
                            select: { limit: true },
                        })];
                case 1:
                    personLimit = _d.sent();
                    return [4, database_1.prisma.limit.findUnique({
                            where: { guild_type: { guild: guild.id, type: type } },
                            select: { limit: true },
                        })];
                case 2:
                    rcl = _d.sent();
                    return [4, database_1.prisma.whitelist.findUnique({
                            where: { guild: guild.id },
                            select: { users: true },
                        })];
                case 3:
                    whitelist = _d.sent();
                    if (whitelist === null || whitelist === void 0 ? void 0 : whitelist.users.some(function (id) { return id === (user === null || user === void 0 ? void 0 : user.id); }))
                        return [2];
                    if (!(rcl === null || rcl === void 0 ? void 0 : rcl.limit))
                        return [2];
                    if (!(((personLimit === null || personLimit === void 0 ? void 0 : personLimit.limit) || 0) !== 0 && (personLimit === null || personLimit === void 0 ? void 0 : personLimit.limit) % rcl.limit === 0)) return [3, 11];
                    return [4, database_1.prisma.logsChannel.findUnique({
                            where: { guild: guild.id },
                            select: { channel: true },
                        })];
                case 4:
                    logsID = _d.sent();
                    if (!(logsID === null || logsID === void 0 ? void 0 : logsID.channel))
                        return [2];
                    logs = client.channels.cache.get(logsID.channel);
                    if (!logs)
                        return [2];
                    return [4, database_1.prisma.punish.findUnique({
                            where: { guild: guild.id },
                            select: { option: true },
                        })];
                case 5:
                    punishment = _d.sent();
                    if (!(punishment === null || punishment === void 0 ? void 0 : punishment.option))
                        return [2];
                    embed = new discord_js_1.MessageEmbed()
                        .setTitle('**Spy Bot**')
                        .setThumbnail((user === null || user === void 0 ? void 0 : user.displayAvatarURL({ dynamic: true })) || '')
                        .setFooter({
                        text: guild.name,
                        iconURL: guild.iconURL(),
                    })
                        .addField('User', user === null || user === void 0 ? void 0 : user.tag)
                        .addField('Case', reason)
                        .addField('Punishment', punishment.option)
                        .setColor('#2f3136');
                    punishCheck = punishment.option === 'quarantine' || 'demote' ? 'd' : 'ed';
                    _d.label = 6;
                case 6:
                    _d.trys.push([6, 9, 10, 11]);
                    _b = punish_1.default;
                    return [4, guild.members.fetch(user === null || user === void 0 ? void 0 : user.id)];
                case 7: return [4, _b.apply(void 0, [_d.sent(), reason, guild.id])];
                case 8:
                    _d.sent();
                    embed.addField(punishment.option.concat(punishCheck), 'Yes');
                    return [3, 11];
                case 9:
                    err_1 = _d.sent();
                    embed.addField(punishment.option.concat(punishCheck), 'No');
                    console.error(err_1);
                    return [3, 11];
                case 10:
                    logs.send({ embeds: [embed] });
                    return [7];
                case 11: return [4, database_1.prisma.userLimit.upsert({
                        where: { guild_user_type: { guild: guild.id, user: user === null || user === void 0 ? void 0 : user.id, type: type } },
                        update: { limit: ((personLimit === null || personLimit === void 0 ? void 0 : personLimit.limit) || 0) + 1 },
                        create: {
                            guild: guild.id,
                            user: user === null || user === void 0 ? void 0 : user.id,
                            type: type,
                            limit: 1,
                        },
                    })];
                case 12:
                    _d.sent();
                    return [2];
            }
        });
    });
};
exports.createLog = createLog;
