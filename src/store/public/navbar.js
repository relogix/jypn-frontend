import { createSlice } from "@reduxjs/toolkit";

// State
const initialState = {
  items: [
    { name: "upcoming", label: "Upcoming", path: "/" },
    { name: "update", label: "Update", path: "/" },
    { name: "about", label: "About", path: "/" },
  ],
};

// Actions
const reducers = {};

// Slice
const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers,
});

export default navbarSlice.reducer;
