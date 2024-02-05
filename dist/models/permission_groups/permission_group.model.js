"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGroupModel = void 0;
var mongoose_1 = require("mongoose");
var permissionGroupSchema = new mongoose_1.Schema({
    code: { type: String, require: true },
    name: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.PermissionGroupModel = (0, mongoose_1.model)('PermissionGroup', permissionGroupSchema);
