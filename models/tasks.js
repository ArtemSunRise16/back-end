"use strict";
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../models/index.js");
const User = require("./user");

class Tasks extends Model {
  static associate() {}
}
Tasks.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
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
    modelName: "Tasks",
  }
);

// Tasks.belongsTo(User, { foreignKey: "userId" });

module.exports = Tasks;
