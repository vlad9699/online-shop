import { Type } from '../models/models.js'
import ApiError from '../error/ApiError.js'

class TypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body
      const candidate = await Type.findOne({ where: { name: name } })
      if (candidate) return next(ApiError.badRequest('This product created'))
      const type = await Type.create({ name })
      res.json(type)
    } catch (e) {
      next(ApiError.badRequest(e.message))

    }


  }

  async getAll(req, res) {
    const types = await Type.findAll()
    res.json(types)

  }
}

export default new TypeController()
