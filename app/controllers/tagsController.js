
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

exports.listDocumentsByTag = (req, res) => {
    models.Tag.findById(req.params.id)
        .then(tag => {
            if (tag)
                return tag.getDocuments().then(documents => {
                    return res.json(documents);
                })
            else
                return res.status(404).send('not found');
        })
        .catch(e => {
            res.send('error');
        });
}

exports.addDocument = (req, res) => {

    return models.Tag.findById(req.params.id)
    .then (tag => {
        return models.Document.create(req.body)
        .then(doc => {
            return tag.addDocument(doc)
            .then(() => {
                return res.json(doc);
            });
        });
    }).catch(e => console.log(e));
}

