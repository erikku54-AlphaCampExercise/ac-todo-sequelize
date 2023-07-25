
const express = require('express');
const router = express.Router();

// (頁面)登入
router.get('/login', (req, res) => {
  return res.render('login');
})

// (功能)登入
router.post('/login', (req, res) => {
  return res.send('login');
})

// (頁面)註冊
router.get('/register', (req, res) => {
  return res.render('register');
})

// (功能)註冊
router.post('/register', (req, res) => {
  return res.send('register');
})

// (功能)登出
router.get('/logout', (req, res) => {
  return res.send('logout');
})


module.exports = router; // 匯出設定的express路由器
