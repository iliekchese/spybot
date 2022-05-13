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
exports.handler = void 0;
var discord_js_1 = require("discord.js");
var database_1 = require("../database");
var utils_1 = require("../utils");
var handler = function (_a) {
    var client = _a.client;
    client.on('messageCreate', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
        var member, punishment, quarantineEmbed, logs, pinglogEmbed, logsChannel;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!(msg.content.includes('@everyone') ||
                        msg.content.includes('@here') ||
                        ((_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.size) >= 7)) return [3, 4];
                    member = msg.member;
                    return [4, (0, utils_1.punish)(member, "attempting to mention ".concat(msg.content), msg.guildId)];
                case 1:
                    punishment = _d.sent();
                    if (punishment === 'whitelist')
                        return [2];
                    return [4, msg.delete()];
                case 2:
                    _d.sent();
                    quarantineEmbed = new discord_js_1.MessageEmbed()
                        .setTitle('Quarantine')
                        .setAuthor({
                        name: member === null || member === void 0 ? void 0 : member.user.tag,
                        iconURL: member === null || member === void 0 ? void 0 : member.user.avatarURL(),
                    })
                        .setDescription("".concat(member === null || member === void 0 ? void 0 : member.user, " Was succesfully ").concat(punishment, "ed. \n For attempting to mention ").concat(msg.content))
                        .setColor('#2F3136');
                    msg.channel.send({ embeds: [quarantineEmbed] });
                    return [4, database_1.prisma.logsChannel.findUnique({
                            where: { guild: (_b = msg.guild) === null || _b === void 0 ? void 0 : _b.id },
                            select: { channel: true },
                        })];
                case 3:
                    logs = _d.sent();
                    pinglogEmbed = new discord_js_1.MessageEmbed()
                        .setTitle("**Member ".concat(punishment, "ed**: ").concat(member === null || member === void 0 ? void 0 : member.user.tag))
                        .setDescription("**Reason**: Attemting to ping. \n **Message**: ".concat(msg.content))
                        .setColor('#2F3136')
                        .setThumbnail(member === null || member === void 0 ? void 0 : member.user.avatarURL());
                    logsChannel = (_c = msg.guild) === null || _c === void 0 ? void 0 : _c.channels.cache.get(logs === null || logs === void 0 ? void 0 : logs.channel);
                    logsChannel === null || logsChannel === void 0 ? void 0 : logsChannel.send({ embeds: [pinglogEmbed] });
                    _d.label = 4;
                case 4: return [2];
            }
        });
    }); });
};
exports.handler = handler;
