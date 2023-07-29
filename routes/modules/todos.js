
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

// (頁面)修改資料
router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  return Todo.findByPk(id)
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(err => console.log(err))
})

// (功能)修改資料
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const isDone = (req.body.isDone === 'on');

  return Todo.update({ name, isDone, updatedAt: new Date() },
    { where: { id } })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(err => res.send(err));
})

// (功能)刪除資料
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  return Todo.destroy({ where: { id } })
    .then(() => res.redirect('/'))
    .catch(err => res.send(err));
})

module.exports = router; // 匯出設定的express路由器
