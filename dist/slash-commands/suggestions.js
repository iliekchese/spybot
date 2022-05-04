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
            .addStringOption(function (message) {
            return message
                .setName('message')
                .setDescription("The suggestion's body")
                .setRequired(true);
        });
    }),
    run: function (_a) {
        var _b, _c;
        var client = _a.client, interaction = _a.interaction, db = _a.db;
        return __awaiter(this, void 0, void 0, function () {
            var _d, channel, message, embed, suggestionsChannel;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _d = interaction.options.getSubcommand();
                        switch (_d) {
                            case 'set': return [3, 1];
                            case 'new': return [3, 3];
                        }
                        return [3, 5];
                    case 1:
                        channel = interaction.options.getChannel('channel');
                        db.set("suggestions_".concat((_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.id), "s".concat(channel === null || channel === void 0 ? void 0 : channel.id));
                        channel === null || channel === void 0 ? void 0 : channel.send('**Suggestions Channel**');
                        return [4, interaction.reply("**The suggestions channel has been set to <#".concat(channel === null || channel === void 0 ? void 0 : channel.id, ">**"))];
                    case 2:
                        _e.sent();
                        return [3, 5];
                    case 3: return [4, interaction.reply("**Suggestion submitted**")];
                    case 4:
                        _e.sent();
                        message = interaction.options.getString('message');
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("A new suggestion was submitted by ".concat(interaction.user.tag))
                            .setDescription(message !== null && message !== void 0 ? message : ':x: | **No message provided**')
                            .setColor('#2F3136');
                        suggestionsChannel = client.channels.cache.get(db.get("suggestions_".concat((_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.id)).slice(1));
                        suggestionsChannel === null || suggestionsChannel === void 0 ? void 0 : suggestionsChannel.send({ embeds: [embed] }).then(function (_a) {
                            var react = _a.react;
                            react('✅');
                            react('❌');
                        });
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    },
};
