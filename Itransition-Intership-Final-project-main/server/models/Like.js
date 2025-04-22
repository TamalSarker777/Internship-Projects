// models/Like.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Template = require("./Template");
const User = require("./User"); // Assuming you have a User model

const Like = sequelize.define(
  "Like",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Relationships
Like.belongsTo(Template, { foreignKey: "template_id" });
Like.belongsTo(User, { foreignKey: "user_id" });

module.exports = Like;
