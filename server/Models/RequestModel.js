import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
  {
    // الشخص اللي أرسل الطلب
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    // صاحب المهارة
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    // المهارة المطلوبة
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "skills",
      required: true,
    },

    // حالة الطلب
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const RequestModel = mongoose.model("requests", RequestSchema);

export default RequestModel;
