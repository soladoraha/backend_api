"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var inversify_config_1 = require("@configs/inversify.config");
var user_controller_1 = __importDefault(require("@controllers/auth/user.controller"));
var router = express_1.default.Router();
var userAuthController = inversify_config_1.container.resolve(user_controller_1.default);
// Users API!!!
router.get('/user-info', userAuthController.getUserInfo.bind(userAuthController));
router.get('/list', userAuthController.search.bind(userAuthController));
router.get('/:userId', userAuthController.detail.bind(userAuthController));
router.post('/', userAuthController.create.bind(userAuthController));
router.put('/:userId', userAuthController.update.bind(userAuthController));
router.delete('/:userId', userAuthController.deleted.bind(userAuthController));
exports.default = router;
