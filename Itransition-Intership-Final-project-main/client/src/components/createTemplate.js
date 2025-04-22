import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";

const TemplatePage = () => {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();
  // const userId = 10;

  const [template, setTemplate] = useState({
    title: "",
    description: "",
    questions: [],
    comments: [],
    like: false,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    axios
      .get("http://localhost:5000/profilePage", {
        headers: { authorization: `Bearer ${token}` }, // Bearer token format
      })
      .then((response) => {
        setUsername(response.data.username);
        setId(response.data.id);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionType, setNewQuestionType] = useState("text");
  const [newComment, setNewComment] = useState("");
  const [like, setLike] = useState(false);

  // Handle title and description changes
  const handleTitleChange = (e) => {
    setTemplate({ ...template, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setTemplate({ ...template, description: e.target.value });
  };

  // handle adding a new question
  const handleAddQuestion = () => {
    if (newQuestionTitle.trim()) {
      const newQuestion = {
        id: template.questions.length + 1,
        title: newQuestionTitle,
        type: newQuestionType,
      };
      setTemplate({
        ...template,
        questions: [...template.questions, newQuestion],
      });
      setNewQuestionTitle("");
    }
  };

  // saving the template to the database
  const handleSaveTemplate = async () => {
    try {
      const response = await fetch("http://localhost:5000/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: template.title,
          description: template.description,
          questions: template.questions,
          comments: template.comments,
          author_id: id,
          like: like ? 1 : 0,
        }),
      });

      const result = await response.json(); // Parse JSON response
      console.log("Response from server:", result);

      if (response.ok) {
        console.log("Template saved:", result);
        navigate("/");
      } else {
        console.error("Failed to save template:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  // handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: template.comments.length + 1,
        text: newComment,
      };
      setTemplate({
        ...template,
        comments: [...template.comments, newCommentObj],
      });
      setNewComment("");
    }
  };

  const handleLikeClick = () => {
    setLike(!like);
  };

  return (
    <>
      <div>
        <div style={{ backgroundColor: "#1d667a" }}>
          <Navbar expand="lg" className="bg-secondary">
            <Container fluid>
              <Navbar.Brand href="/" style={{ color: "white" }}>
                <strong>Itransition Forms</strong>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0" navbarScroll></Nav>

                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success" className="bg-dark mx-2">
                    Search
                  </Button>

                  <Button
                    className="justify-content-end mx-2"
                    variant="primary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>

      <div className="container mt-4">
        <h2>Add a Template</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Template title"
            value={template.title}
            onChange={handleTitleChange}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Template description"
            rows="3"
            value={template.description}
            onChange={handleDescriptionChange}
          />
        </div>

        {template.title && (
          <>
            <h1>{template.title}</h1>
            <p>{template.description}</p>

            <h2>Questions</h2>
            {template.questions.length > 0 ? (
              <ul className="list-group mb-4">
                {template.questions.map((question) => (
                  <li key={question.id} className="list-group-item">
                    <strong>{question.title}</strong>
                    <input
                      type={question.type}
                      className="form-control mt-2"
                      placeholder={`Enter your answer`}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No questions added yet.</p>
            )}

            <h3>Add a Question</h3>
            <div className="mb-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Question title"
                value={newQuestionTitle}
                onChange={(e) => setNewQuestionTitle(e.target.value)}
              />
              <select
                className="form-select mb-2"
                value={newQuestionType}
                onChange={(e) => setNewQuestionType(e.target.value)}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
              </select>
              <button className="btn btn-success" onClick={handleAddQuestion}>
                Add a Question
              </button>
            </div>

            <h2>Comments</h2>
            {template.comments.length > 0 ? (
              <ul className="list-group mb-4">
                {template.comments.map((comment) => (
                  <li key={comment.id} className="list-group-item">
                    {comment.text}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments added yet.</p>
            )}

            <h3>Add a Comment</h3>
            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder="Write your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button className="btn btn-primary" onClick={handleAddComment}>
              Submit Comment
            </button>

            <div className="mt-3">
              <button
                className={`btn ${
                  like ? "btn-success" : "btn-outline-success"
                }`}
                onClick={handleLikeClick}
              >
                {like ? "Liked" : "Like"}
              </button>
            </div>

            <button
              className="btn btn-primary mt-3"
              onClick={handleSaveTemplate}
            >
              Save Template
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default TemplatePage;
