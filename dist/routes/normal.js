"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_normal_1 = __importDefault(require("@routes/normal/users.normal"));
var router = express_1.default.Router();
router.use('/normal', users_normal_1.default);
exports.default = router;
