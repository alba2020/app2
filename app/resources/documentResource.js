
module.exports = (epilogue, models) => {
    var documentResource = epilogue.resource({
        model: models.Document,
        endpoints: ['/documents', '/documents/:id']
    })

    // documentResource.list.auth(function (req, res, context) {
    //     if( !(req.user && req.user.isAdmin) ) {
    //         return context.error(403, "forbidden");
    //     }
    //     return context.continue;
    // });

    documentResource.update.auth((req, res, context) => {
        if (req.user && req.user.isAdmin) {
            return context.continue;
        }

        return models.Document.findById(req.params.id)
            .then(doc => {
                if (doc) {
                    if (req.user && doc.creatorId === req.user.id) {
                        return context.continue;
                    } else {
                        return res.status(403).send('not authorized');
                    }
                } else {
                    return res.status(404).send('not found');
                }
            });
    });

    documentResource.all.send.before((req, res, context) => {
        // console.log('----------- hook ---------')
        // console.log(res.body);
        // console.log(res);
        return models.DocumentView.create({
            DocumentId: req.params.id,
            creatorId: req.user.id
        }).then(view => {

            return context.continue;

            // var currentDoc = null;
            // models.Document.findById(req.params.id).then(doc => {
            //     if(!doc) 
            //         return context.continue;
            //     currentDoc = doc;
            //     models.User.findById(req.user.id).then(user => {
            //         currentDoc.addViewer(user);
            //         return context.continue;
            //     })
            // })
        });
    });

    documentResource.all.auth(require('../middleware').resourceRequiresLogin);
    return documentResource;

}