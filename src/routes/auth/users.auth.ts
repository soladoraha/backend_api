import express from 'express'
import { container } from '@configs/inversify.config'
import UserAuthController from '@controllers/auth/user.controller'
const router = express.Router()
const userAuthController = container.resolve<UserAuthController>(UserAuthController);

// Users API!!!
router.get('/user-info', userAuthController.getUserInfo.bind(userAuthController))
router.get('/list', userAuthController.search.bind(userAuthController))
router.get('/:userId', userAuthController.detail.bind(userAuthController))
router.post('/' ,userAuthController.create.bind(userAuthController))
router.put('/:userId', userAuthController.update.bind(userAuthController))
router.delete('/:userId', userAuthController.deleted.bind(userAuthController))

export default router