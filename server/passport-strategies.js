'use strict'

const passport = require('passport')
const { Strategy } = require('passport-local')
const { compare } = require('bcrypt')

const User = require('../models/user')

passport.serializeUser((email, done) => done(null, email.id))
passport.deserializeUser((_id, done) =>  User.findOne({ _id }, done))

passport.use(new Strategy({
		usernameField: 'email',
		passwordField: 'password'
	},
  function(email, password, done) {
    User.findOne({ user: email }, function(err, user) {
      if (err) return done(err)
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      compare(password, user.password, function(err, matches) {
      	if (err) {
      		return done(err)
      	}
				if (!matches) {
          return done(null, false, { message: 'Incorrect password'})
        } else {
          return done(null, user);
        }
      })
    });
  }
));