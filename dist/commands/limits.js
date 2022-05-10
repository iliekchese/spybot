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
var database_1 = require("../database");
var discord_js_1 = require("discord.js");
exports.default = {
    name: 'limits',
    run: function (_a) {
        var _b, _c, _d;
        var message = _a.message, args = _a.args;
        return __awaiter(this, void 0, void 0, function () {
            var limits, limitsEmbed_1, type, limit, isLimit;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!(args[0] === 'show')) return [3, 2];
                        return [4, database_1.prisma.limit.findMany()];
                    case 1:
                        limits = _e.sent();
                        limitsEmbed_1 = new discord_js_1.MessageEmbed()
                            .setTitle('**Spy Bot | Limits**')
                            .setDescription("If a limit is not here it means that it's not set")
                            .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL({ dynamic: true }),
                        })
                            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                            .setFooter({
                            text: (_b = message.guild) === null || _b === void 0 ? void 0 : _b.name,
                            iconURL: (_c = message.guild) === null || _c === void 0 ? void 0 : _c.iconURL(),
                        })
                            .setColor('GREEN');
                        limits.forEach(function (_a) {
                            var type = _a.type, limit = _a.limit;
                            limitsEmbed_1.addField(type, limit.toString(), true);
                        });
                        message.channel.send({ embeds: [limitsEmbed_1] });
                        return [2];
                    case 2:
                        type = args[0], limit = args[1];
                        if (!((_d = message.member) === null || _d === void 0 ? void 0 : _d.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                            message.channel.send("You don't have permission to do this!");
                            return [2];
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
                        isLimit = type === 'channelcreate' ||
                            type === 'channeldelete' ||
                            type === 'rolecreate' ||
                            type === 'roledelete' ||
                            type === 'kick' ||
                            type === 'ban' ||
                            type === 'warn';
                        if (!isLimit) {
                            message.channel.send("\n\t\t\t\tNot a valid limit, valid limits are:\n\n\t\t\t\t**channelcreate, channeldelete,\n\t\t\t\trolecreate, roledelete, \n\t\t\t\tkick, ban,\n\t\t\t\twarn**\n\t\t\t");
                            return [2];
                        }
                        return [4, database_1.prisma.limit.upsert({
                                where: { guild_type: { guild: message.guildId, type: type } },
                                update: { limit: Number(limit) },
                                create: {
                                    guild: message.guildId,
                                    type: type,
                                    limit: Number(limit),
                                },
                            })];
                    case 3:
                        _e.sent();
                        message.channel.send("**".concat(type, "** has been updated to ").concat(limit, "!"));
                        return [2];
                }
            });
        });
    },
};
