"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
var inversify_1 = require("inversify");
var user_service_1 = require("@services/users/user.service");
var user_repository_1 = require("@repositories/users/user.repository");
var session_repository_1 = require("@repositories/sessions/session.repository");
var permission_repository_1 = require("@repositories/permissions/permission.repository");
var permission_group_repository_1 = require("@repositories/permission_groups/permission_group.repository");
var role_repository_1 = require("@repositories/roles/role.repository");
var role_service_1 = require("@services/roles/role.service");
var container = new inversify_1.Container();
exports.container = container;
// Repositories
container.bind('UserRepository').to(user_repository_1.UserRepository);
container.bind('SessionRepository').to(session_repository_1.SessionRepository);
container.bind('PermissionRepository').to(permission_repository_1.PermissionRepository);
container.bind('PermissionGroupRepository').to(permission_group_repository_1.PermissionGroupRepository);
container.bind('RoleRepository').to(role_repository_1.RoleRepository);
// Services
container.bind('UserService').to(user_service_1.UserService);
container.bind('RoleService').to(role_service_1.RoleService);
