
module.exports = function(connection, Sequelize) {
 
    var LocalUser = connection.define('LocalUser',
    
    // fields
     {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        username: {
            type: Sequelize.STRING,
            notEmpty: true,
            unique: true
        },
 
        password: {
            type: Sequelize.STRING,
            notEmpty: true
        }
     }
    ,
    // options
     {
         classMethods: {
             associate: function(models) {
                 LocalUser.belongsTo(models.User);
             }
         },

         paranoid: true
    }

    );
 
    return LocalUser;
}
