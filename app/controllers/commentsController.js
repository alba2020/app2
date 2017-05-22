
var models = require('../models');

var exports = module.exports = {}

exports.listDeleted = (req, res) => {
    models.Comment.findAll({
        where: {
            deletedAt: {
                $not: null
            }
        },
        paranoid: false
    }).then(docs => {
        return res.json(docs);
    })
}
