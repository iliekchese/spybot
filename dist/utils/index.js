"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLog = exports.punish = void 0;
var punish_1 = require("./punish");
Object.defineProperty(exports, "punish", { enumerable: true, get: function () { return __importDefault(punish_1).default; } });
var logger_1 = require("./logger");
Object.defineProperty(exports, "createLog", { enumerable: true, get: function () { return logger_1.createLog; } });
