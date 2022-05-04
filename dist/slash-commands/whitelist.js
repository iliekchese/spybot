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
exports.default = {
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
        var _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var interaction = _a.interaction, db = _a.db;
        return __awaiter(this, void 0, void 0, function () {
            var _l, user_1, whitelist, user_2, whitelist, whitelistedUser, index, fix, embed, whitelisted;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        _l = interaction.options.getSubcommand();
                        switch (_l) {
                            case 'add': return [3, 1];
                            case 'remove': return [3, 7];
                            case 'show': return [3, 15];
                        }
                        return [3, 17];
                    case 1:
                        if (!(((_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.ownerId) === interaction.user.id)) return [3, 5];
                        user_1 = interaction.options.getUser('user');
                        whitelist = db.get("whitelist_".concat(interaction.guild.id));
                        if (!(whitelist === null || whitelist === void 0 ? void 0 : whitelist.find(function (x) { return x.user === (user_1 === null || user_1 === void 0 ? void 0 : user_1.id); }))) return [3, 3];
                        return [4, interaction.reply(':x: | **The User is already whitelisted**')];
                    case 2:
                        _m.sent();
                        return [3, 17];
                    case 3:
                        db.push("whitelist_".concat(interaction.guild.id), { user: user_1 === null || user_1 === void 0 ? void 0 : user_1.id });
                        return [4, interaction.reply("**The user has been whitelisted!**")];
                    case 4:
                        _m.sent();
                        return [3, 17];
                    case 5: return [4, interaction.reply(':x: | **Only The owner of the Server can whitelist people**')];
                    case 6:
                        _m.sent();
                        return [3, 17];
                    case 7:
                        if (!(interaction.user.id === ((_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.ownerId))) return [3, 13];
                        user_2 = interaction.options.getUser('user');
                        whitelist = db.get("whitelist_".concat(interaction.guild.id));
                        if (!whitelist) return [3, 11];
                        whitelistedUser = whitelist.find(function (x) { return x.user.id === (user_2 === null || user_2 === void 0 ? void 0 : user_2.id); });
                        if (!whitelistedUser) return [3, 9];
                        return [4, interaction.reply(':x: | **The user is not whitelisted!**')];
                    case 8:
                        _m.sent();
                        return [3, 17];
                    case 9:
                        index = whitelist.indexOf(whitelistedUser || {});
                        delete whitelist[index];
                        fix = whitelist.filter(function (x) { return !!x; });
                        db.set("whitelist_".concat(interaction.guild.id), fix);
                        return [4, interaction.reply('**The user has been unwhitelisted!**')];
                    case 10:
                        _m.sent();
                        return [3, 17];
                    case 11: return [4, interaction.reply(':x: | **The user is not whitelisted!**')];
                    case 12:
                        _m.sent();
                        return [3, 15];
                    case 13: return [4, interaction.reply(':x: | **Only The owner of the Server can unwhitelist people**')];
                    case 14:
                        _m.sent();
                        return [3, 17];
                    case 15:
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle('**The list of whitelisted users**')
                            .setAuthor({
                            name: interaction.user.tag,
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                        })
                            .setFooter({
                            text: ((_d = interaction.guild) === null || _d === void 0 ? void 0 : _d.name) || '',
                            iconURL: (_f = (_e = interaction.guild) === null || _e === void 0 ? void 0 : _e.iconURL()) !== null && _f !== void 0 ? _f : '',
                        })
                            .setThumbnail((_h = (_g = interaction.guild) === null || _g === void 0 ? void 0 : _g.iconURL()) !== null && _h !== void 0 ? _h : '');
                        whitelisted = (_k = db
                            .get("whitelist_".concat((_j = interaction.guild) === null || _j === void 0 ? void 0 : _j.id))) === null || _k === void 0 ? void 0 : _k.map(function (x) { return "<@".concat(x.user, ">"); });
                        if (whitelisted === null || whitelisted === void 0 ? void 0 : whitelisted.length) {
                            embed.addField('**Users**', "".concat(whitelisted.join('\n')));
                            embed.setColor('GREEN');
                        }
                        else {
                            embed.setDescription(':x: | **No whitelisted Users Found**');
                            embed.setColor('#FF0000');
                        }
                        return [4, interaction.reply({ embeds: [embed] })];
                    case 16:
                        _m.sent();
                        return [3, 17];
                    case 17: return [2];
                }
            });
        });
    },
};
