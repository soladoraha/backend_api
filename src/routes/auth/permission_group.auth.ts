import express from 'express'
import { container } from '@configs/inversify.config'
import PermissionGroupAuthController from '@controllers/auth/permission_group.controller';
const router = express.Router()
const permissionGroupAuthController: PermissionGroupAuthController = container.resolve(PermissionGroupAuthController)

// Permissions API!!!
router.get('/list', (req, res) => permissionGroupAuthController.search(req, res))
router.get('/:permissionGroupId', (req, res) => permissionGroupAuthController.detail(req, res))
router.post('/', (req, res) => permissionGroupAuthController.create(req, res))
router.put('/:permissionGroupId', (req, res) => permissionGroupAuthController.update(req, res))
router.delete('/:permissionGroupId', (req, res) => permissionGroupAuthController.deleted(req, res))

export default router