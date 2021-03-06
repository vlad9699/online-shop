import { Router } from 'express'
import userController from '../controllers/userController.js'
import checkToken from '../middleware/checkTokenMiddleware.js'

const router = new Router()

router
  .post('/registration', userController.registration)
  .post('/login',userController.login)
  .get('/auth', checkToken(), userController.check)

export default router
