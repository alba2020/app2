
const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser')
const env = require('dotenv').load();
const epilogue = require('epilogue');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({
    extended: true
}));
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

var commentsRoutes = require('./app/routes/commentsRoutes.js')(app);
var tagsRoutes = require('./app/routes/tagsRoutes.js')(app);

//var todosRoute = require('./app/routes/todos.js')(app);

app.use(addViewsCount);
var documentsRoutes = require('./app/routes/documentsRoutes.js')(app);

function addViewsCount(req, res, next) {
    // var oldSend = res.send;
    var oldJson = res.json;

    // res.send = function(data){
    //     // arguments[0] (or `data`) contains the response body
    //     arguments[0] = "modified : " + arguments[0];
    //     oldSend.apply(res, arguments);
    // }

    res.json = function (data) {

        // if (arguments[0].push) { }
        // if (req.params.id) {
        //     arguments[0].push({
        //         'views': 'req.params.id'
        //     })
        // }

        if (req.params.id) {
            models.DocumentView.count({
                    where: {
                        DocumentId: req.params.id
                    }
                })
                .then(c => {
                    if (arguments[0].dataValues) {
                        arguments[0].dataValues['views'] = c;
                    }

                oldJson.apply(res, arguments);
                });
        } else {
            oldJson.apply(res, arguments);
        }
        

    }
    next();
}


//app.use('/todos', todosRoute);

// Initialize epilogue
epilogue.initialize({
    app: app,
    sequelize: models.sequelize
});

// Create REST resources
var documentResource = require('./app/resources/documentResource')(epilogue, models);
var tagResource = require('./app/resources/tagResource')(epilogue, models);
var userResource = require('./app/resources/userResource')(epilogue, models);
var commentResource = require('./app/resources/commentResource')(epilogue, models);

//Sync Database
models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => {
        return models.sequelize.sync({
            force: true
        })
    })
    .then(() => {
        return models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
    })
    .then(function () {
        console.log('Database synchronised')
        return require('./seed')(models);
    }).catch((err) => {
        console.log(err, "Database seed error")
    }).catch(e => console.log(e));

app.listen(3000, (err) => {
    if (!err)
        console.log("Application is running");
    else console.log(err)
});