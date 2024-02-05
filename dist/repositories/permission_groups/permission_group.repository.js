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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGroupRepository = void 0;
var inversify_1 = require("inversify");
var base_repository_1 = require("@repositories/base.repository");
var permission_group_model_1 = require("@models/permission_groups/permission_group.model");
var PermissionGroupRepository = /** @class */ (function (_super) {
    __extends(PermissionGroupRepository, _super);
    function PermissionGroupRepository() {
        return _super.call(this, permission_group_model_1.PermissionGroupModel) || this;
    }
    PermissionGroupRepository = __decorate([
        (0, inversify_1.injectable)()
    ], PermissionGroupRepository);
    return PermissionGroupRepository;
}(base_repository_1.BaseRepository));
exports.PermissionGroupRepository = PermissionGroupRepository;
