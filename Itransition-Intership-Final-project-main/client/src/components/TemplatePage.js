import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const TemplatePage = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch(`http://localhost:5000/templates/${id}`);
        const result = await response.json();

        if (response.ok) {
          setTemplate(result);
        } else {
          console.error("Error fetching template:", result.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTemplate();
  }, [id]);

  if (!template) {
    return <div>Error</div>;
  }

  return (
    <div className="container mt-4">
      <h1>{template.title}</h1>
      <h5>Author: {template.author.name}</h5>
      <p>{template.description}</p>

      <h2>Questions</h2>
      {template.questions.length > 0 ? (
        <ul className="list-group mb-4">
          {template.questions.map((question) => (
            <li key={question.id} className="list-group-item">
              <strong>{question.question_text}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions added yet. Add one...</p>
      )}

      <h2>Comments</h2>
      {template.comments.length > 0 ? (
        <ul className="list-group mb-4">
          {template.comments.map((comment) => (
            <li key={comment.id} className="list-group-item">
              <strong>{comment.user.name}: </strong>
              {comment.comment_text}{" "}
              <em>({new Date(comment.created_at).toLocaleString()})</em>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments added yet. Add one...</p>
      )}
    </div>
  );
};

export default TemplatePage;
