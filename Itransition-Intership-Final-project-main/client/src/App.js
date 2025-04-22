import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/login";
import CreateTemplates from "./components/createTemplate";
import TemplatePage from "./components/TemplatePage";
import Profile from "./components/Profile";

// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
// navigate("/login");
function App() {
  return (
    <div>
      {" "}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-template" element={<CreateTemplates />} />
          <Route path="/template/:id" element={<TemplatePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
