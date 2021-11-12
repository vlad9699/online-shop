import express from 'express'
import dotenv from 'dotenv'
import DB from './db/db.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import router from './router/index.js'
import errorHandlingMiddleware from './middleware/ErrorHandlingMiddleware.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import cookieSession from 'cookie-session'
import passport from 'passport'

import models from './models/models.js'
import GoogleStrategy from 'passport-google-oauth2'
import { Token, User } from './models/models.js'

// const GoogleStrategy = GoogleStrategyT.Strategy


dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.set('trust proxy', 1)
app.use('/uploads', express.static('uploads'))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandlingMiddleware)

// app.use(
//   session({
//     // keys: 'secret',
//     secret: 'secret213123',
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//       sameSite: 'none',
//       secure: true,
//       maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
//     }
//   }))
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['secret']
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(async (user, done) => {
  console.log('Serialized user...')
  console.log('Serialized', user[0].dataValues.id)
  const id = user[0].dataValues.id
  // console.log(123123132, user.id)
  return done(null, id)
})
passport.deserializeUser(async (id, done) => {
  console.log('Deserializing user...')
  const user = await User.findOne({ where: { id: id }, attributes: { exclude: ['password'] } })
  console.log('NEW USERRR', user)
  return done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
  },
  async function (request, accessToken, refreshToken, profile, done, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    // console.log(request)
    // const user = await User.findOne({ where: { email: done.email } })

    const newUser = {
      email: done.email,
      firstName: done.given_name,
      lastName: done.family_name,
    }

    try {
      let user = await User.findOne({ where: { email: done.email } })
      const token = profile.id_token.split('.')[1]
      if (user) {
        done(null, user)
      } else {
        user = await User.create({ newUser })
        const tokenDB = await Token.create({ token: token, userId: user[0].dataValues.id })

        done(null, user)
      }
    } catch (e) {
      console.log(e)
    }


    const user = await User.findOrCreate({
      where: { email: done.email },
      defaults:
        {
          firstName: done.given_name,
          lastName: done.family_name,
          // googleId: done.id
        },
      attributes:
        { exclude: ['password'] }
    })
    const token = profile.id_token.split('.')[1]
    const tokenDB = await Token.create({ token: token, userId: user[0].dataValues.id })
    const tokenDBUpdate = await Token.update({ token: token }, { where: { userId: user[0].dataValues.id } })
    console.log(11111, token)
    return cb(null, user)
  }
))

app.get('/auth/google',
  passport.authenticate('google', {
      scope:
        ['email', 'profile'],
      prompt: 'select_account'
    }
  ))

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/register',
    successRedirect: 'http://localhost:3000',
    session: true,
    // successRedirect: 'http://localhost:3000/',
  }), (req, res) => {
    // console.log(req.user)
    // res.send(req.user)
  })

app.get('/auth/logout', (req, res) => {
  // res.header('Access-Control-Allow-Credentials', true)

  const { user } = req
  console.log(111, user)
  // res.json({user})
  req.logout()
  // req.session = null
  // console.log(2222,req)

  // req.logOut()
  res.send(true)
})


app.get('/auth/getuser', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', true)
  const { user } = req
  res.json(user)
})

app.get('/', (req, res) => {
  res.send('HEELOOO TEST')
})


const start = async () => {
  try {
    await DB.authenticate()
    // await DB.sync()
    app.listen(PORT, () => {
      console.log(`SERVER WORK ON PORT ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()



