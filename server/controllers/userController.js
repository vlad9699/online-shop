import ApiError from '../error/ApiError.js'
import bcrypt from 'bcrypt'
import { Basket, Token, User } from '../models/models.js'
import jwt from 'jsonwebtoken'

const generateJwt = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  )
}

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body

      if (!email || !password) return next(ApiError.badRequest('Bad email or password'))

      const candidate = await User.findOne({ where: { email: email } })

      if (candidate) return next(ApiError.badRequest('User with this email is here'))
      // const role = 'USER'

      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({ email, password: hashPassword })

      const basket = await Basket.create({ userId: user.id })
      const token = generateJwt(user.id, user.email, user.role)
      const tokenDB = await Token.create({token: token, userId: user.id})
      return res.json({ token })
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ where: { email } })
      if (!user) return next(ApiError.internal('User is not find'))

      const comparePass = bcrypt.compareSync(password, user.password)
      if (!comparePass) return next(ApiError.internal('Password is wrong'))

      const token = generateJwt(user.id, user.email, user.role)
      const tokenDB = await Token.update({token: token}, {where: {userId: user.id}})
      return res.json({ token })

    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async check(req, res, next) {
    const { id } = req.query
    if (!id) return next(ApiError.badRequest('No ID set'))
    res.json(id)

  }
}

export default new UserController()
