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
var database_1 = require("../database");
exports.default = {
    name: 'whitelist',
    command: new builders_1.SlashCommandBuilder()
        .setName('whitelist')
        .setDescription('Manage Whitelist of a server')
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('add')
            .setDescription('Add a user to the whitelist')
            .addUserOption(function (option) {
            return option
                .setName('user')
                .setDescription('The user to add to the whitelist');
        });
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('remove')
            .setDescription('Remove a user from the whitelist')
            .addUserOption(function (option) {
            return option
                .setName('user')
                .setDescription('The user to remove from the whitelist');
        });
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('show')
            .setDescription('List all users on the whitelist');
    }),
    run: function (_a) {
        var _b, _c, _d, _e, _f, _g, _h;
        var interaction = _a.interaction;
        return __awaiter(this, void 0, void 0, function () {
            var whitelist, user, _j, embed, whitelisted;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0: return [4, database_1.prisma.whitelist.findUnique({
                            where: { guild: interaction.guildId },
                            select: { users: true },
                        })];
                    case 1:
                        whitelist = _k.sent();
                        user = interaction.options.getUser('user');
                        _j = interaction.options.getSubcommand();
                        switch (_j) {
                            case 'add': return [3, 2];
                            case 'remove': return [3, 11];
                            case 'show': return [3, 20];
                        }
                        return [3, 22];
                    case 2:
                        if (!(interaction.user.id !== interaction.guildId)) return [3, 4];
                        return [4, interaction.reply(':x: | **Only The owner of the Server can whitelist people**')];
                    case 3:
                        _k.sent();
                        return [3, 22];
                    case 4:
                        if (!!user) return [3, 6];
                        return [4, interaction.reply(':x: | **Mention The User**')];
                    case 5:
                        _k.sent();
                        return [3, 22];
                    case 6:
                        if (!(whitelist === null || whitelist === void 0 ? void 0 : whitelist.users.some(function (id) { return id === user.id; }))) return [3, 8];
                        return [4, interaction.reply(':x: | **The User is already whitelisted**')];
                    case 7:
                        _k.sent();
                        return [3, 22];
                    case 8: return [4, database_1.prisma.whitelist.upsert({
                            where: { guild: (_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.id },
                            update: {
                                users: {
                                    push: user.id,
                                },
                            },
                            create: { guild: interaction.guildId, users: [user.id] },
                        })];
                    case 9:
                        _k.sent();
                        return [4, interaction.reply("**The user has been whitelisted!**")];
                    case 10:
                        _k.sent();
                        return [3, 22];
                    case 11:
                        if (!(interaction.user.id !== ((_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.id))) return [3, 13];
                        return [4, interaction.reply(':x: | **Only The owner of the Server can unwhitelist people**')];
                    case 12:
                        _k.sent();
                        return [3, 22];
                    case 13:
                        if (!!user) return [3, 15];
                        return [4, interaction.reply(':x: | **Mention The User**')];
                    case 14:
                        _k.sent();
                        return [3, 22];
                    case 15:
                        if (!!((_d = whitelist === null || whitelist === void 0 ? void 0 : whitelist.users) === null || _d === void 0 ? void 0 : _d.find(function (id) { return id === (user === null || user === void 0 ? void 0 : user.id); }))) return [3, 17];
                        return [4, interaction.reply(':x: | **The user is not whitelisted!**')];
                    case 16:
                        _k.sent();
                        return [3, 22];
                    case 17: return [4, database_1.prisma.whitelist.update({
                            where: { guild: interaction.guildId },
                            data: { users: whitelist.users.filter(function (id) { return id !== (user === null || user === void 0 ? void 0 : user.id); }) },
                        })];
                    case 18:
                        _k.sent();
                        return [4, interaction.reply('**The user has been unwhitelisted!**')];
                    case 19:
                        _k.sent();
                        return [3, 22];
                    case 20:
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle('**The list of whitelisted users**')
                            .setAuthor({
                            name: interaction.user.tag,
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                        })
                            .setFooter({
                            text: (_e = interaction.guild) === null || _e === void 0 ? void 0 : _e.name,
                            iconURL: (_f = interaction.guild) === null || _f === void 0 ? void 0 : _f.iconURL(),
                        })
                            .setThumbnail((_g = interaction.guild) === null || _g === void 0 ? void 0 : _g.iconURL());
                        whitelisted = (_h = whitelist === null || whitelist === void 0 ? void 0 : whitelist.users) === null || _h === void 0 ? void 0 : _h.map(function (id) { return "<@".concat(id, ">"); });
                        if (whitelisted === null || whitelisted === void 0 ? void 0 : whitelisted.length) {
                            embed.addField('**Users**', "".concat(whitelisted.join('\n')));
                            embed.setColor('GREEN');
                        }
                        else {
                            embed.setDescription(':x: | **No whitelisted Users Found**');
                            embed.setColor('#FF0000');
                        }
                        return [4, interaction.reply({ embeds: [embed] })];
                    case 21:
                        _k.sent();
                        return [3, 22];
                    case 22: return [2];
                }
            });
        });
    },
};
