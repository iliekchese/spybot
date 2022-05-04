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
    name: "quarantine",
    run: function (_a) {
        var _b, _c, _d, _e;
        var message = _a.message, args = _a.args;
        return __awaiter(this, void 0, void 0, function () {
            var member, role, quarantineEmbed, quarantineDMEmbed, unquarantineEmbed, unquarantineDMEmbed;
            var _this = this;
            return __generator(this, function (_f) {
                if (!((_b = message.member) === null || _b === void 0 ? void 0 : _b.permissions.has(discord_js_1.Permissions.FLAGS.KICK_MEMBERS))) {
                    message.channel.send("You don't have permission to do this!");
                    return [2];
                }
                member = (_c = message.mentions.members) === null || _c === void 0 ? void 0 : _c.first();
                role = member === null || member === void 0 ? void 0 : member.guild.roles.cache.find(function (role) { return role.name === "Quarantine"; });
                switch (args[0]) {
                    case 'add':
                        quarantineEmbed = new discord_js_1.MessageEmbed()
                            .setTitle('Quarantine')
                            .setDescription("".concat(member === null || member === void 0 ? void 0 : member.user, " Was succsesfully quarantined."))
                            .setColor('#2F3136');
                        message.channel.send({ embeds: [quarantineEmbed] });
                        quarantineDMEmbed = new discord_js_1.MessageEmbed()
                            .setTitle('Quarantine')
                            .setDescription("You were quarantined in `".concat((_d = message.guild) === null || _d === void 0 ? void 0 : _d.name, "` \n By server moderators."))
                            .setColor('#2F3136');
                        member === null || member === void 0 ? void 0 : member.user.send({ embeds: [quarantineDMEmbed] });
                        member === null || member === void 0 ? void 0 : member.roles.cache.filter(function (r) { return r.name !== '@everyone'; }).forEach(function (r) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, (member === null || member === void 0 ? void 0 : member.roles.remove(r.id))];
                                case 1: return [2, _a.sent()];
                            }
                        }); }); });
                        member === null || member === void 0 ? void 0 : member.roles.add(role);
                        break;
                    case 'remove':
                        unquarantineEmbed = new discord_js_1.MessageEmbed()
                            .setTitle('Quarantine')
                            .setDescription("".concat(member === null || member === void 0 ? void 0 : member.user, " Was succsesfully unquarantined."))
                            .setColor('#2F3136');
                        message.channel.send({ embeds: [unquarantineEmbed] });
                        unquarantineDMEmbed = new discord_js_1.MessageEmbed()
                            .setTitle('Quarantine')
                            .setDescription("You were unquarantined in `".concat((_e = message.guild) === null || _e === void 0 ? void 0 : _e.name, "` \n By server moderators."))
                            .setColor('#2F3136');
                        member === null || member === void 0 ? void 0 : member.user.send({ embeds: [unquarantineDMEmbed] });
                        member === null || member === void 0 ? void 0 : member.roles.remove(role);
                        break;
                }
                return [2];
            });
        });
    }
};
