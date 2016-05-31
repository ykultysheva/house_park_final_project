'use strict';
module.exports = function(sequelize, DataTypes) {
  var Houses = sequelize.define('Houses', {
    address: DataTypes.STRING,
    description: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Houses;
};
