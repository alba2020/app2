
var models = require('../models');

var exports = module.exports = {}

exports.list = (req, res) => {
    models.Todo.findAll({})
        .then(todos => res.json(todos));
}

exports.create = (req, res) => {
    models.Todo.create({
        title: req.body.title,
        UserId: req.body.user_id
    }).then((todo) => {
        res.json(todo);
    });
}

exports.read = (req, res) => {
    models.Todo.find({
        where: {
            id: req.params.id
        }
    }).then(function (todo) {
        res.json(todo);
    });
}

exports.update = (req, res) => {
    models.Todo.find({
        where: {
            id: req.params.id
        }
    }).then(function (todo) {
        if (todo) {
            todo.updateAttributes({
                title: req.body.title,
                complete: req.body.complete
            }).then(function (todo) {
                res.send(todo);
            });
        }
    });
}

exports.delete = (req, res) => {
    models.Todo.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(todo) {
        res.json(todo);
    });
}
