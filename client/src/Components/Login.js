import { Label, Button, Container, Row, Col, Card, CardBody } from "reactstrap";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Features/UserSlice";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users?.user);
  const isSuccess = useSelector((state) => state.users?.isSuccess);

  // Login Function
  const handleLogin = (e) => {
    e.preventDefault();

    try {
      const userData = {
        email,
        password,
      };

      dispatch(login(userData)).then((result) => {
        if (result.payload) {
          localStorage.setItem("user", JSON.stringify(result.payload));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Navigate after successful login
  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
    }
  }, [isSuccess, user, navigate]);

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
                  Login to continue learning and sharing skills.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin}>
                <div className="form-group mb-4">
                  <Label>Email</Label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
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
                    name="password"
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
                  Login
                </Button>
              </form>

              {/* Register Link */}
              <div className="text-center mt-4">
                <p style={{ color: "#666" }}>
                  Don’t have an account?{" "}
                  <Link
                    to="/register"
                    style={{
                      color: "#138d75",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                  >
                    Register here
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

export default Login;
