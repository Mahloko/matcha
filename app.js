import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

//  routes
import routes from './src/routes/index';
// import routeToLogin from './src/routes/login';
// import routeToRegister from './src/routes/register';

const app = express();

// letting express know the packages being used
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set EJS as a templating engine
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');


app.use('/', routes);
// app.use('/login', routeToLogin);
// app.use('/register', routeToRegister);

module.exports = app;
