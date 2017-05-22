
module.exports = (connection, Sequelize) => {

    var Comment = connection.define('Comment', {

            text: {
                type: Sequelize.TEXT,
            }

        },
        // options
        {
             classMethods: {
                 associate: function(models) {
                     Comment.belongsToMany(models.Document, {through: 'DocumentComments'});
                     Comment.belongsTo( models.User, { as: 'creator'} );
                 }
             },

            paranoid: true
        }

    );

    return Comment;
}