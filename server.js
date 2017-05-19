const express = require('express');
var app = express();

const session = require('express-session')
const bodyParser = require('body-parser')
const env = require('dotenv').load();
const exphbs = require('express-handlebars')

const epilogue = require('epilogue');


//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({
    secret: 'faceroll',
    resave: true,
    saveUninitialized: true
})); // session secret

var setUserMiddleware = require('./app/middleware').setUser;
app.use(setUserMiddleware);

//For Handlebars
// app.set('views', './app/views')
// app.engine('hbs', exphbs({
//     extname: '.hbs'
// }));
// app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.send('Welcome to Passport with Sequelize');
});

//Models
var models = require("./app/models");

//Routes
var authRoutes = require('./app/routes/authRoutes')(app);
var usersRoutes = require('./app/routes/usersRoutes')(app);

var todosRoute = require('./app/routes/todos.js')(app);

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: models.sequelize
});

// Create REST resource
var documentResource = epilogue.resource({
  model: models.Document,
  endpoints: ['/documents', '/documents/:id']
});

var tagResource = epilogue.resource({
    model: models.Tag,
    engpoints: ['/tags', '/tag/:/id']
});


//Sync Database
models.sequelize.sync({
    force: true
}).then(function () {
    console.log('Database sync ok')
    // seeding db
    return require('./seed')(models);
}).catch((err) => {
    console.log(err, "Database sync error")
}).then(() => {
    // console.log('1111111111111')
    // return models.LocalUser.findOne({
    //     where: {
    //         username: 'paul'
    //     },
    //     include: [models.User]
    // }).then(localUser => {
    //     if (localUser) {
    //         console.log('user found')
    //         console.log('username: ', localUser.username);
    //         console.log('fullname: ', localUser.User.fullname);
    //     } else {
    //         console.log('user not found')
    //     }
    // })
}).catch(e => console.log(e));

app.listen(3000, (err) => {
    if (!err)
        console.log("Site is live");
    else console.log(err)
});