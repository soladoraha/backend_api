import express from 'express'
import userNormal from '@routes/normal/users.normal'

const router = express.Router()
router.use('/normal', userNormal)

export default router
