const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Template = require("./Template");

// Tag Model
const Tag = sequelize.define(
  "Tag",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const TagTemplate = sequelize.define("TagTemplate", {}, { timestamps: false });

Template.belongsToMany(Tag, {
  through: TagTemplate,
  foreignKey: "template_id",
});
Tag.belongsToMany(Template, { through: TagTemplate, foreignKey: "tag_id" });

module.exports = { Tag, TagTemplate };
