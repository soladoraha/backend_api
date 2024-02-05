"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
var mongoose_1 = require("mongoose");
var roleSchema = new mongoose_1.Schema({
    code: { type: String, require: true },
    name: { type: String, require: true },
    permissions: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Permission',
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.RoleModel = (0, mongoose_1.model)('Role', roleSchema);
