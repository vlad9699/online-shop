import { Item, ItemInfo } from '../models/models.js'
import ApiError from '../error/ApiError.js'
import fileService from '../middleware/uploadMiddleware.js'


class ItemController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body
      const { img } = req.files
      const fileName = await fileService.saveFile(img)


      const item = await Item.create({ name, price, brandId, typeId, img: fileName })

      if (info) {
        info = JSON.parse(info)
        info.forEach(el => {
          ItemInfo.create({
            title: el.title,
            descriptions: el.descriptions,
            itemId: item.id,
          })
        })
      }

      res.json(item)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      let { brandId, typeId, limit, page } = req.query

      page = page || 1
      limit = limit || 9
      let offset = page * limit - limit

      let items
      if (!brandId && !typeId) {
        items = await Item.findAndCountAll({ limit, offset })
      }
      if (brandId && !typeId) {
        items = await Item.findAndCountAll({ where: { brandId }, limit, offset })
      }
      if (!brandId && typeId) {
        items = await Item.findAndCountAll({ where: { typeId }, limit, offset })
      }
      if (brandId && typeId) {
        items = await Item.findAndCountAll({ where: { brandId, typeId }, limit, offset })
      }
      res.json(items)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params
      const item = await Item.findOne({
        where: { id },
        include: [{ model: ItemInfo, as: 'info' }]
      })
      res.json(item)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

export default new ItemController()
