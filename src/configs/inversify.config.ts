import { Container } from 'inversify'
import { IUserService } from '@services/users/user.service.interface'
import { UserService } from '@services/users/user.service'
import { IUserRepository } from '@repositories/users/user.repository.interface'
import { UserRepository } from '@repositories/users/user.repository'
import { ISessionRepository } from '@repositories/sessions/session.repository.interface'
import { SessionRepository } from '@repositories/sessions/session.repository'
import { IPermissionRepository } from '@repositories/permissions/permission.repository.interface'
import { PermissionRepository } from '@repositories/permissions/permission.repository'
import { IPermissionGroupRepository } from '@repositories/permission_groups/permission_group.repository.interface'
import { PermissionGroupRepository } from '@repositories/permission_groups/permission_group.repository'
import { IRoleRepository } from '@repositories/roles/role.repository.interface'
import { RoleRepository } from '@repositories/roles/role.repository'
import { IRoleService } from '@services/roles/role.service.interface'
import { RoleService } from '@services/roles/role.service'


const container = new Container()
// Repositories
container.bind<IUserRepository>('UserRepository').to(UserRepository)
container.bind<ISessionRepository>('SessionRepository').to(SessionRepository)
container.bind<IPermissionRepository>('PermissionRepository').to(PermissionRepository)
container.bind<IPermissionGroupRepository>('PermissionGroupRepository').to(PermissionGroupRepository)
container.bind<IRoleRepository>('RoleRepository').to(RoleRepository)

// Services
container.bind<IUserService>('UserService').to(UserService)
container.bind<IRoleService>('RoleService').to(RoleService)

export { container }
