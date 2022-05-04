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
var handler = function (_a) {
    var client = _a.client, db = _a.db;
    client.on("messageCreate", function (msg) { return __awaiter(void 0, void 0, void 0, function () {
        var member_1, whitelist, role, quarantineEmbed, logs, pinglogEmbed, logsChannel;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!(msg.content === "@everyone" || msg.content === "@here")) return [3, 2];
                    member_1 = msg.member;
                    whitelist = db.get("whitelist_".concat((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.id));
                    if (whitelist === null || whitelist === void 0 ? void 0 : whitelist.some(function (id) { return id === (member_1 === null || member_1 === void 0 ? void 0 : member_1.user.id); }))
                        return [2];
                    role = member_1 === null || member_1 === void 0 ? void 0 : member_1.guild.roles.cache.find(function (role) { return role.name === "Quarantine"; });
                    member_1 === null || member_1 === void 0 ? void 0 : member_1.roles.cache.filter(function (r) { return r.name !== '@everyone'; }).forEach(function (r) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, (member_1 === null || member_1 === void 0 ? void 0 : member_1.roles.remove(r.id))];
                            case 1: return [2, _a.sent()];
                        }
                    }); }); });
                    member_1 === null || member_1 === void 0 ? void 0 : member_1.roles.add(role);
                    return [4, msg.delete()];
                case 1:
                    _e.sent();
                    quarantineEmbed = new discord_js_1.MessageEmbed()
                        .setTitle('Quarantine')
                        .setAuthor({ name: member_1 === null || member_1 === void 0 ? void 0 : member_1.user.tag, iconURL: member_1 === null || member_1 === void 0 ? void 0 : member_1.user.avatarURL() })
                        .setDescription("".concat(member_1 === null || member_1 === void 0 ? void 0 : member_1.user, " Was succesfully quarantined. \n For attempting to mention ").concat(msg.content))
                        .setColor('#2F3136');
                    msg.channel.send({ embeds: [quarantineEmbed] });
                    logs = (_c = db.get("logs_".concat((_b = msg.guild) === null || _b === void 0 ? void 0 : _b.id))) === null || _c === void 0 ? void 0 : _c.slice(1);
                    pinglogEmbed = new discord_js_1.MessageEmbed()
                        .setTitle("**Member Quarantined**: ".concat(member_1 === null || member_1 === void 0 ? void 0 : member_1.user.tag))
                        .setDescription("**Reason**: Attemting to ping. \n **Message**: ".concat(msg.content))
                        .setColor('#2F3136')
                        .setThumbnail(member_1 === null || member_1 === void 0 ? void 0 : member_1.user.avatarURL());
                    logsChannel = (_d = msg.guild) === null || _d === void 0 ? void 0 : _d.channels.cache.get(logs);
                    logsChannel.send({ embeds: [pinglogEmbed] });
                    _e.label = 2;
                case 2: return [2];
            }
        });
    }); });
};
exports.handler = handler;
