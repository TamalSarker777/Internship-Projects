const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");
const Template = require("./Template");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

// Relationships
Comment.belongsTo(User, { foreignKey: "user_id", as: "user" });
Comment.belongsTo(Template, { foreignKey: "template_id", as: "template" });

module.exports = Comment;
