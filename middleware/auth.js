
// 將用戶狀態檢查做成中介軟體型態

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('warning_msg', '請先登入再繼續使用！');
  res.redirect('/users/login');
}
