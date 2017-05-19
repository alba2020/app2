
module.exports = (connection, Sequelize) => {

    var Tag = connection.define('Tag', {
            name: {
                type: Sequelize.STRING,
            },

            rating: {
                type: Sequelize.INTEGER
            }
        },
        // options
        {
             classMethods: {
                 associate: function(models) {
                    Tag.belongsToMany(models.Document, { through: 'DocumentTags' });
                 }
             },

            paranoid: true
        }
    );
    return Tag;
}