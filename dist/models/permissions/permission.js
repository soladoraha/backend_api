"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModel = void 0;
var mongoose_1 = require("mongoose");
var permissionSchema = new mongoose_1.Schema({
    code: { type: String, require: true },
    name: { type: String, require: true },
    permission_group: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'PermissionGroup',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.PermissionModel = (0, mongoose_1.model)('Permission', permissionSchema);
