"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_auth_1 = __importDefault(require("@routes/auth/users.auth"));
var role_auth_1 = __importDefault(require("@routes/auth/role.auth"));
var permission_auth_1 = __importDefault(require("@routes/auth/permission.auth"));
var permission_group_auth_1 = __importDefault(require("@routes/auth/permission_group.auth"));
var deserializeUser_1 = __importDefault(require("@middlewares/deserializeUser"));
var auth = express_1.default.Router();
auth.use(deserializeUser_1.default);
auth.use('/auth/user', users_auth_1.default);
auth.use('/auth/role', role_auth_1.default);
auth.use('/auth/permission', permission_auth_1.default);
auth.use('/auth/permission-group', permission_group_auth_1.default);
exports.default = auth;
