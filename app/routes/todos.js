
var todosController = require('../controllers/todoscontroller.js');
 
module.exports = (app) => {

    app.get('/todos', todosController.list);

    // app.post('/todos', todosController.create);
    // app.get('/todos/:id', todosController.read);
    // app.put('/todos/:id', todosController.update);
    // app.delete('/todos/:id', todosController.delete);


    // router.use(function timeLog (req, res, next) {
    //     console.log('Time: ', Date.now())
    //     next()
    // })

    // router.get('/', function (req, res) {
    //     res.send('Birds home page')
    // })

    // router.use('/', function(req, res, next) {
    //     console.log('=====================================', res.body);
    //     next();
    // });

    // return router;
}
