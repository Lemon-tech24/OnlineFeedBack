require('dotenv').config
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const GOOGLE_CLIENT_ID = process.env.clientID;
const GOOGLE_CLIENT_SECRET = process.env.clientS;


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile)
  }
));

passport.serializeUser((user,done)=>{
  console.log(user)
    done(null, user)
})

passport.deserializeUser((user,done)=>{
    done(null, user)
})
