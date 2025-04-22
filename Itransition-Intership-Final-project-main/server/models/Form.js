const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Template = require("./Template");

const Form = sequelize.define(
  "Form",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    submission_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

Form.belongsTo(User, { foreignKey: "user_id", as: "user" });
Form.belongsTo(Template, { foreignKey: "template_id", as: "template" });

module.exports = Form;
