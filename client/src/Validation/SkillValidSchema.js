import * as yup from "yup";

export const skillSchemaValidation = yup.object().shape({
  level: yup.string().required("Level is required"),
  skill: yup.string().required("Skill is required"),
  contact: yup.string().required("Contact is required"),
  date: yup.string().required("Date is required"),
  type: yup.string().required("Session type is required"),
  city: yup.string().required("City is required"),
});
