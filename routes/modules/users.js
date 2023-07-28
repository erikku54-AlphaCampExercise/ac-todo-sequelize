
const express = require('express');
const router = express.Router();

const passport = require('passport');
const bcrypt = require('bcryptjs');

const db = require('../../models')
const User = db.User;

// (頁面)登入
router.get('/login', (req, res) => {
  return res.render('login');
})

// (功能)登入
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// (頁面)註冊
router.get('/register', (req, res) => {

  return res.render('register');
})

// (功能)註冊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  User.findOne({ where: { email } })
    .then(user => {

      if (user) {
        console.log('User already exists')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }

      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ 
          name,
          email,
          password: hash
        }))
        .then(user => res.redirect('/'))
        .catch(err => console.log(err));
    })

})

// (功能)登出
router.get('/logout', (req, res) => {
  return res.send('logout');
})


module.exports = router; // 匯出設定的express路由器
