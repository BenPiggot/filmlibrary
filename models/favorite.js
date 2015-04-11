"use strict";
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define("favorite", {
    imdbID: DataTypes.STRING,
    Title: DataTypes.STRING,
    Year: DataTypes.STRING,
    Director: DataTypes.STRING,
    imdbRating: DataTypes.FLOAT,
    Metascore: DataTypes.FLOAT,
    tomatoMeter: DataTypes.FLOAT,
    plot: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        models.favorite.hasMany(models.comment)
        // associations can be defined here
      }
    }
  });
  return favorite;
};