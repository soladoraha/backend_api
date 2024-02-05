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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var base_controller_1 = require("@controllers/base.controller");
var userAuth_search_serializer_1 = require("@serializers/users/auth/userAuth.search.serializer");
var userAuth_detail_serializer_1 = require("@serializers/users/auth/userAuth.detail.serializer");
var userAuth_create_serializer_1 = require("@serializers/users/auth/userAuth.create.serializer");
var userAuth_update_serializer_1 = require("@serializers/users/auth/userAuth.update.serializer");
var UserAuthController = /** @class */ (function (_super) {
    __extends(UserAuthController, _super);
    // Service and repository to get from container inversify
    function UserAuthController(userService, userRepository) {
        var _this = _super.call(this) || this;
        _this.userService = userService;
        _this.userRepository = userRepository;
        return _this;
    }
    UserAuthController.prototype.search = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var roles, serialized, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.paginate(req, {
                                populate: [
                                    {
                                        path: 'roles',
                                        select: '_id code name',
                                        model: 'Role',
                                        populate: {
                                            path: 'permissions',
                                            select: '_id code name',
                                            model: 'Permission'
                                        }
                                    },
                                ],
                            })];
                    case 1:
                        roles = _a.sent();
                        serialized = new userAuth_search_serializer_1.UserAuthSearchSerializer().serialize(roles['data'], roles['total'], roles['limit'], roles['page']);
                        return [2 /*return*/, res.status(200).json(serialized)];
                    case 2:
                        error_1 = _a.sent();
                        res.status(500).send(error_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserAuthController.prototype.getUserInfo = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userId, user, serializedUser, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                        return [4 /*yield*/, this.userRepository.findById(userId)];
                    case 1:
                        user = _b.sent();
                        serializedUser = new userAuth_detail_serializer_1.UserAuthDetailSerializer().serialize(user);
                        return [2 /*return*/, res.status(200).json(serializedUser)];
                    case 2:
                        error_2 = _b.sent();
                        res.status(500).send(error_2.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserAuthController.prototype.detail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, serializedUser, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        req.body._id = req.params.userId || null;
                        return [4 /*yield*/, this.userRepository.findById(req.body)];
                    case 1:
                        user = _a.sent();
                        serializedUser = new userAuth_detail_serializer_1.UserAuthDetailSerializer().serialize(user);
                        return [2 /*return*/, res.status(200).json(serializedUser)];
                    case 2:
                        error_3 = _a.sent();
                        res.status(500).send(error_3.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserAuthController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, serializedUser, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.create(req.body)];
                    case 1:
                        user = _a.sent();
                        serializedUser = new userAuth_create_serializer_1.UserAuthCreateSerializer().serialize(user);
                        return [2 /*return*/, res.status(200).json(serializedUser)];
                    case 2:
                        error_4 = _a.sent();
                        res.status(500).send(error_4.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserAuthController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, serializedUser, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        req.body._id = req.params.userId || null;
                        return [4 /*yield*/, this.userRepository.update(req.body._id, req.body)];
                    case 1:
                        user = _a.sent();
                        serializedUser = new userAuth_update_serializer_1.UserAuthUpdateSerializer().serialize(user);
                        return [2 /*return*/, res.status(200).json(serializedUser)];
                    case 2:
                        error_5 = _a.sent();
                        res.status(500).send(error_5.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserAuthController.prototype.deleted = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        req.body._id = req.params.userId || null;
                        return [4 /*yield*/, this.userRepository.delete(req.body._id)];
                    case 1:
                        user = _a.sent();
                        if (typeof user === 'undefined') {
                            return [2 /*return*/, res.status(200).json({ message: 'Id not exist' })];
                        }
                        return [2 /*return*/, res.status(200).json({ message: 'Complete deleted' })];
                    case 2:
                        error_6 = _a.sent();
                        res.status(500).send(error_6.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserAuthController = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)('UserService')),
        __param(1, (0, inversify_1.inject)('UserRepository'))
    ], UserAuthController);
    return UserAuthController;
}(base_controller_1.BaseController));
exports.default = UserAuthController;
