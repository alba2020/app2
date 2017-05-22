
var models = require('../models');

var exports = module.exports = {}

exports.listDeleted = (req, res) => {
    models.Tag.findAll({
        where: {
            deletedAt: {
                $not: null
            }
        },
        paranoid: false
    }).then(tags => {
        return res.json(tags);
    })
}
