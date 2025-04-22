const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Template = require("./Template");

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    question_type: {
      type: DataTypes.ENUM,
      values: ["single-line", "multi-line", "positive-integer", "checkbox"],
      allowNull: false,
      validate: {
        isIn: [["single-line", "multi-line", "positive-integer", "checkbox"]],
      },
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    display_in_table: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Relationships
Question.belongsTo(Template, { foreignKey: "template_id", as: "template" });

module.exports = Question;
