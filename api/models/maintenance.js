'use strict';
module.exports = function(sequelize, DataTypes) {
  var Maintenance = sequelize.define('Maintenance', {
    photo: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    date: DataTypes.DATE,
    house_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Maintenance;
};