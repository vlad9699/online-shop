import { Router } from 'express'
import userController from '../controllers/userController.js'

const router = new Router()

router
  .post('/registration', userController.registration)
  .post('/login',userController.login)
  .get('/auth', userController.check)

export default router
