const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Adjust path as necessary

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensuring usernames are unique
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensuring emails are unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"), // Example roles
      allowNull: false,
      defaultValue: "user", // Default role
    },
    is_blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false, // Disable default timestamps since we are defining them manually
  }
);

// Export the model
module.exports = User;
