import express from 'express'
import { container } from '@configs/inversify.config'
import RoleAuthController from '@controllers/auth/role.controller'
import Auth from '@middlewares/authenticate'
const router = express.Router()
const roleAuthController: RoleAuthController = container.resolve(RoleAuthController)
const auth: Auth = container.resolve(Auth)

// Roles API!!!
router.get('/list', auth.isAllow('USER_VIEW_LIST'), (req, res) => roleAuthController.search(req, res))
router.get('/:roleId', auth.isAllow('USER_DETAIL'), (req, res) => roleAuthController.detail(req, res))
router.post('/', auth.isAllow('USER_CREATE'), (req, res, next) => roleAuthController.create(req, res, next))
router.put('/:roleId', auth.isAllow('USER_UPDATE'), (req, res) => roleAuthController.update(req, res))
router.delete('/:roleId', auth.isAllow('USER_DELETE'), (req, res) => roleAuthController.deleted(req, res))

// router.get('/list', (req, res) => roleAuthController.search(req, res))
// router.get('/:roleId', (req, res) => roleAuthController.detail(req, res))
// router.post('/', (req, res, next) => roleAuthController.create(req, res, next))
// router.put('/:roleId', (req, res) => roleAuthController.update(req, res))
// router.delete('/:roleId', (req, res) => roleAuthController.deleted(req, res))

export default router