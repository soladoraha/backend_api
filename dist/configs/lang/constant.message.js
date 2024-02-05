"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var authValidate_message_1 = __importDefault(require("./authValidate.message"));
var resultValidate_message_1 = __importDefault(require("./resultValidate.message"));
var variablesValidate_message_1 = __importDefault(require("./variablesValidate.message"));
exports.default = __assign(__assign(__assign({}, authValidate_message_1.default), resultValidate_message_1.default), variablesValidate_message_1.default);
