import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiDeleteBinFill } from "react-icons/ri";

function Profile() {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");

  const [myTemplate, setMyTemplate] = useState([]);
  const [selectedTemplates, setSelectedTemplates] = useState([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchLatestTemplates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getIndividualTemplates/${id}`
        );
        setMyTemplate(response.data);
      } catch (error) {
        console.error("Error fetching latest templates:", error);
      }
    };

    fetchLatestTemplates();
  }, [id]);

  const handleCheckboxChange = (templateId) => {
    setSelectedTemplates((prevSelected) => {
      if (prevSelected.includes(templateId)) {
        return prevSelected.filter((id) => id !== templateId);
      } else {
        return [...prevSelected, templateId];
      }
    });
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (selectedTemplates.length > 0) {
      try {
        await axios.delete("http://localhost:5000/deleteTemplates", {
          data: { templateIds: selectedTemplates },
          headers: { authorization: `Bearer ${token}` },
        });
        setMyTemplate((prevTemplates) =>
          prevTemplates.filter(
            (template) => !selectedTemplates.includes(template.id)
          )
        );

        setSelectedTemplates([]);
      } catch (error) {
        console.error("Error deleting templates:", error);
      }
    }
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
      <div>
        <h1>Welcome, {username}</h1>
        <br />

        <div className="container mt-5">
          <div>
            <Button
              className="btn btn-danger mx-2"
              onClick={handleDelete}
              disabled={selectedTemplates.length === 0}
            >
              <RiDeleteBinFill />
            </Button>
          </div>
          <br />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{ backgroundColor: "green" }}>
                  <BsCheckCircleFill />
                </th>
                <th style={{ backgroundColor: "black", color: "white" }}>
                  Template Name
                </th>
                <th style={{ backgroundColor: "black", color: "white" }}>
                  Description
                </th>
                <th style={{ backgroundColor: "black", color: "white" }}>
                  Created AT
                </th>
              </tr>
            </thead>
            <tbody>
              {myTemplate.map((template) => (
                <tr key={template.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedTemplates.includes(template.id)}
                      onChange={() => handleCheckboxChange(template.id)}
                    />
                  </td>
                  <td>{template.title}</td>
                  <td>{template.description}</td>
                  <td>{new Date(template.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Profile;
