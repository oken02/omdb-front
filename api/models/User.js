const { DataTypes, Model } = require("sequelize");

const db = require("../config/db");

class User extends Model {}
User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastActivity: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  { sequelize: db, modelName: "user" }
);

module.exports = User;
