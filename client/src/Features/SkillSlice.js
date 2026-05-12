import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import * as ENV from "../config";

const initialState = {
  value: [],
};

// 🔥 Add Skill
export const saveSkill = createAsyncThunk(
  "skill/addSkill",

  async (skillData) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/addSkill`, {
        skill: skillData.skill,

        contact: skillData.contact,

        level: skillData.level,

        type: skillData.type,

        city: skillData.city,

        date: skillData.date,

        voiceCall: skillData.voiceCall,

        user: skillData.user,
      });

      const skill = response.data.data;

      return skill;
    } catch (error) {
      console.log(error);
    }
  },
);

// 🔥 Get Skills
export const getSkills = createAsyncThunk(
  "skill/getSkills",

  async () => {
    try {
      const response = await axios.get(`${ENV.SERVER_URL}/skills`);

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

// 🔥 Delete Skill
export const deleteSkill = createAsyncThunk(
  "skill/deleteSkill",

  async (id) => {
    try {
      await axios.delete(`${ENV.SERVER_URL}/skill/${id}`);

      return id;
    } catch (error) {
      console.log(error);
    }
  },
);

// 🔥 Update Skill
export const updateSkill = createAsyncThunk(
  "skill/updateSkill",

  async ({ id, updatedData }) => {
    try {
      await axios.put(`${ENV.SERVER_URL}/skill/${id}`, updatedData);

      return {
        _id: id,
        ...updatedData,
      };
    } catch (error) {
      console.log(error);
    }
  },
);

export const SkillSlice = createSlice({
  name: "skill",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ✅ Save Skill
      .addCase(
        saveSkill.fulfilled,

        (state, action) => {
          state.value.push(action.payload);
        },
      )

      // ✅ Get Skills
      .addCase(
        getSkills.fulfilled,

        (state, action) => {
          state.value = action.payload;
        },
      )

      // ✅ Delete Skill
      .addCase(
        deleteSkill.fulfilled,

        (state, action) => {
          state.value = state.value.filter(
            (item) => item._id !== action.payload,
          );
        },
      )

      // ✅ Update Skill
      .addCase(
        updateSkill.fulfilled,

        (state, action) => {
          state.value = state.value.map((item) =>
            item._id === action.payload._id ? action.payload : item,
          );
        },
      );
  },
});

// Export reducer
export default SkillSlice.reducer;
