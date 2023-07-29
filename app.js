
// environment setting 僅在非正式環境時使用dotenv
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config({ path: './.env' });
// }

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// require handlebars in the project
const exphbs = require('express-handlebars').engine; // <---express-handlebars版本v7

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// setting static files
app.use(express.static('public'));

// setting body-parser
app.use(express.urlencoded({ extended: true }));

// setting session
const session = require('express-session');
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}));

// setting flash
const flash = require('connect-flash');
app.use(flash());

// setting method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// setting passport
const usePassport = require('./config/passport');
usePassport(app)

// setting local variable
app.use((req, res, next) => {

  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.warning_msg = req.flash('warning_msg');

  next();
})

// routes setting
const routes = require('./routes');
app.use(routes);

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
