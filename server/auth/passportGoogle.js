// import passport from 'passport'
// import GoogleStrategy from 'passport-google-oauth2'
//
//   const GOOGLE_CALLBACK_URL = 'http://localhost:3000/register/google/callback1'
//
//   passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: GOOGLE_CALLBACK_URL,
//     passReqToCallback: true
//   }, async (req, accessToken, refreshToken, profile, cb) => {
//
//     const defaultUser = {
//       fullName: `${profile.name.givenName} ${prifile.name.familyName}`,
//       email: prifile.emails[0].value,
//       picture: profile.photos[0].value,
//       id: profile.id
//     }
//   }))
