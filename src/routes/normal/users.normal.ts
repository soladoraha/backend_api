import express from 'express'
import { container } from '@configs/inversify.config'
import UserNormalController from '@controllers/normal/user.controller'
const router = express.Router()
const userNormalController = container.resolve<UserNormalController>(UserNormalController)

// const registerUser = {
//     userName: [Validator.required()],
//     email: [Validator.required()],
//     password: [Validator.required()],
//     firstName: [Validator.required()],
//     lastName: [Validator.required()]
// }

// const loginUser = {
//     email: [Validator.required()],
//     password: [Validator.required()]
// }

router.get('/test1', (req, res) => {
    res.send('hello world')
  })

// Register
router.post(
    '/register',
    userNormalController.register.bind(userNormalController)
)

// Login
router.post(
    '/login',
    userNormalController.login.bind(userNormalController)
)

// Refresh Token
router.post(
    '/refresh-token',
    userNormalController.refreshToken.bind(userNormalController)
)


export default router
