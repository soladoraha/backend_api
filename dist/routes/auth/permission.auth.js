"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var inversify_config_1 = require("@configs/inversify.config");
var permission_controller_1 = __importDefault(require("@controllers/auth/permission.controller"));
var router = express_1.default.Router();
var permissionAuthController = inversify_config_1.container.resolve(permission_controller_1.default);
// Permissions API!!!
router.get('/list', function (req, res) { return permissionAuthController.search(req, res); });
router.get('/:permissionId', function (req, res) { return permissionAuthController.detail(req, res); });
router.post('/', function (req, res) { return permissionAuthController.create(req, res); });
router.put('/:permissionId', function (req, res) { return permissionAuthController.update(req, res); });
router.delete('/:permissionId', function (req, res) { return permissionAuthController.deleted(req, res); });
exports.default = router;
