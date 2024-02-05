import express from 'express'
import userAuth from '@routes/auth/users.auth'
import roleAuth from '@routes/auth/role.auth'
import permissionAuth from '@routes/auth/permission.auth'
import permissionGroupAuth from '@routes/auth/permission_group.auth'
import deserializeUser from '@middlewares/deserializeUser'

const auth = express.Router()
auth.use(deserializeUser)
auth.use('/auth/user', userAuth)
auth.use('/auth/role', roleAuth)
auth.use('/auth/permission', permissionAuth)
auth.use('/auth/permission-group', permissionGroupAuth)

export default auth
