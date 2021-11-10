import express from 'express'
import dotenv from 'dotenv'
import DB from './db/db.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import router from './router/index.js'
import errorHandlingMiddleware from './middleware/ErrorHandlingMiddleware.js'
import passport  from 'passport'
import session from 'express-session'
// import models from './models/models.js'

import GoogleStrategy from 'passport-google-oauth2'

// const GoogleStrategy = GoogleStrategyT.Strategy


dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(fileUpload({}))
app.use('/api', router)

const GOOGLE_CALLBACK_URL = '/auth/google/callback'





app.use(session({secret: "secret", resave: true, saveUnitialized: true}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  return done(null, user)
})

passport.deserializeUser((user, done) => {
  return done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return cb(null, profile)
    // return console.log(done.id)
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
  ));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    failureRedirect: 'http://localhost:3000/register'
  }), (req,res) => {
    console.log(req.user)
    // console.log(123, res)
    res.redirect('http://localhost:3000/')
  });

app.get('/', (req, res) => {
  res.send('HEELOOO TEST')
})



// app.use(errorHandlingMiddleware)

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



