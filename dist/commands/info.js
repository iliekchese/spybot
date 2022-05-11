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
exports.default = {
    name: 'info',
    run: function (_a) {
        var _b, _c;
        var message = _a.message, args = _a.args;
        return __awaiter(this, void 0, void 0, function () {
            var member, infoEmbed, row;
            return __generator(this, function (_d) {
                member = ((_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first()) ||
                    ((_c = message.guild) === null || _c === void 0 ? void 0 : _c.members.cache.get(args[0])) ||
                    message.member;
                infoEmbed = new discord_js_1.MessageEmbed()
                    .setTitle("Who is ".concat(member.user.tag, "?"))
                    .addField("Username", "".concat(member.user.tag))
                    .addField("Id", "".concat(member.user.id))
                    .addField("Account Created", "<t:".concat(Math.floor(member.user.createdTimestamp / 1000) + 3600, ":R>"))
                    .addField("Joined", "<t:".concat(Math.floor(member.joinedTimestamp / 1000) + 3600, ":R>"))
                    .addField("Bot", member.user.bot.toString())
                    .addField("Roles", member.roles.cache
                    .filter(function (role) { return role.name !== '@everyone'; })
                    .map(function (role) { return "<@&".concat(role.id, ">"); })
                    .join(member.roles.cache.size >= 10 ? ' | ' : '\n'))
                    .setThumbnail(member.user.avatarURL())
                    .setColor('#2F3136')
                    .setFooter({
                    text: 'Spy Bot',
                    iconURL: 'https://cdn.discordapp.com/avatars/939629038178295828/79c386588754ef3775b8ffd4654669f3.webp?size=80)',
                });
                row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                    .setURL(member.user.avatarURL())
                    .setLabel('Users Avatar')
                    .setStyle('LINK'));
                message.channel.send({ embeds: [infoEmbed], components: [row] });
                return [2];
            });
        });
    },
};
