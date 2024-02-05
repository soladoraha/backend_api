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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleCreateValidate = void 0;
var inversify_1 = require("inversify");
var joi_1 = __importDefault(require("joi"));
var validator_base_1 = require("@validators/validator.base");
var role_model_1 = require("@models/roles/role.model");
var RoleCreateValidate = /** @class */ (function (_super) {
    __extends(RoleCreateValidate, _super);
    function RoleCreateValidate() {
        var schema = joi_1.default.object({
            code: joi_1.default.string().required(),
            name: joi_1.default.string().required(),
            permissions: joi_1.default.array().required()
        });
        return _super.call(this, role_model_1.RoleModel, schema) || this;
    }
    RoleCreateValidate = __decorate([
        (0, inversify_1.injectable)()
    ], RoleCreateValidate);
    return RoleCreateValidate;
}(validator_base_1.BaseValidator));
exports.RoleCreateValidate = RoleCreateValidate;
