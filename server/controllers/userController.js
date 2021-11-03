import ApiError from '../error/ApiError.js'
import bcrypt from 'bcrypt'
import { User, Basket } from '../models/models.js'
import jwt from 'jsonwebtoken'

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body

      if(!email || !password) return next(ApiError.badRequest('Bad email or password'))

      const candidate = await User.findOne({where: {email}})
      if (candidate) return next(ApiError.badRequest('User with this email is here'))

      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({email, role: role, password: hashPassword})
      const basket = await Basket.create({userId: user.id})
      const token = jwt.sign(
        {id: user.id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
      )
      res.json(token)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async login(req, res) {

  }

  async check(req, res, next) {
    const { id } = req.query
    if (!id) return next(ApiError.badRequest('No ID set'))
    res.json(id)

  }
}

export default new UserController()
