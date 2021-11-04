import jwt from 'jsonwebtoken'
import ApiError from '../error/ApiError.js'

export const checkRole = (role) => {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') return next()

    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) return res.status(401).json({ message: 'not registered' })

      const decode = jwt.verify(token, process.env.SECRET_KEY)
      console.log(decode)

      if (decode.role !== role) return res.status(403).json({ message: 'You dont have ACCESS' })
      req.user = decode
      next()
    } catch (e) {
      res.status(401).json({ message: 'not registered' })
    }
  }
}

export default checkRole
