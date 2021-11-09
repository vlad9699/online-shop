import jwt from 'jsonwebtoken'

export const checkToken = () => {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') return next()

    try {
      const token = req.headers.authorization

      if (!token) return res.status(203).json({status: true})

      const decode = jwt.verify(token, process.env.SECRET_KEY)

      req.user = decode
      next()
    } catch (e) {
      res.status(401).json({ message: 'You aren`t registered. Please register' })
    }
  }
}

export default checkToken
