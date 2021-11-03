import { Router } from 'express'
import itemRouter from './itemRouter.js'
import brandRouter from './brandRouter.js'
import typeRouter from './typeRouter.js'
import userRouter from './userRouter.js'
const router = new Router()

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/item', itemRouter)

export default router
