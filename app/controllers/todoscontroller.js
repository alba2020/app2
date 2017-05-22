var Controller = require('./Controller');

class TodosController extends Controller {

    // constructor(model) {
    //     super(model);
    // }
  
}

module.exports = new TodosController(require('../models').Todo);

// var exports = module.exports = {}

// exports.list = (req, res) => {
//     models.Todo.findAll({})
//         .then(todos => res.json(todos));
// }

// exports.create = (req, res) => {
//     console.log(req.body);
//     models.Todo.create(
//     // {
//     //     title: req.body.title,
//     //     UserId: req.body.user_id
//     // }
//     req.body
//     )
//     .then((todo) => {
//         res.json(todo);
//     });
// }

// exports.read = (req, res) => {
//     models.Todo.find({
//         where: {
//             id: req.params.id
//         }
//     }).then(function (todo) {
//         res.json(todo);
//     });
// }

// exports.update = (req, res) => {
//     models.Todo.find({
//         where: {
//             id: req.params.id
//         }
//     }).then(function (todo) {
//         if (todo) {
//             todo.updateAttributes({
//                 title: req.body.title,
//                 complete: req.body.complete
//             }).then(function (todo) {
//                 res.send(todo);
//             });
//         }
//     });
// }

// exports.delete = (req, res) => {
//     models.Todo.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(function(todo) {
//         res.json(todo);
//     });
// }
