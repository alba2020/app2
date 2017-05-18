
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
                 associate: function(models) {
                     User.hasOne(models.LocalUser);
                 }
             },

            paranoid: true
        }

    );

    return User;

}