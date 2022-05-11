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
var database_1 = require("../database");
exports.default = {
    name: 'whitelist',
    run: function (_a) {
        var _b, _c, _d, _e, _f;
        var message = _a.message, args = _a.args;
        return __awaiter(this, void 0, void 0, function () {
            var whitelist, user, _g, embed, whitelisted;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4, database_1.prisma.whitelist.findUnique({
                            where: { guild: message.guildId },
                            select: { users: true },
                        })];
                    case 1:
                        whitelist = _h.sent();
                        user = message.mentions.users.first();
                        _g = args[0];
                        switch (_g) {
                            case 'add': return [3, 2];
                            case 'remove': return [3, 4];
                            case 'show': return [3, 6];
                        }
                        return [3, 7];
                    case 2:
                        if (!((_b = message.member) === null || _b === void 0 ? void 0 : _b.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                            message.channel.send("You don't have permission to do this!");
                            return [3, 7];
                        }
                        if (!user) {
                            message.channel.send(':x: | **Mention The User**');
                            return [3, 7];
                        }
                        if (whitelist === null || whitelist === void 0 ? void 0 : whitelist.users.some(function (id) { return id === user.id; })) {
                            message.channel.send(':x: | **The User is already whitelisted**');
                            return [3, 7];
                        }
                        return [4, database_1.prisma.whitelist.upsert({
                                where: { guild: message.guildId },
                                update: { users: { push: user.id } },
                                create: { guild: message.guildId, users: [user.id] },
                            })];
                    case 3:
                        _h.sent();
                        message.channel.send("**The user has been whitelisted!**");
                        return [3, 7];
                    case 4:
                        if (!((_c = message.member) === null || _c === void 0 ? void 0 : _c.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                            message.channel.send("You don't have permission to do this!");
                            return [3, 7];
                        }
                        if (!user) {
                            message.channel.send(':x: | **Mention The User**');
                            return [3, 7];
                        }
                        if (!(whitelist === null || whitelist === void 0 ? void 0 : whitelist.users.some(function (id) { return id === (user === null || user === void 0 ? void 0 : user.id); }))) {
                            message.channel.send(':x: | **The user is not whitelisted!**');
                            return [3, 7];
                        }
                        return [4, database_1.prisma.whitelist.update({
                                where: { guild: message.guildId },
                                data: { users: whitelist.users.filter(function (id) { return id !== (user === null || user === void 0 ? void 0 : user.id); }) },
                            })];
                    case 5:
                        _h.sent();
                        message.channel.send('**The user has been unwhitelisted!**');
                        return [3, 7];
                    case 6:
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle('**The list of whitelisted users**')
                            .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL({ dynamic: true }),
                        })
                            .setFooter({
                            text: (_d = message.guild) === null || _d === void 0 ? void 0 : _d.name,
                            iconURL: (_e = message.guild) === null || _e === void 0 ? void 0 : _e.iconURL(),
                        })
                            .setThumbnail((_f = message.guild) === null || _f === void 0 ? void 0 : _f.iconURL());
                        whitelisted = whitelist === null || whitelist === void 0 ? void 0 : whitelist.users.map(function (id) { return "<@".concat(id, ">"); });
                        if (whitelisted === null || whitelisted === void 0 ? void 0 : whitelisted.length) {
                            embed.addField('**Users**', "".concat(whitelisted.join('\n')));
                            embed.setColor('GREEN');
                        }
                        else {
                            embed.setDescription(':x: | **No whitelisted Users Found**');
                            embed.setColor('#FF0000');
                        }
                        message.channel.send({ embeds: [embed] });
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    },
};
