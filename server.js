const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser')
const env = require('dotenv').load();
const epilogue = require('epilogue');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'faceroll',
    resave: true,
    saveUninitialized: true
}));

app.use(require('./app/middleware').setUser);

//Models
var models = require("./app/models");

//Routes
var authRoutes = require('./app/routes/authRoutes')(app);
var usersRoutes = require('./app/routes/usersRoutes')(app);
var documentsRoutes = require('./app/routes/documentsRoutes.js')(app);
var commentsRoutes = require('./app/routes/commentsRoutes.js')(app);
var tagsRoutes = require('./app/routes/tagsRoutes.js')(app);
// var todosRoute = require('./app/routes/todos.js')(app);

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: models.sequelize
});

// Create REST resources
var documentResource = require('./app/resources/documentResource')(epilogue, models);
var tagResource =      require('./app/resources/tagResource')(epilogue, models);
var userResource =     require('./app/resources/userResource')(epilogue, models);
var commentResource =  require('./app/resources/commentResource')(epilogue, models);

//Sync Database
models.sequelize.sync({
    force: true
}).then(function () {
    console.log('Database sync ok')
    return require('./seed')(models);
}).catch((err) => {
    console.log(err, "Database sync error")
}).catch(e => console.log(e));

app.listen(3000, (err) => {
    if (!err)
        console.log("Application is running");
    else console.log(err)
});
