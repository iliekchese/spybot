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
    var disabled = ':x: Disabled';
    client.on('roleCreate', function (role) { return __awaiter(void 0, void 0, void 0, function () {
        var audits, log, user, whitelist, personLimit, limit, logsID, punish, logs, embed, member, _a, quarantineRole, _1;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (role.managed)
                        return [2];
                    return [4, role.guild.fetchAuditLogs({
                            type: 'ROLE_CREATE',
                        })];
                case 1:
                    audits = _d.sent();
                    log = audits.entries.first();
                    user = log === null || log === void 0 ? void 0 : log.executor;
                    whitelist = db.get("whitelist_".concat(role.guild.id));
                    personLimit = db.get("".concat(role.guild.id, "_").concat(user === null || user === void 0 ? void 0 : user.id, "_rolecreate"));
                    limit = db.get("rolecreate_".concat(role.guild.id));
                    if (whitelist === null || whitelist === void 0 ? void 0 : whitelist.some(function (id) { return id === (user === null || user === void 0 ? void 0 : user.id); }))
                        return [2];
                    if ((user === null || user === void 0 ? void 0 : user.id) === ((_b = client.user) === null || _b === void 0 ? void 0 : _b.id))
                        return [2];
                    if (!limit)
                        return [2];
                    if (!personLimit)
                        return [2];
                    logsID = db.get("logs_".concat(role.guild.id));
                    punish = db.get("punish_".concat(role.guild.id)) || disabled;
                    logs = client.channels.cache.get(logsID === null || logsID === void 0 ? void 0 : logsID.slice(1));
                    embed = new discord_js_1.MessageEmbed()
                        .setTitle('**Anti-Raid**')
                        .setThumbnail((user === null || user === void 0 ? void 0 : user.displayAvatarURL({ dynamic: true })) || '')
                        .setFooter({
                        text: role.guild.name,
                        iconURL: (_c = role.guild.iconURL()) !== null && _c !== void 0 ? _c : '',
                    })
                        .addField('User', (user === null || user === void 0 ? void 0 : user.tag) || '')
                        .addField('Case', 'Tried To Raid | breaking the role create limits')
                        .addField('Punishment', punish)
                        .setColor('#2f3136');
                    member = role.guild.members.cache.get(user === null || user === void 0 ? void 0 : user.id);
                    if (!(personLimit >= limit)) return [3, 13];
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 10, 11, 12]);
                    _a = punish;
                    switch (_a) {
                        case 'kick': return [3, 3];
                        case 'ban': return [3, 5];
                        case 'demote': return [3, 7];
                        case 'quarantine': return [3, 8];
                    }
                    return [3, 9];
                case 3: return [4, (member === null || member === void 0 ? void 0 : member.kick("You have been kicked for creating too many roles."))];
                case 4:
                    _d.sent();
                    return [3, 9];
                case 5: return [4, (member === null || member === void 0 ? void 0 : member.ban({ reason: "You have been banned for creating too many roles." }))];
                case 6:
                    _d.sent();
                    return [3, 9];
                case 7:
                    member === null || member === void 0 ? void 0 : member.roles.cache.filter(function (r) { return r.name !== '@everyone'; }).forEach(function (r) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, (member === null || member === void 0 ? void 0 : member.roles.remove(r.id))];
                            case 1: return [2, _a.sent()];
                        }
                    }); }); });
                    return [3, 9];
                case 8:
                    quarantineRole = member === null || member === void 0 ? void 0 : member.guild.roles.cache.find(function (role) { return role.name === "Quarantine"; });
                    member === null || member === void 0 ? void 0 : member.roles.cache.filter(function (r) { return r.name !== '@everyone'; }).forEach(function (r) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, (member === null || member === void 0 ? void 0 : member.roles.remove(r.id))];
                            case 1: return [2, _a.sent()];
                        }
                    }); }); });
                    member === null || member === void 0 ? void 0 : member.roles.add(quarantineRole);
                    return [3, 9];
                case 9:
                    embed.addField("".concat(punish, "ed"), 'Yes');
                    return [3, 12];
                case 10:
                    _1 = _d.sent();
                    embed.addField("".concat(punish, "ed"), 'No');
                    return [3, 12];
                case 11:
                    logs.send({ embeds: [embed] });
                    return [7];
                case 12: return [3, 14];
                case 13:
                    db.add("".concat(role.guild.id, "_").concat(user === null || user === void 0 ? void 0 : user.id, "_rolecreate"), 1);
                    _d.label = 14;
                case 14: return [2];
            }
        });
    }); });
    client.on('roleDelete', function (role) { return __awaiter(void 0, void 0, void 0, function () {
        var audits, log, user, whitelist, personLimit, limit, logsID, punish, logs, embed, member, _a, quarantineRole, _2;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (role.managed)
                        return [2];
                    return [4, role.guild.fetchAuditLogs({
                            type: 'ROLE_DELETE',
                        })];
                case 1:
                    audits = _d.sent();
                    log = audits.entries.first();
                    user = log === null || log === void 0 ? void 0 : log.executor;
                    whitelist = db.get("whitelist_".concat(role.guild.id));
                    personLimit = db.get("".concat(role.guild.id, "_").concat(user === null || user === void 0 ? void 0 : user.id, "_roledelete"));
                    limit = db.get("roledelete_".concat(role.guild.id));
                    if ((user === null || user === void 0 ? void 0 : user.id) === ((_b = client.user) === null || _b === void 0 ? void 0 : _b.id))
                        return [2];
                    if (whitelist === null || whitelist === void 0 ? void 0 : whitelist.find(function (x) { return x.user.id === (user === null || user === void 0 ? void 0 : user.id); }))
                        return [2];
                    if (!personLimit)
                        return [2];
                    if (limit)
                        return [2];
                    logsID = db.get("logs_".concat(role.guild.id));
                    punish = db.get("punish_".concat(role.guild.id)) || disabled;
                    logs = client.channels.cache.get(logsID === null || logsID === void 0 ? void 0 : logsID.slice(1));
                    embed = new discord_js_1.MessageEmbed()
                        .setTitle('**Anti-Raid**')
                        .setThumbnail((user === null || user === void 0 ? void 0 : user.displayAvatarURL({ dynamic: true })) || '')
                        .setFooter({
                        text: role.guild.name,
                        iconURL: (_c = role.guild.iconURL()) !== null && _c !== void 0 ? _c : '',
                    })
                        .addField('User', (user === null || user === void 0 ? void 0 : user.tag) || '')
                        .addField('Case', 'Tried To Raid | breaking the role delete limits')
                        .addField('Punishment', punish)
                        .setColor('#2f3136');
                    member = role.guild.members.cache.get(user === null || user === void 0 ? void 0 : user.id);
                    if (!(personLimit >= limit)) return [3, 13];
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 10, 11, 12]);
                    _a = punish;
                    switch (_a) {
                        case 'kick': return [3, 3];
                        case 'ban': return [3, 5];
                        case 'demote': return [3, 7];
                        case 'quarantine': return [3, 8];
                    }
                    return [3, 9];
                case 3: return [4, (member === null || member === void 0 ? void 0 : member.kick("You have been kicked for creating too many roles."))];
                case 4:
                    _d.sent();
                    return [3, 9];
                case 5: return [4, (member === null || member === void 0 ? void 0 : member.ban({ reason: "You have been banned for creating too many roles." }))];
                case 6:
                    _d.sent();
                    return [3, 9];
                case 7:
                    member === null || member === void 0 ? void 0 : member.roles.cache.filter(function (r) { return r.name !== '@everyone'; }).forEach(function (r) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, (member === null || member === void 0 ? void 0 : member.roles.remove(r.id))];
                            case 1: return [2, _a.sent()];
                        }
                    }); }); });
                    return [3, 9];
                case 8:
                    quarantineRole = member === null || member === void 0 ? void 0 : member.guild.roles.cache.find(function (role) { return role.name === "Quarantine"; });
                    member === null || member === void 0 ? void 0 : member.roles.cache.filter(function (r) { return r.name !== '@everyone'; }).forEach(function (r) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, (member === null || member === void 0 ? void 0 : member.roles.remove(r.id))];
                            case 1: return [2, _a.sent()];
                        }
                    }); }); });
                    member === null || member === void 0 ? void 0 : member.roles.add(quarantineRole);
                    return [3, 9];
                case 9:
                    embed.addField("".concat(punish, "ed"), 'Yes');
                    return [3, 12];
                case 10:
                    _2 = _d.sent();
                    embed.addField("".concat(punish, "ed"), 'No');
                    return [3, 12];
                case 11:
                    logs.send({ embeds: [embed] });
                    return [7];
                case 12: return [3, 14];
                case 13:
                    db.add("".concat(role.guild.id, "_").concat(user === null || user === void 0 ? void 0 : user.id, "_roledelete"), 1);
                    _d.label = 14;
                case 14: return [2];
            }
        });
    }); });
};
exports.handler = handler;
