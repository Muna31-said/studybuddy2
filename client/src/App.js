import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import UpdateSkill from "./Components/UpdateSkill";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row } from "reactstrap";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import AddSkill from "./Components/AddSkill";
import Skills from "./Components/Skills";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Requests from "./Components/Requests";
import About from "./Components/About";

function AppContent() {
  const location = useLocation();

  // إخفاء الهيدر في صفحات تسجيل الدخول
  const hideHeader =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {/* Header */}
      {!hideHeader && (
        <Row>
          <Header />
        </Row>
      )}

      {/* Main Content */}
      <Row className="main">
        <Routes>
          {/* أول صفحة */}
          <Route path="/" element={<Login />} />
          {/* Login */}
          <Route path="/login" element={<Login />} />
          {/* Register */}
          <Route path="/register" element={<Register />} />
          {/* Home */}
          <Route path="/home" element={<Home />} />
          {/* Skills */}
          <Route path="/skills" element={<Skills />} />
          {/* Add Skill */}
          <Route path="/add" element={<AddSkill />} />
          {/* Requests */}
          <Route path="/request" element={<Requests />} />
          <Route path="/update/:id" element={<UpdateSkill />} />
          //test
          <Route path="about" element={<About />} />
        </Routes>
      </Row>

      {/* Footer */}
      <Row>
        <Footer />
      </Row>
    </>
  );
}

function App() {
  return (
    <Container fluid>
      <Router>
        <AppContent />
      </Router>
    </Container>
  );
}

export default App;
