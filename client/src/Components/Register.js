import { Label, Button, Container, Row, Col, Card, CardBody } from "reactstrap";

import { useState } from "react";

import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../Features/UserSlice";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Register Function
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        name,
        email,
        password,
      };

      const result = await dispatch(registerUser(userData));

      // Success
      if (result.payload) {
        // Save user
        localStorage.setItem("user", JSON.stringify(result.payload));

        alert("Registered Successfully ✅");

        // Go Home
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#eef5f3",
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={5} lg={4}>
          <Card
            style={{
              border: "none",
              borderRadius: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <CardBody className="p-5">
              {/* Title */}
              <div className="text-center mb-4">
                <h1
                  style={{
                    color: "#138d75",
                    fontWeight: "bold",
                  }}
                >
                  StudyBuddy
                </h1>

                <p style={{ color: "#666" }}>
                  Create your account and start sharing skills.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleRegister}>
                <div className="form-group mb-4">
                  <Label>Student Name</Label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    onChange={(e) => setname(e.target.value)}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                <div className="form-group mb-4">
                  <Label>Email</Label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    onChange={(e) => setemail(e.target.value)}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                <div className="form-group mb-4">
                  <Label>Password</Label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    onChange={(e) => setpassword(e.target.value)}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  block
                  style={{
                    backgroundColor: "#138d75",
                    border: "none",
                    padding: "12px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Register
                </Button>
              </form>

              {/* Login Link */}
              <div className="text-center mt-4">
                <p style={{ color: "#666" }}>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{
                      color: "#138d75",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
