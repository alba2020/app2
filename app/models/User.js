
module.exports = (connection, Sequelize) => {

    var User = connection.define('User', {

            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            fullname: {
                type: Sequelize.STRING,
            },

            phone: {
                type: Sequelize.STRING
            },

            bornAt: {
                type: Sequelize.DATE
            },

            isAdmin: {
                type: Sequelize.BOOLEAN,
                default: false
            }

        },
        // options
        {
            classMethods: {
                associate: function (models) {
                    User.hasOne(models.LocalUser);
                    User.hasMany(models.Document, {
                        foreignKey: 'creatorId'
                    });
                    User.hasMany(models.Comment, {
                        foreignKey: 'creatorId'
                    });
                    User.hasMany(models.Tag, {
                        foreignKey: 'creatorId'
                    });
                    User.hasMany(models.DocumentView, { foreignKey: 'creatorId' });
                    // User.belongsToMany(models.Document, {
                    //     as: 'ViewedDocuments',
                    //     through: 'DocumentViews',
                    //     foreignKey: 'creatorId'
                    // });
                    //User.belongsTo(models.Document, {
                        //as: 'avatar',
                        //foreignKey : 'avatarId'
                    //});
                }
            },

            paranoid: true
        }

    );

    return User;

}