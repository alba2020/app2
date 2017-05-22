
var documentsController = require('../controllers/documentsController.js');

var requireLogin = require('../middleware').requireLogin;
var adminRequiredEx = require('../middleware').adminRequiredEx;

module.exports = (app) => {

    // additional routes for documents

    app.get('/documents/:id/tags', documentsController.listTagsByDocument);

    app.get('/documents/deleted', adminRequiredEx, documentsController.listDeleted);

    app.get('/documents/:id/comments', requireLogin, documentsController.listCommentsByDocument);

}