import { useEffect } from "react";

import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";

import {
  getRequests,
  getSentRequests,
  acceptRequest,
  rejectRequest,
  deleteRequest,
} from "../Features/RequestSlice";

const Requests = () => {
  const dispatch = useDispatch();

  const requests = useSelector((state) => state.request.requests);

  const sentRequests = useSelector((state) => state.request.sentRequests);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getRequests(currentUser._id));

    dispatch(getSentRequests(currentUser._id));
  }, []);

  return (
    <div
      style={{
        background: "#f4fffb",
        minHeight: "100vh",
      }}
    >
      <Container>
        {/* Incoming Requests */}
        <div style={{ padding: "40px 20px" }}>
          <h2
            style={{
              color: "#16a085",
              fontWeight: "700",
            }}
          >
            Incoming Requests
          </h2>

          <p
            style={{
              color: "#666",
              fontSize: "18px",
            }}
          >
            Manage requests sent to your skills.
          </p>
        </div>

        <Row>
          {requests.map((item) => (
            <Col md="4" key={item._id}>
              <Card
                style={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  marginBottom: "25px",
                  padding: "10px",
                }}
              >
                <CardBody>
                  <h4
                    style={{
                      color: "#16a085",
                      fontWeight: "700",
                    }}
                  >
                    {item.skill?.skill}
                  </h4>

                  <div
                    style={{
                      marginTop: "15px",
                      color: "#555",
                    }}
                  >
                    <p>
                      <b>Requested By:</b> {item.sender?.name}
                    </p>

                    <p>
                      <b>Email:</b> {item.sender?.email}
                    </p>

                    <p>
                      <b>Status:</b> {item.status}
                    </p>
                  </div>

                  {/* Pending */}
                  {item.status === "pending" && (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "20px",
                      }}
                    >
                      {/* Accept */}
                      <Button
                        style={{
                          flex: 1,
                          backgroundColor: "#16a085",
                          border: "none",
                          borderRadius: "8px",
                        }}
                        onClick={() => {
                          dispatch(acceptRequest(item._id));

                          dispatch(getRequests(currentUser._id));

                          dispatch(getSentRequests(currentUser._id));
                        }}
                      >
                        Accept
                      </Button>

                      {/* Reject */}
                      <Button
                        style={{
                          flex: 1,
                          backgroundColor: "#e74c3c",
                          border: "none",
                          borderRadius: "8px",
                        }}
                        onClick={() => {
                          dispatch(rejectRequest(item._id));

                          dispatch(getRequests(currentUser._id));

                          dispatch(getSentRequests(currentUser._id));
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  )}

                  {/* Accepted */}
                  {item.status === "accepted" && (
                    <div
                      style={{
                        marginTop: "20px",
                        backgroundColor: "#eafaf1",
                        padding: "12px",
                        borderRadius: "10px",
                        color: "#16a085",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Request Accepted ✅
                    </div>
                  )}

                  {/* Rejected */}
                  {item.status === "rejected" && (
                    <div
                      style={{
                        marginTop: "20px",
                        backgroundColor: "#fdecea",
                        padding: "12px",
                        borderRadius: "10px",
                        color: "#e74c3c",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Request Rejected ❌
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Sent Requests */}
        <div style={{ padding: "40px 20px" }}>
          <h2
            style={{
              color: "#16a085",
              fontWeight: "700",
            }}
          >
            Sent Requests
          </h2>

          <p
            style={{
              color: "#666",
              fontSize: "18px",
            }}
          >
            Requests you sent to other students.
          </p>
        </div>

        <Row>
          {sentRequests.map((item) => (
            <Col md="4" key={item._id}>
              <Card
                style={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  marginBottom: "25px",
                  padding: "10px",
                }}
              >
                <CardBody>
                  <h4
                    style={{
                      color: "#16a085",
                      fontWeight: "700",
                    }}
                  >
                    {item.skill?.skill}
                  </h4>

                  <div
                    style={{
                      marginTop: "15px",
                      color: "#555",
                    }}
                  >
                    <p>
                      <b>Skill Owner:</b> {item.receiver?.name}
                    </p>

                    <p>
                      <b>Status:</b> {item.status}
                    </p>
                  </div>

                  {/* Accepted */}
                  {item.status === "accepted" && (
                    <div
                      style={{
                        marginTop: "20px",
                        backgroundColor: "#eafaf1",
                        padding: "12px",
                        borderRadius: "10px",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          color: "#16a085",
                          fontWeight: "600",
                        }}
                      >
                        Contact: {item.skill?.contact}
                      </p>
                    </div>
                  )}

                  {/* Rejected */}
                  {item.status === "rejected" && (
                    <div
                      style={{
                        marginTop: "20px",
                        backgroundColor: "#fdecea",
                        padding: "12px",
                        borderRadius: "10px",
                        color: "#e74c3c",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Request Rejected ❌
                    </div>
                  )}

                  {/* Pending */}
                  {item.status === "pending" && (
                    <div
                      style={{
                        marginTop: "20px",
                        backgroundColor: "#fff8e1",
                        padding: "12px",
                        borderRadius: "10px",
                        color: "#f39c12",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Waiting For Approval ⏳
                    </div>
                  )}

                  {/* Delete */}
                  <Button
                    style={{
                      width: "100%",
                      marginTop: "15px",
                      backgroundColor: "#e74c3c",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    onClick={() => dispatch(deleteRequest(item._id))}
                  >
                    Delete Request
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Requests;
