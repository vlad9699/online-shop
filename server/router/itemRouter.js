import { Router } from 'express'
import itemController from '../controllers/itemController.js'

const router = new Router()

router
  .post('/', itemController.create)
  .get('/', itemController.getAll)
  .get('/:id', itemController.getOne)

export default router
