
var todosController = require('../controllers/todoscontroller.js');
 
module.exports = (app) => {

    app.get('/todos', todosController.list);
    app.post('/todos', todosController.create);
    app.get('/todos/:id', todosController.read);
    app.put('/todos/:id', todosController.update);
    app.delete('/todos/:id', todosController.delete);
}
