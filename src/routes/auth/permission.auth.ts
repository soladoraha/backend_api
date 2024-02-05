import express from 'express'
import { container } from '@configs/inversify.config'
import PermissionAuthController from '@controllers/auth/permission.controller'
const router = express.Router()
const permissionAuthController: PermissionAuthController = container.resolve(PermissionAuthController)

// Permissions API!!!
router.get('/list', (req, res) => permissionAuthController.search(req, res))
router.get('/:permissionId', (req, res) => permissionAuthController.detail(req, res))
router.post('/', (req, res) => permissionAuthController.create(req, res))
router.put('/:permissionId',  (req, res) => permissionAuthController.update(req, res))
router.delete('/:permissionId',  (req, res) => permissionAuthController.deleted(req, res))

export default router