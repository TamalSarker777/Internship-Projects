const { Sequelize } = require("sequelize");

// Connect to MySQL database
const sequelize = new Sequelize("final_project", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established successfully.");
  })
  .catch((error) => {
    console.error("Cannot connect to the database:", error);
  });

module.exports = sequelize;
