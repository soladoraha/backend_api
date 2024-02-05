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
exports.UserService = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var config_1 = __importDefault(require("config"));
var inversify_1 = require("inversify");
var user_model_1 = require("@models/users/user.model");
var base_service_1 = require("@services/base.service");
var jwt_utils_1 = require("@utils/jwt.utils");
var lodash_1 = require("lodash");
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService(userRepository, sessionRepository) {
        var _this = _super.call(this) || this;
        _this.userRepository = userRepository;
        _this.sessionRepository = sessionRepository;
        // Env setting
        _this.accessTokenTl = config_1.default.get('access_token_tl');
        _this.refreshTokenTl = config_1.default.get('refresh_token_tl');
        return _this;
    }
    UserService.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, user_model_1.UserModel.find({})];
            });
        });
    };
    UserService.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    UserService.prototype.register = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var checkEmail, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({ email: input.email })];
                    case 1:
                        checkEmail = _a.sent();
                        if (checkEmail) {
                            return [2 /*return*/, false];
                        }
                        data = {
                            userName: (0, lodash_1.get)(input, 'userName'),
                            roles: (0, lodash_1.get)(input, 'roles'),
                            email: (0, lodash_1.get)(input, 'email'),
                            password: (0, lodash_1.get)(input, 'password'),
                            firstName: (0, lodash_1.get)(input, 'firstName'),
                            lastName: (0, lodash_1.get)(input, 'lastName'),
                            fullName: (0, lodash_1.get)(input, 'firstName', '') + ' ' + (0, lodash_1.get)(input, 'lastName', ''),
                            isActive: (0, lodash_1.get)(input, 'is_active', 1),
                        };
                        return [2 /*return*/, this.userRepository.create(data)];
                }
            });
        });
    };
    UserService.prototype.login = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var user, sessionParam, session, accessToken, refreshToken, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.validatePassword(params)];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 5];
                        sessionParam = {
                            user: (0, lodash_1.get)(user, '_id'),
                        };
                        return [4 /*yield*/, this.sessionRepository.create(sessionParam)
                            // Create Access Token
                        ];
                    case 2:
                        session = _a.sent();
                        return [4 /*yield*/, this.createAccessToken(user, session)
                            // Create refresh Token
                        ];
                    case 3:
                        accessToken = _a.sent();
                        return [4 /*yield*/, this.createRefreshToken(session)];
                    case 4:
                        refreshToken = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, user), { accessToken: accessToken, refreshToken: refreshToken })];
                    case 5: return [2 /*return*/, false];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        throw error_1;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.refreshToken = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, decoded, session, user, accessToken, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        refreshToken = (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, "");
                        decoded = (0, jwt_utils_1.decode)(refreshToken).decoded;
                        if (!decoded || !(0, lodash_1.get)(decoded, 'session')) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.sessionRepository.findById({ _id: (0, lodash_1.get)(decoded, 'session') })
                            // Make sure the session is still valid
                        ];
                    case 1:
                        session = _a.sent();
                        // Make sure the session is still valid
                        if (!session || !(session === null || session === void 0 ? void 0 : session.valid))
                            return [2 /*return*/, false];
                        return [4 /*yield*/, this.userRepository.findOne({ _id: (0, lodash_1.get)(session, 'user') })];
                    case 2:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, false
                                // Create Access Token
                            ];
                        return [4 /*yield*/, this.createAccessToken(user, session)];
                    case 3:
                        accessToken = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, user), { accessToken: accessToken })];
                    case 4:
                        error_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.validatePassword = function (_a) {
        var email = _a.email, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var user, checkPassword;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({ email: email })];
                    case 1:
                        user = _b.sent();
                        if (!!user) return [3 /*break*/, 2];
                        return [2 /*return*/, false];
                    case 2: return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 3:
                        checkPassword = _b.sent();
                        if (checkPassword) {
                            return [2 /*return*/, user];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.createAccessToken = function (user, session) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken;
            return __generator(this, function (_a) {
                accessToken = (0, jwt_utils_1.sign)(__assign(__assign({}, user), { session: session._id }), { expiresIn: this.accessTokenTl } // 15 minutes
                );
                return [2 /*return*/, accessToken];
            });
        });
    };
    UserService.prototype.createRefreshToken = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken;
            return __generator(this, function (_a) {
                refreshToken = (0, jwt_utils_1.sign)({ session: session._id }, { expiresIn: this.refreshTokenTl } // 15 minutes
                );
                return [2 /*return*/, refreshToken];
            });
        });
    };
    UserService = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)('UserRepository')),
        __param(1, (0, inversify_1.inject)('SessionRepository'))
    ], UserService);
    return UserService;
}(base_service_1.BaseService));
exports.UserService = UserService;
