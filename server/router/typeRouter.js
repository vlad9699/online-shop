import { Router } from 'express'
import typeController from '../controllers/typeController.js'

const router = new Router()

router
  .post('/', typeController.create)
  .get('/', typeController.getAll)

export default router
