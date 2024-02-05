"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var base_controller_1 = require("@controllers/base.controller");
var userNormal_register_serializer_1 = require("@serializers/users/normal/userNormal.register.serializer");
var userNormal_login_serializer_1 = require("@serializers/users/normal/userNormal.login.serializer");
var userNormal_refreshToken_serializer_1 = require("@serializers/users/normal/userNormal.refreshToken.serializer");
var user_validator_1 = require("@validators/normal/users/user.validator");
var message_1 = __importDefault(require("@configs/message"));
var UserNormalController = /** @class */ (function (_super) {
    __extends(UserNormalController, _super);
    function UserNormalController(userService, userRepository) {
        var _this = _super.call(this) || this;
        _this.userService = userService;
        _this.userRepository = userRepository;
        return _this;
    }
    UserNormalController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error, _a, serializedUserLogin, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userService.login(req.body)];
                    case 1:
                        user = _b.sent();
                        if (!!user) return [3 /*break*/, 3];
                        _a = Error.bind;
                        return [4 /*yield*/, message_1.default.get('auth_email_or_password_invalid')];
                    case 2:
                        error = new (_a.apply(Error, [void 0, _b.sent()]))();
                        return [2 /*return*/, this.sendErrorResponse(res, error)];
                    case 3:
                        serializedUserLogin = new userNormal_login_serializer_1.UserNormalLoginSerializer().serialize(user);
                        return [2 /*return*/, res.status(200).json(serializedUserLogin)];
                    case 4:
                        error_1 = _b.sent();
                        res.status(500).send(error_1.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserNormalController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userRegister, error, _a, serializedUser, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        new user_validator_1.UserValidate().validateRequest(req);
                        return [4 /*yield*/, this.userService.register(req.body)];
                    case 1:
                        userRegister = _b.sent();
                        if (!!userRegister) return [3 /*break*/, 3];
                        _a = Error.bind;
                        return [4 /*yield*/, message_1.default.get('auth_account_exists')];
                    case 2:
                        error = new (_a.apply(Error, [void 0, _b.sent()]))();
                        return [2 /*return*/, this.sendErrorResponse(res, error)];
                    case 3:
                        serializedUser = new userNormal_register_serializer_1.UserNormalRegisterSerializer().serialize(userRegister);
                        return [2 /*return*/, res.status(200).json(serializedUser)];
                    case 4:
                        error_2 = _b.sent();
                        return [2 /*return*/, this.sendErrorResponse(res, error_2)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserNormalController.prototype.refreshToken = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error, _a, serializedUserRefresh, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userService.refreshToken(req)];
                    case 1:
                        user = _b.sent();
                        if (!!user) return [3 /*break*/, 3];
                        _a = Error.bind;
                        return [4 /*yield*/, message_1.default.get('auth_refresh_token_invalid')];
                    case 2:
                        error = new (_a.apply(Error, [void 0, _b.sent()]))();
                        return [2 /*return*/, this.sendErrorResponse(res, error)];
                    case 3:
                        serializedUserRefresh = new userNormal_refreshToken_serializer_1.UserNormalRefreshTokenSerializer().serialize(user);
                        return [2 /*return*/, res.status(200).json(serializedUserRefresh)];
                    case 4:
                        error_3 = _b.sent();
                        res.status(500).send(error_3.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserNormalController = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)('UserService')),
        __param(1, (0, inversify_1.inject)('UserRepository'))
    ], UserNormalController);
    return UserNormalController;
}(base_controller_1.BaseController));
exports.default = UserNormalController;
