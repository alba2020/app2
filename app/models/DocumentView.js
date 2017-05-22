
module.exports = (connection, Sequelize) => {

    var DocumentView = connection.define('DocumentView', {

            // documentId: Sequelize.INTEGER,

            // creatorId: Sequelize.INTEGER

        },

        // options
        {
            classMethods: {
                associate: function (models) {
                    DocumentView.belongsTo(models.Document);
                    DocumentView.belongsTo(models.User, { as: 'creator' });
                }
            },

            paranoid: false
        }

    );

    return DocumentView;
}