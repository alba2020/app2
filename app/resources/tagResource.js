module.exports = (epilogue, models) => {
    var tagResource = epilogue.resource({
        model: models.Tag,
        engpoints: ['/tags', '/tag/:/id']
    });

    // allow update to admin and owner
    tagResource.update.auth((req, res, context) => {
        if (req.user && req.user.isAdmin) {
            return context.continue;
        }

        return models.Tag.findById(req.params.id)
            .then(tag => {
                if (tag) {
                    if (req.user && tag.creatorId === req.user.id) {
                        return context.continue;
                    } else {
                        return res.status(403).send('not authorized');
                    }
                } else {
                    return res.status(404).send('not found');
                }
            });
    });

    tagResource.all.auth(require('../middleware').resourceRequiresLogin);

    return tagResource;
}
