
var authController = require('../controllers/authController.js');
 
module.exports = (app) => {

    app.post('/signup', authController.signup);
    app.post('/auth/signup', authController.signup);    
    
    app.post('/login', authController.login);
    app.post('/auth/signin', authController.login);

    app.get('/logout', authController.logout);
    app.delete('/auth/signout', authController.logout);

    app.get('/auth/check', authController.check);
}
