
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.User;


module.exports = app => {

  // initialize
  app.use(passport.initialize());
  app.use(passport.session());

  // strategy
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, { message: 'Email or Password incorrect.' })
            }
            return done(null, user)
          })
      })
      .catch(err => done(err, false));
  }))

  // serialize & deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id);
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => {
        done(null, user.toJSON());
      }).catch(err => done(err, null))
  })
}
