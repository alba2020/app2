module.exports = (epilogue, models) => {

    var commentResource = epilogue.resource({
        model: models.Comment,
        endpoints: ['/comments', '/comments/:id']
    })

    commentResource.all.auth(require('../middleware').resourceRequiresLogin);

    return commentResource;
}
