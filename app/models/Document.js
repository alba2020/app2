
module.exports = (connection, Sequelize) => {

    var Document = connection.define('Document', {

            name: {
                type: Sequelize.STRING,
            },

            file: {
                type: Sequelize.BLOB
            },

            size: {
                type: Sequelize.INTEGER
            },

            mime: {
                type: Sequelize.STRING
            }

        },
        // options
        {
             classMethods: {
                 associate: function(models) {
                     Document.belongsToMany(models.Tag, { through: 'DocumentTags' });
                     Document.belongsTo( models.User, { as: 'creator'} );
                     Document.belongsToMany(models.Comment, {through: 'DocumentComments'});
                 }
             },

            paranoid: true
        }

    );

    return Document;
}