
var commentsController = require('../controllers/commentsController.js');

var requireLogin = require('../middleware').requireLogin;
var adminRequiredEx = require('../middleware').adminRequiredEx;

module.exports = (app) => {

    // additional routes for comments

    app.get('/comments/deleted', adminRequiredEx, commentsController.listDeleted);

}
