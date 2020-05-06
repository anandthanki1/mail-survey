const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

/* We have to require using below statement and not require models/User directly 
because sometimes while creating unit tests, it will require  
models folder multiple times. So mongoose will assume we are creating model name "users"
mulitple times and as a result will throw error. So we need to use below 
technique to grab schema */
const User = mongoose.model('users');

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if(existingUser) {
                // skip creation
                /* done tells Passport that we are done 
                with creation of User */
                done(null, existingUser);
            } else {
                // create new user
                new User({ googleId: profile.id })
                    .save()
                    .then(user => done(null, user));
            }
        });
}));