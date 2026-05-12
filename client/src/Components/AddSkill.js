import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";

import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { saveSkill } from "../Features/SkillSlice";

import { skillSchemaValidation } from "../Validation/SkillValidSchema";

import axios from "axios";

const AddSkill = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,

    formState: { errors },

    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(skillSchemaValidation),
  });

  // Get User Location
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;

      const lon = position.coords.longitude;

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        );

        const city =
          response.data.address.city ||
          response.data.address.town ||
          response.data.address.village;

        // fill city automatically
        setValue("city", city);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const onSubmit = async (data) => {
    console.log(data);

    dispatch(
      saveSkill({
        ...data,

        user: currentUser._id,
      }),
    );

    alert("Skill Added Successfully ✅");

    reset();
  };

  return (
    <div style={pageStyle}>
      <Card style={cardStyle}>
        <CardBody>
          {/* Title */}
          <h2 style={titleStyle}>Add Your Skill</h2>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label style={labelStyle}>Skill</Label>

                  <Controller
                    name="skill"
                    control={control}
                    render={({ field }) => (
                      <Input style={inputStyle} {...field} />
                    )}
                  />

                  <p style={errorStyle}>{errors.skill?.message}</p>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label style={labelStyle}>Skill Level</Label>

                  <Controller
                    name="level"
                    control={control}
                    render={({ field }) => (
                      <Input type="select" style={inputStyle} {...field}>
                        <option value="">Select level</option>

                        <option>Beginner</option>

                        <option>Intermediate</option>

                        <option>Advanced</option>
                      </Input>
                    )}
                  />

                  <p style={errorStyle}>{errors.level?.message}</p>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <FormGroup>
                  <Label style={labelStyle}>
                    Contact / Email or Phone Number
                  </Label>

                  <Controller
                    name="contact"
                    control={control}
                    render={({ field }) => (
                      <Input style={inputStyle} {...field} />
                    )}
                  />

                  <p style={errorStyle}>{errors.contact?.message}</p>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label style={labelStyle}>Available Date</Label>

                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <Input type="date" style={inputStyle} {...field} />
                    )}
                  />

                  <p style={errorStyle}>{errors.date?.message}</p>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <FormGroup>
                  <Label style={labelStyle}>Session Type</Label>

                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <div
                        style={{
                          display: "flex",

                          gap: "20px",
                        }}
                      >
                        <label>
                          <Input
                            type="radio"
                            checked={field.value === "Online"}
                            onChange={() => field.onChange("Online")}
                          />{" "}
                          Online
                        </label>

                        <label>
                          <Input
                            type="radio"
                            checked={field.value === "Offline"}
                            onChange={() => field.onChange("Offline")}
                          />{" "}
                          Offline
                        </label>
                      </div>
                    )}
                  />

                  <p style={errorStyle}>{errors.type?.message}</p>
                </FormGroup>

                {/* Voice Call */}
                <FormGroup check className="mt-3">
                  <Label check>
                    <Controller
                      name="voiceCall"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      )}
                    />{" "}
                    Voice Call Available
                  </Label>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label style={labelStyle}>City</Label>

                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Input style={inputStyle} {...field} />
                    )}
                  />

                  <p style={errorStyle}>{errors.city?.message}</p>
                </FormGroup>
              </Col>
            </Row>

            {/* Button */}
            <Button style={buttonStyle} type="submit">
              Add Skill 🚀
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

/* Styles */

const pageStyle = {
  background: "#f9fffc",

  minHeight: "100vh",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",
};

const cardStyle = {
  width: "750px",

  padding: "25px",

  borderRadius: "20px",

  border: "none",

  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",

  backgroundColor: "rgb(255, 255, 255)",
};

const titleStyle = {
  textAlign: "center",

  marginBottom: "25px",

  color: "#16a085",

  fontWeight: "700",
};

const labelStyle = {
  fontWeight: "600",

  color: "#333",
};

const inputStyle = {
  borderRadius: "10px",

  padding: "10px",

  border: "1px solid #ddd",
};

const errorStyle = {
  color: "red",

  fontSize: "12px",
};

const buttonStyle = {
  width: "100%",

  backgroundColor: "#16a085",

  border: "none",

  padding: "12px",

  borderRadius: "10px",

  fontWeight: "600",

  marginTop: "10px",

  color: "#ffffff",
};

export default AddSkill;
