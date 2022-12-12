"use strict";
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../models/index.js");
const Tasks = require("./tasks");

class User extends Model {
  static associate() {}
}

User.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.hasMany(Tasks, { foreignKey: "userId" });

module.exports = User;
