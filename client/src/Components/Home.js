import { Button, Container, Row, Col, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#f4fffb",
        minHeight: "100vh",
        paddingTop: "100px",
      }}
    >
      <Container>
        {/* 🔥 HERO */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "750px",
            margin: "auto",
            marginBottom: "70px",
          }}
        >
          <h1
            style={{
              fontWeight: "800",
              fontSize: "48px",
              color: "#d6b923",
              letterSpacing: "1px",
            }}
          >
            Learn , Share and Grow.
          </h1>

          <p
            style={{
              color: "#444",
              marginTop: "20px",
              lineHeight: "1.8",
              fontSize: "22px",
            }}
          >
            StudyBuddy connects students to share skills, collaborate, and learn
            together in a simple and interactive environment.
          </p>

          <p
            style={{
              color: "#666",
              marginTop: "10px",
              fontSize: "16px",
            }}
          >
            Add your skills, request help, and manage everything in one place.
          </p>

          {/* 🔥 BUTTON */}
          <Button
            style={{
              background: "linear-gradient(135deg, #055847, #1abc9c)",
              border: "none",
              padding: "16px 50px",
              borderRadius: "12px",
              marginTop: "30px",
              fontSize: "18px",
              fontWeight: "600",
              boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
            }}
            onMouseEnter={(e) =>
              (e.target.style.background =
                "linear-gradient(135deg, #138d75, #16a085)")
            }
            onMouseLeave={(e) =>
              (e.target.style.background =
                "linear-gradient(135deg, #16a085, #1abc9c)")
            }
            onClick={() => navigate("/skills")}
          >
            <span style={{ color: "#ffffff", fontWeight: "bold" }}>
              Get Started 🚀
            </span>
          </Button>
        </div>

        {/* 🔥 FEATURES */}
        <Row>
          {/* Card 1 */}
          <Col md="4" sm="12" style={{ marginBottom: "25px" }}>
            <Card style={cardStyle}>
              <CardBody>
                <h4 style={titleStyle}>📝 Share Skills</h4>
                <p style={textStyle}>
                  Add your skills and help others learn from your knowledge and
                  experience.
                </p>
              </CardBody>
            </Card>
          </Col>

          {/* Card 2 */}
          <Col md="4" sm="12" style={{ marginBottom: "25px" }}>
            <Card style={cardStyle}>
              <CardBody>
                <h4 style={titleStyle}>👋 Request Help</h4>
                <p style={textStyle}>
                  Explore available skills and connect with students who can
                  support you.
                </p>
              </CardBody>
            </Card>
          </Col>

          {/* Card 3 */}
          <Col md="4" sm="12" style={{ marginBottom: "25px" }}>
            <Card style={cardStyle}>
              <CardBody>
                <h4 style={titleStyle}>✍️ Manage Requests</h4>
                <p style={textStyle}>
                  Track your requests and respond to others easily from one
                  place.
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

/* 🔥 Styles */

const cardStyle = {
  borderRadius: "18px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  border: "none",
  padding: "25px",
  textAlign: "center",
  transition: "0.3s",
};

const titleStyle = {
  color: "#16a085",
  fontWeight: "700",
  fontSize: "20px",
};

const textStyle = {
  color: "#555",
  marginTop: "12px",
  fontSize: "15px",
  lineHeight: "1.6",
};

export default Home;
