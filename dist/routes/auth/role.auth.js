"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var inversify_config_1 = require("@configs/inversify.config");
var role_controller_1 = __importDefault(require("@controllers/auth/role.controller"));
var authenticate_1 = __importDefault(require("@middlewares/authenticate"));
var router = express_1.default.Router();
var roleAuthController = inversify_config_1.container.resolve(role_controller_1.default);
var auth = inversify_config_1.container.resolve(authenticate_1.default);
// Roles API!!!
router.get('/list', auth.isAllow('USER_VIEW_LIST'), function (req, res) { return roleAuthController.search(req, res); });
router.get('/:roleId', auth.isAllow('USER_DETAIL'), function (req, res) { return roleAuthController.detail(req, res); });
router.post('/', auth.isAllow('USER_CREATE'), function (req, res, next) { return roleAuthController.create(req, res, next); });
router.put('/:roleId', auth.isAllow('USER_UPDATE'), function (req, res) { return roleAuthController.update(req, res); });
router.delete('/:roleId', auth.isAllow('USER_DELETE'), function (req, res) { return roleAuthController.deleted(req, res); });
// router.get('/list', (req, res) => roleAuthController.search(req, res))
// router.get('/:roleId', (req, res) => roleAuthController.detail(req, res))
// router.post('/', (req, res, next) => roleAuthController.create(req, res, next))
// router.put('/:roleId', (req, res) => roleAuthController.update(req, res))
// router.delete('/:roleId', (req, res) => roleAuthController.deleted(req, res))
exports.default = router;
