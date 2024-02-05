"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var inversify_config_1 = require("@configs/inversify.config");
var permission_group_controller_1 = __importDefault(require("@controllers/auth/permission_group.controller"));
var router = express_1.default.Router();
var permissionGroupAuthController = inversify_config_1.container.resolve(permission_group_controller_1.default);
// Permissions API!!!
router.get('/list', function (req, res) { return permissionGroupAuthController.search(req, res); });
router.get('/:permissionGroupId', function (req, res) { return permissionGroupAuthController.detail(req, res); });
router.post('/', function (req, res) { return permissionGroupAuthController.create(req, res); });
router.put('/:permissionGroupId', function (req, res) { return permissionGroupAuthController.update(req, res); });
router.delete('/:permissionGroupId', function (req, res) { return permissionGroupAuthController.deleted(req, res); });
exports.default = router;
