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
    command: new builders_1.SlashCommandBuilder()
        .setName('config')
        .setDescription('Displays config')
        .addSubcommand(function (subcommand) {
        return subcommand.setName('show').setDescription('Info about the server permissions');
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('punishment')
            .setDescription('Set the punishment!')
            .addStringOption(function (pun) {
            return pun
                .setName('punishment')
                .setDescription('The punishment')
                .addChoices({ name: 'ban', value: 'ban' }, { name: 'kick', value: 'kick' }, { name: 'demote', value: 'demote' }, { name: 'quarantine', value: 'quarantine' })
                .setRequired(true);
        });
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('logs')
            .setDescription('Configure logs channel!')
            .addChannelOption(function (channel) {
            return channel.setName('channel').setDescription('The channel').setRequired(true);
        });
    })
        .addSubcommand(function (subcommand) { return subcommand.setName('help').setDescription('Config Preview'); }),
    run: function (_a) {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var interaction = _a.interaction;
        return __awaiter(this, void 0, void 0, function () {
            var logs, _l, disabled, punish, show, punishment, channel, helpEmbed;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0: return [4, database_1.prisma.logsChannel.findUnique({
                            where: { guild: interaction.guildId },
                            select: { channel: true },
                        })];
                    case 1:
                        logs = _m.sent();
                        _l = interaction.options.getSubcommand();
                        switch (_l) {
                            case 'show': return [3, 2];
                            case 'punishment': return [3, 5];
                            case 'logs': return [3, 14];
                            case 'help': return [3, 21];
                        }
                        return [3, 23];
                    case 2:
                        disabled = ':x: Disabled';
                        return [4, database_1.prisma.punish.findUnique({
                                where: { guild: interaction.guildId },
                                select: { option: true },
                            })];
                    case 3:
                        punish = _m.sent();
                        show = new discord_js_1.MessageEmbed()
                            .setTitle('**Anti-Raid | Config**')
                            .setAuthor({
                            name: interaction.user.tag,
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                        })
                            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                            .setFooter({
                            text: ((_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.name) || '',
                            iconURL: (_d = (_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.iconURL()) !== null && _d !== void 0 ? _d : '',
                        })
                            .addField('Logs', (logs === null || logs === void 0 ? void 0 : logs.channel) ? "<#".concat(logs.channel, ">") : disabled)
                            .addField('Punishment', (_e = punish === null || punish === void 0 ? void 0 : punish.option) !== null && _e !== void 0 ? _e : disabled)
                            .setColor('GREEN');
                        return [4, interaction.reply({ embeds: [show] })];
                    case 4:
                        _m.sent();
                        return [3, 23];
                    case 5:
                        punishment = interaction.options.getString('punishment');
                        if (!!((_f = interaction.memberPermissions) === null || _f === void 0 ? void 0 : _f.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) return [3, 7];
                        return [4, interaction.reply("You don't have permission to do this!")];
                    case 6:
                        _m.sent();
                        return [3, 23];
                    case 7:
                        if (!!punishment) return [3, 9];
                        return [4, interaction.reply(':x: | **Provide The punishment**')];
                    case 8:
                        _m.sent();
                        return [3, 23];
                    case 9:
                        if (!!(punishment === 'ban' ||
                            punishment === 'kick' ||
                            punishment === 'demote' ||
                            punishment === 'quarantine')) return [3, 11];
                        return [4, interaction.reply(':x: | **The punishment can only be kick, ban, quarantine or demote**')];
                    case 10:
                        _m.sent();
                        return [3, 23];
                    case 11: return [4, database_1.prisma.punish.upsert({
                            where: { guild: interaction.guildId },
                            update: { option: punishment },
                            create: {
                                guild: interaction.guildId,
                                option: punishment,
                            },
                        })];
                    case 12:
                        _m.sent();
                        return [4, interaction.reply('**The punishment has been set to ' + punishment + '**')];
                    case 13:
                        _m.sent();
                        return [3, 23];
                    case 14:
                        if (!!((_g = interaction.memberPermissions) === null || _g === void 0 ? void 0 : _g.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) return [3, 16];
                        return [4, interaction.reply("You don't have permission to do this!")];
                    case 15:
                        _m.sent();
                        return [3, 23];
                    case 16:
                        channel = interaction.options.getChannel('channel');
                        if (!((channel === null || channel === void 0 ? void 0 : channel.guildId) !== interaction.guildId)) return [3, 18];
                        return [4, interaction.reply(':x: | **That channel is not from this server**')];
                    case 17:
                        _m.sent();
                        return [3, 23];
                    case 18: return [4, database_1.prisma.logsChannel.upsert({
                            where: { guild: interaction.guildId },
                            update: { channel: channel.id },
                            create: {
                                guild: interaction.guildId,
                                channel: channel.id,
                            },
                        })];
                    case 19:
                        _m.sent();
                        channel.send('**Anti Raid logs Channel**');
                        return [4, interaction.reply('**The logs channel has been set to ' + channel + '**')];
                    case 20:
                        _m.sent();
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
                            text: ((_h = interaction.guild) === null || _h === void 0 ? void 0 : _h.name) || '',
                            iconURL: (_k = (_j = interaction.guild) === null || _j === void 0 ? void 0 : _j.iconURL()) !== null && _k !== void 0 ? _k : '',
                        });
                        return [4, interaction.reply({ embeds: [helpEmbed] })];
                    case 22:
                        _m.sent();
                        return [3, 23];
                    case 23: return [2];
                }
            });
        });
    },
};
