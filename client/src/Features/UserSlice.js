import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = { user: {}, isSuccess: false };

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/register`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      console.log(response);
      const user = response.data.user; //retrieve the response from the server
      return user; //return the response from the server as payload to the thunk
    } catch (error) {
      console.log(error);
    }
  },
);
export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post(`${ENV.SERVER_URL}/login`, {
      email: userData.email,
      password: userData.password,
    });
    const user = response.data.user;
    console.log(response);
    return user;
  } catch (error) {
    //handle the error
    const errorMessage = "Invalid credentials";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
});

export const logout = createAsyncThunk("/users/logout", async () => {
  try {
    // Send a request to your server to log the user out
    const response = await axios.post(`${ENV.SERVER_URL}/logout`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isSuccess = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state) => {
        state.isSuccess = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = {};
        state.isSuccess = false;
      });
  },
});

export default UserSlice.reducer;
