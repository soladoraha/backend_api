"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNormalLoginSerializer = void 0;
var jsonapi_serializer_1 = require("jsonapi-serializer");
var inversify_1 = require("inversify");
var UserNormalLoginSerializer = /** @class */ (function () {
    function UserNormalLoginSerializer() {
        this.serializer = new jsonapi_serializer_1.Serializer('users', {
            attributes: ['_id', 'userName', 'email', 'fullName', 'accessToken', 'refreshToken'],
            keyForAttribute: 'snake_case'
        });
    }
    UserNormalLoginSerializer.prototype.serialize = function (data) {
        return this.serializer.serialize(data);
    };
    UserNormalLoginSerializer = __decorate([
        (0, inversify_1.injectable)()
    ], UserNormalLoginSerializer);
    return UserNormalLoginSerializer;
}());
exports.UserNormalLoginSerializer = UserNormalLoginSerializer;
