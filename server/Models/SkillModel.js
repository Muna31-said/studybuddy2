import mongoose from "mongoose";

const SkillSchema = mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    experience: {
      type: String,
    },

    voiceCall: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },

  // timestamps
  {
    timestamps: true,
  },
);

const SkillModel = mongoose.model("skills", SkillSchema);

export default SkillModel;
