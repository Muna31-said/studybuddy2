import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Card,
  CardBody,
  Container,
} from "reactstrap";

import { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";

import { updateSkill as updateSkillAction } from "../Features/SkillSlice";

const UpdateSkill = () => {
  const [skill, setSkill] = useState("");

  const [level, setLevel] = useState("");

  const [contact, setContact] = useState("");

  const [city, setCity] = useState("");

  const [type, setType] = useState("");

  const [voiceCall, setVoiceCall] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { id } = useParams();

  // Get Skill Data
  useEffect(() => {
    fetchSkill();
  }, []);

  const fetchSkill = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/skill/${id}`);

      setSkill(response.data.skill);

      setLevel(response.data.level);

      setContact(response.data.contact);

      setCity(response.data.city);

      setType(response.data.type);

      setVoiceCall(response.data.voiceCall);
    } catch (error) {
      console.log(error);
    }
  };

  // Update Skill
  const handleUpdate = async (e) => {
    e.preventDefault();

    dispatch(
      updateSkillAction({
        id,

        updatedData: {
          skill,
          level,
          contact,
          city,
          type,
          voiceCall,
        },
      }),
    );

    alert("Skill Updated ✅");

    navigate("/skills");
  };

  return (
    <div
      style={{
        background: "#f4fffb",
        minHeight: "100vh",
        paddingTop: "50px",
      }}
    >
      <Container
        style={{
          maxWidth: "600px",
        }}
      >
        <Card
          style={{
            border: "none",
            borderRadius: "16px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          }}
        >
          <CardBody>
            <h2
              style={{
                color: "#16a085",
                fontWeight: "700",
                marginBottom: "25px",
                textAlign: "center",
              }}
            >
              Update Skill
            </h2>

            <Form onSubmit={handleUpdate}>
              {/* Skill */}
              <FormGroup>
                <Label>Skill</Label>

                <Input
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                />
              </FormGroup>

              {/* Level */}
              <FormGroup>
                <Label>Level</Label>

                <Input
                  type="select"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option>Beginner</option>

                  <option>Intermediate</option>

                  <option>Advanced</option>
                </Input>
              </FormGroup>

              {/* Contact */}
              <FormGroup>
                <Label>Contact</Label>

                <Input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </FormGroup>

              {/* City */}
              <FormGroup>
                <Label>City</Label>

                <Input value={city} onChange={(e) => setCity(e.target.value)} />
              </FormGroup>

              {/* Type */}
              <FormGroup>
                <Label>Type</Label>

                <Input
                  type="select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Online</option>

                  <option>Offline</option>
                </Input>
              </FormGroup>

              {/* Voice Call */}
              <FormGroup check className="mt-3">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={voiceCall}
                    onChange={(e) => setVoiceCall(e.target.checked)}
                  />{" "}
                  Voice Call Available
                </Label>
              </FormGroup>

              {/* Button */}
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "#16a085",

                  border: "none",

                  marginTop: "20px",
                }}
              >
                Update Skill
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default UpdateSkill;
