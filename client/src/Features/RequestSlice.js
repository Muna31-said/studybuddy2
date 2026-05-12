import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import * as ENV from "../config";

// Send Request
export const sendRequest = createAsyncThunk(
  "request/sendRequest",

  async (data) => {
    const response = await axios.post(`${ENV.SERVER_URL}/request`, data);

    return response.data;
  },
);

// Get Incoming Requests
export const getRequests = createAsyncThunk(
  "request/getRequests",

  async (id) => {
    const response = await axios.get(`${ENV.SERVER_URL}/requests/${id}`);

    return response.data;
  },
);

// Get Sent Requests
export const getSentRequests = createAsyncThunk(
  "request/getSentRequests",

  async (id) => {
    const response = await axios.get(`${ENV.SERVER_URL}/sentRequests/${id}`);

    return response.data;
  },
);

// Accept Request
export const acceptRequest = createAsyncThunk(
  "request/acceptRequest",

  async (id) => {
    await axios.put(`${ENV.SERVER_URL}/request/accept/${id}`);

    return id;
  },
);

// Reject Request
export const rejectRequest = createAsyncThunk(
  "request/rejectRequest",

  async (id) => {
    await axios.put(`${ENV.SERVER_URL}/request/reject/${id}`);

    return id;
  },
);

// Delete Request
export const deleteRequest = createAsyncThunk(
  "request/deleteRequest",

  async (id) => {
    await axios.delete(`${ENV.SERVER_URL}/request/${id}`);

    return id;
  },
);

const RequestSlice = createSlice({
  name: "request",

  initialState: {
    requests: [],
    sentRequests: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Incoming
      .addCase(
        getRequests.fulfilled,

        (state, action) => {
          state.requests = action.payload;
        },
      )

      // Sent
      .addCase(
        getSentRequests.fulfilled,

        (state, action) => {
          state.sentRequests = action.payload;
        },
      )

      // Delete
      .addCase(
        deleteRequest.fulfilled,

        (state, action) => {
          state.sentRequests = state.sentRequests.filter(
            (item) => item._id !== action.payload,
          );
        },
      );
  },
});

export default RequestSlice.reducer;
