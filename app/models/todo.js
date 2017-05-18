
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define('Todo',
    {
      title: DataTypes.STRING,
      complete: { 
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    
    // options
     {
       classMethods: {
         associate: function(models) {
           Todo.belongsTo(models.User);
         }
       }
     }

  );
  // doesn't work because of modules load order
  // var models = require("../models");
  // console.log(models.User);
//  Todo.belongsTo(models.User);

  return Todo;
};
