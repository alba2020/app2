
var models = require('../models');

var exports = module.exports = {}

exports.listTagsByDocument = (req, res) => {
    models.Document.findById(req.params.id)
        .then(doc => {
            if(doc)
                //return res.json(doc.getTags());
                return doc.getTags().then(tags => {
                    return res.json(tags);
                })
            else
                return res.status(404).send('not found');
        })
        .catch(e => {
            res.send('error');
        });
}

exports.listCommentsByDocument = (req, res) => {
    models.Document.findById(req.params.id)
        .then(doc => {
            if(doc)
                return doc.getComments().then(comments => {
                    return res.json(comments);
                })
            else
                return res.status(404).send('not found');
        })
        .catch(e => {
            res.send('error');
        });
}

exports.listDeleted = (req, res) => {
    models.Document.findAll({
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

exports.addTag = (req, res) => {

    return models.Document.findById(req.params.id)
    .then (doc => {
        return models.Tag.create(req.body)
        .then(tag => {
            return doc.addTag(tag)
            .then(() => {
                return res.json(tag);
            });
        });
    }).catch(e => console.log(e));
}