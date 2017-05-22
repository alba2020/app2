
module.exports = (epilogue, models) => {
    var userResource = epilogue.resource({
        model: models.User,
        engpoints: ['/users', '/users/:/id']
    });

    // var ForbiddenError = epilogue.Errors.ForbiddenError;

    userResource.list.auth(require('../middleware').adminRequired);

    userResource.all.auth(require('../middleware').resourceRequiresLogin);
    
    return userResource;
}
