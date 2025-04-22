const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Form = require("./Form");
const Question = require("./Question");

const Answer = sequelize.define(
  "Answer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Answer.belongsTo(Form, { foreignKey: "form_id", as: "form" });
Answer.belongsTo(Question, { foreignKey: "question_id", as: "question" });

module.exports = Answer;
