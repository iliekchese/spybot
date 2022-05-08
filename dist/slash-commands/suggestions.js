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
var builders_1 = require("@discordjs/builders");
var database_1 = require("../database");
exports.default = {
    command: new builders_1.SlashCommandBuilder()
        .setName('suggestions')
        .setDescription('Suggestions command')
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('set')
            .setDescription('Sets the suggestions channel')
            .addChannelOption(function (channel) {
            return channel
                .setName('channel')
                .setDescription('The channel')
                .setRequired(true);
        });
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('new')
            .setDescription('Add new suggestion')
            .addStringOption(function (title) {
            return title
                .setName('title')
                .setDescription("The suggestion's title")
                .setRequired(true);
        })
            .addStringOption(function (body) {
            return body
                .setName('title')
                .setDescription("The suggestion's title")
                .setRequired(true);
        });
    }),
    run: function (_a) {
        var client = _a.client, interaction = _a.interaction;
        return __awaiter(this, void 0, void 0, function () {
            var _b, channel, title, body, embed, suggestions, suggestionsChannel, msg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = interaction.options.getSubcommand();
                        switch (_b) {
                            case 'set': return [3, 1];
                            case 'new': return [3, 4];
                        }
                        return [3, 9];
                    case 1:
                        channel = interaction.options.getChannel('channel');
                        return [4, database_1.prisma.suggestionsChannel.upsert({
                                where: { guild: interaction.guildId },
                                update: { id: channel === null || channel === void 0 ? void 0 : channel.id },
                                create: { guild: interaction.guildId, id: channel === null || channel === void 0 ? void 0 : channel.id }
                            })];
                    case 2:
                        _c.sent();
                        channel === null || channel === void 0 ? void 0 : channel.send('**Suggestions Channel**');
                        return [4, interaction.reply("**The suggestions channel has been set to <#".concat(channel === null || channel === void 0 ? void 0 : channel.id, ">**"))];
                    case 3:
                        _c.sent();
                        return [3, 9];
                    case 4: return [4, interaction.reply("**Suggestion submitted**")];
                    case 5:
                        _c.sent();
                        title = interaction.options.getString('title');
                        body = interaction.options.getString('body');
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("**".concat(title, "**"))
                            .setDescription(body)
                            .setColor('#2F3136')
                            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() });
                        return [4, database_1.prisma.suggestionsChannel.findUnique({
                                where: { guild: interaction.guildId },
                                select: { id: true }
                            })];
                    case 6:
                        suggestions = _c.sent();
                        suggestionsChannel = client.channels.cache.get(suggestions === null || suggestions === void 0 ? void 0 : suggestions.id);
                        return [4, (suggestionsChannel === null || suggestionsChannel === void 0 ? void 0 : suggestionsChannel.send({ embeds: [embed] }))];
                    case 7:
                        msg = _c.sent();
                        msg.react('✅');
                        msg.react('❌');
                        return [4, interaction.reply("**Suggestion submitted**")];
                    case 8:
                        _c.sent();
                        return [3, 9];
                    case 9: return [2];
                }
            });
        });
    },
};
