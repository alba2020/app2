
var tagsController = require('../controllers/tagsController.js');

var requireLogin = require('../middleware').requireLogin;
var adminRequiredEx = require('../middleware').adminRequiredEx;

module.exports = (app) => {

    // additional routes for comments

    app.get('/tags/:id/documents', tagsController.listDocumentsByTag);
    app.get('/tags/deleted', adminRequiredEx, tagsController.listDeleted);

    app.post('/tags/:id', tagsController.addDocument);
}
