
const express = require('express');
const router = express.Router();

const db = require('../../models')
const User = db.User;
const Todo = db.Todo;

// (頁面)詳細資料
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(err => console.log(err))
})

module.exports = router; // 匯出設定的express路由器
