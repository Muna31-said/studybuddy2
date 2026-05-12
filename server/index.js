import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import SkillModel from "./Models/SkillModel.js";
import UserModel from "./Models/UserModel.js";
import RequestModel from "./Models/RequestModel.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import * as ENV from "./config.js";

const app = express();
app.use(express.json());
//Middleware

// const corsOptions = {
//   origin: ENV.CLIENT_URL, //client URL local
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, // Enable credentials (cookies, authorization headers, etc.)
// };
// app.use(cors(corsOptions));

//Middleware

const corsOptions = {
  origin: ENV.CLIENT_URL, //client URL local
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
// const connectString =
//   "mongodb://newmona73_db_user:Mona12345@ac-itna3a4-shard-00-00.1giidrs.mongodb.net:27017,ac-itna3a4-shard-00-01.1giidrs.mongodb.net:27017,ac-itna3a4-shard-00-02.1giidrs.mongodb.net:27017/stbuDb?ssl=true&replicaSet=atlas-6pin09-shard-0&authSource=admin&appName=studybuddyCluster";
const connectString = `mongodb://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?ssl=true&replicaSet=atlas-6pin09-shard-0&authSource=admin&appName=studybuddyCluster`;

mongoose
  .connect(connectString)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((error) => {
    console.log("MongoDB Error ❌", error);
  });

app.post("/addSkill", async (req, res) => {
  try {
    const { skill, level, contact, type, city, date, voiceCall, user } =
      req.body;

    // 1️⃣ Required fields
    if (!skill || !level || !contact || !type || !city || !date) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2️⃣ Skill validation (letters only)
    const skillRegex = /^[a-zA-Z\s]{2,30}$/;
    if (!skillRegex.test(skill)) {
      return res.status(400).json({
        message: "Skill must be 2-30 letters only",
      });
    }

    // 3️⃣ Contact validation (phone or email)
    const phoneRegex = /^[0-9]{8,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isPhone = phoneRegex.test(contact);
    const isEmail = emailRegex.test(contact);

    if (!isPhone && !isEmail) {
      return res.status(400).json({
        message: "Contact must be a valid phone number or email",
      });
    }

    // 🔥 4️⃣ BUSINESS LOGIC: Student Experience Classification
    let experience = "";

    if (level === "Beginner") {
      experience = "Student Starter";
    } else if (level === "Intermediate") {
      experience = "Skilled Student";
    } else if (level === "Advanced") {
      experience = "Expert Student";
    } else {
      return res.status(400).json({
        message: "Invalid skill level",
      });
    }

    const newSkill = new SkillModel({
      skill,
      level,
      contact,
      type,
      city,
      date,
      experience,
      voiceCall,
      user,
    });

    await newSkill.save();

    res.json({
      msg: "Skill Added ✅",
      data: newSkill,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving skill" });
  }
});

app.get("/skills", async (req, res) => {
  try {
    const skills = await SkillModel.find().populate("user");
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= REGISTER =================
app.post("/register", async (req, res) => {
  try {
    console.log("Register route working");
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    console.log("User saved");
    console.log(user);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//requests

app.post("/request", async (req, res) => {
  try {
    const { sender, receiver, skill } = req.body;

    const newRequest = new RequestModel({
      sender,
      receiver,
      skill,
    });

    await newRequest.save();

    res.status(201).json({
      message: "Request sent successfully",
      newRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/requests/:id", async (req, res) => {
  try {
    const requests = await RequestModel.find({
      receiver: req.params.id,
    })
      .populate("sender")
      .populate("skill");

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Accept req
app.put("/request/accept/:id", async (req, res) => {
  try {
    const updatedRequest = await RequestModel.findByIdAndUpdate(
      req.params.id,
      {
        status: "accepted",
      },
      { new: true },
    );

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//reject req
app.put("/request/reject/:id", async (req, res) => {
  try {
    const updatedRequest = await RequestModel.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected",
      },
      { new: true },
    );

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//sent req
app.get("/sentRequests/:id", async (req, res) => {
  try {
    const requests = await RequestModel.find({
      sender: req.params.id,
    })
      .populate("receiver")
      .populate("skill");

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//delete skill
app.delete("/skill/:id", async (req, res) => {
  try {
    await SkillModel.findByIdAndDelete(req.params.id);

    res.json({
      message: "Skill deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//del req
app.delete("/request/:id", async (req, res) => {
  try {
    await RequestModel.findByIdAndDelete(req.params.id);

    res.json({
      message: "Request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//update
app.get("/skill/:id", async (req, res) => {
  try {
    const skill = await SkillModel.findById(req.params.id);

    res.json(skill);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//update skill
app.put("/skill/:id", async (req, res) => {
  try {
    await SkillModel.findByIdAndUpdate(req.params.id, req.body);

    res.json({
      message: "Skill Updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

const port = ENV.PORT || 3001;
app.listen(port, () => {
  console.log(`You are connected at port: ${port}`);
});
