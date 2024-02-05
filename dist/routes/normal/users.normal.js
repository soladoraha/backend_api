"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var inversify_config_1 = require("@configs/inversify.config");
var user_controller_1 = __importDefault(require("@controllers/normal/user.controller"));
var router = express_1.default.Router();
var userNormalController = inversify_config_1.container.resolve(user_controller_1.default);
// const registerUser = {
//     userName: [Validator.required()],
//     email: [Validator.required()],
//     password: [Validator.required()],
//     firstName: [Validator.required()],
//     lastName: [Validator.required()]
// }
// const loginUser = {
//     email: [Validator.required()],
//     password: [Validator.required()]
// }
router.get('/test1', function (req, res) {
    res.send('hello world');
});
// Register
router.post('/register', userNormalController.register.bind(userNormalController));
// Login
router.post('/login', userNormalController.login.bind(userNormalController));
// Refresh Token
router.post('/refresh-token', userNormalController.refreshToken.bind(userNormalController));
exports.default = router;
