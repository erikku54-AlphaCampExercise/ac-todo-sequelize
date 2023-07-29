
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
router.post('/login', passport.authenticate('local',
  { failureRedirect: '/users/login' }), (req, res) => {
  req.flash('success_msg', '登入成功！');
  return res.redirect('/');
})

// (頁面)註冊
router.get('/register', (req, res) => {

  return res.render('register');
})

// (功能)註冊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const errors = [];

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位皆為必填！' });
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' });
  }

  if (errors.length !== 0) {
    return res.render('register', { errors });
  }

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

  req.logout(err => {
    if (err) {
      req.flash('warning_msg', '登出失敗！');
      return res.redirect('/');
    }

    req.flash('success_msg', '登出成功！');
    return res.redirect('/users/login');
  })
})


module.exports = router; // 匯出設定的express路由器
