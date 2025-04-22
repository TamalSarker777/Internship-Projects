const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const sequelize = require("./db");
const Template = require("./models/Template");
const Question = require("./models/Question");
const Comment = require("./models/Comment");
const User = require("./models/User");
const Like = require("./models/Like");
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
const SECRET_KEY = "11223344";

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });

app.post("/templates", async (req, res) => {
  try {
    const { title, description, questions, comments, author_id, like } =
      req.body;

    const template = await Template.create({
      title,
      description,
      author_id,
      is_public: false,
    });
    if (like === 1) {
      await Like.create({
        template_id: template.id,
        user_id: author_id,
      });
    }

    const questionTypeMapping = {
      text: "single-line",
      textarea: "multi-line",
      number: "positive-integer",
      checkbox: "checkbox",
    };

    let positionCounter = 1;

    for (const question of questions) {
      const questionType = questionTypeMapping[question.type];

      if (!questionType) {
        return res
          .status(400)
          .json({ message: `The question type is invalid: ${question.type}` });
      }

      //handling question
      await Question.create({
        question_text: question.title,
        question_type: questionType,
        position: positionCounter,
        display_in_table: question.display_in_table || false,
        template_id: template.id,
      });
      positionCounter++;
    }

    // Handlling comments
    if (comments && comments.length > 0) {
      for (const comment of comments) {
        await Comment.create({
          template_id: template.id,
          comment_text: comment.text,
          user_id: author_id,
        });
      }
    }

    res.status(201).json({
      message: "Template created successfully",
      template: template,
    });
  } catch (error) {
    console.error("Error creating template:", error);
    res.status(500).json({ message: "Error creating template" });
  }
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send("This user already exists");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      created_at: new Date(),
    });

    res.status(201).send("The user is registered successfully");
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send("An error occurred during registration");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send("User not found");
    }

    if (user.is_blocked) {
      return res.status(403).send("You are blocked. Sorry, you cannot enter.");
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid password. Try again.");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).send("Error logging in: " + err.message);
  }
});

// profile page
app.get("/profilePage", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);

    User.findByPk(verified.id, {
      attributes: ["id", "username", "email", "role"],
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send("User not found");
        }

        res.json({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        });
      })
      .catch((error) => {
        res.status(500).send("Error reading user data");
      });
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
});

app.get("/templates/:id", async (req, res) => {
  try {
    const templateId = req.params.id;

    const template = await Template.findOne({
      where: { id: templateId },
      include: [
        { model: User, attributes: ["username"], as: "author" },
        {
          model: Comment,
          attributes: ["id", "comment_text", "created_at"],
          include: [{ model: User, attributes: ["username"], as: "user" }],
        },
        {
          model: Question,
          attributes: ["id", "question_text", "question_type"],
        },
        ,
      ],
    });

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json(template);
  } catch (error) {
    console.error("Error fetching template:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/LatestTemplates", async (req, res) => {
  try {
    const latestTemplates = await Template.findAll({
      limit: 5,
      order: [["created_at", "DESC"]],
      attributes: ["id", "title", "description"], // Only select the required fields
    });
    res.json(latestTemplates);
  } catch (error) {
    console.log("Cannot find templates", error);
    res.status(500).json({ error: "Internal error" });
  }
});

app.get("/getIndividualTemplates/:id", async (req, res) => {
  try {
    const authorId = req.params.id;
    const templateInfos = await Template.findAll({
      where: { author_id: authorId },
      attributes: ["id", "title", "description", "created_at"],
    });
    res.json(templateInfos);
  } catch (error) {
    console.log("Cannot find templates", error);
    res.status(500).json({ error: "Internal error" });
  }
});

app.delete("/deleteTemplates", async (req, res) => {
  const { templateIds } = req.body;
  try {
    await Template.destroy({ where: { id: templateIds } });
    res.status(200).send({ message: "Templates deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting templates" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port: 5000");
});
