"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("favorites", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      imdbID: {
        type: DataTypes.STRING
      },
      Title: {
        type: DataTypes.STRING
      },
      Year: {
        type: DataTypes.STRING
      },
      Director: {
        type: DataTypes.STRING
      },
      imdbRating: {
        type: DataTypes.FLOAT
      },
      Metascore: {
        type: DataTypes.FLOAT
      },
      tomatoMeter: {
        type: DataTypes.FLOAT
      },
      plot: {
        type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("favorites").done(done);
  }
};