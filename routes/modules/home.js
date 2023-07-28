
const express = require('express');
const router = express.Router();

const db = require('../../models')
const Todo = db.Todo;
const User = db.User;


// (頁面)首頁
router.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  }).then(todos => {
    // console.log(todos);
    return res.render('index', { todos })
  })
    .catch(err => res.status(422).json(err))
})

module.exports = router; // 匯出設定的express路由器
