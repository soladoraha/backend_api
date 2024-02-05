"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGroupAuthSearchSerializer = void 0;
var jsonapi_serializer_1 = require("jsonapi-serializer");
var inversify_1 = require("inversify");
var PermissionGroupAuthSearchSerializer = /** @class */ (function () {
    function PermissionGroupAuthSearchSerializer() {
        this.serializer = new jsonapi_serializer_1.Serializer('permission_groups', {
            attributes: ['_id', 'code', 'name', 'permission_group'],
            keyForAttribute: 'snake_case',
        });
    }
    PermissionGroupAuthSearchSerializer.prototype.serialize = function (data, total, limit, page) {
        var datas = this.serializer.serialize(data);
        return __assign(__assign({}, datas), { meta: {
                total: total,
                limit: limit,
                page: page
            } });
    };
    PermissionGroupAuthSearchSerializer = __decorate([
        (0, inversify_1.injectable)()
    ], PermissionGroupAuthSearchSerializer);
    return PermissionGroupAuthSearchSerializer;
}());
exports.PermissionGroupAuthSearchSerializer = PermissionGroupAuthSearchSerializer;
