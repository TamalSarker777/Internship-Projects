import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";

function Home() {
  const [name, setName] = useState("");
  const [latestTemplates, setLatestTemplates] = useState([]); // State for latest templates
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleProfile = () => {
    navigate("/profile");
  };

  const populars = [
    { title: "popular 1", subtitle: "Subtitle 1", text: "Content 1" },
    { title: "popular 2", subtitle: "Subtitle 2", text: "Content 2" },
    { title: "popular 3", subtitle: "Subtitle 3", text: "Content 3" },
    { title: "popular 4", subtitle: "Subtitle 4", text: "Content 4" },
    { title: "popular 5", subtitle: "Subtitle 5", text: "Content 5" },
    { title: "popular 6", subtitle: "Subtitle 6", text: "Content 6" },
  ];
  const tags = [
    { label: "Quiz", path: "/quiz" },
    { label: "Job", path: "/job" },
    { label: "Test", path: "/test" },
    { label: "Application", path: "/application" },
    { label: "Education", path: "/education" },
    { label: "Survey", path: "/survey" },
  ];

  // Fetch the latest templates from the backend
  useEffect(() => {
    const fetchLatestTemplates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/LatestTemplates"
        );
        setLatestTemplates(response.data);
      } catch (error) {
        console.error("Error fetching latest templates:", error);
      }
    };

    fetchLatestTemplates();
  }, []);

  return (
    <>
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
                  className="justify-content-end"
                  variant="primary"
                  onClick={handleLogin}
                >
                  login
                </Button>

                <Button
                  className="justify-content-end mx-2"
                  variant="primary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Button
                  className="justify-content-end mx-2"
                  variant="primary"
                  onClick={handleProfile}
                >
                  Profile
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div
        style={{
          backgroundColor: "#1d667a",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        <Container>
          <Row style={{ color: "white", textAlign: "center" }}>
            <h2>Latest Templates</h2>

            {/* Create Template Card */}
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card
                style={{ width: "100%", cursor: "pointer" }}
                onClick={() => navigate("/create-template")}
              >
                <Card.Body style={{ backgroundColor: "#0db2c3" }}>
                  <Card.Title>Create Custom Template</Card.Title>
                  <Card.Text>Click here to create a new template</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {latestTemplates.length > 0 ? (
              latestTemplates.map((template, index) => (
                <Col key={index} xs={12} sm={6} md={4} className="mb-4">
                  <Card style={{ width: "100%" }}>
                    <Card.Body>
                      <Card.Title>{template.title}</Card.Title>
                      <Card.Text>{template.description}</Card.Text>

                      <Card.Link
                        href={`/template/${template.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        View Template
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No templates available</p>
            )}
          </Row>
        </Container>
      </div>

      {/* Popular Templates Section */}
      <div
        style={{
          backgroundColor: "#2d4a5e",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        <Container>
          <Row style={{ color: "white" }}>
            <h2 style={{ textAlign: "center" }}>Most Popular Templates</h2>
            {populars.map((template, index) => (
              <Col key={index} xs={12} sm={6} md={4} className="mb-4">
                <Card style={{ width: "100%" }}>
                  <Card.Body>
                    <Card.Title>{template.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {template.subtitle}
                    </Card.Subtitle>
                    <Card.Text>{template.text}</Card.Text>
                    <Card.Link href="#" style={{ textDecoration: "none" }}>
                      View
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Tag Cloud Section */}
      <div
        style={{
          backgroundColor: "#444444",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        <Container>
          <Row style={{ color: "white", textAlign: "center" }}>
            <h2>Tag Cloud</h2>
            <Col>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {tags.map((tag, index) => (
                  <Button
                    key={index}
                    variant="light"
                    style={{ padding: "10px 20px", fontSize: "16px" }}
                    onClick={() => navigate(tag.path)} // Navigate to the specified path
                  >
                    {tag.label}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
