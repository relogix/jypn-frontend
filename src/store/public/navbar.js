import { createSlice } from "@reduxjs/toolkit";
import { publicRouteSlug } from "../../router/publicRoute";

// State
const initialState = {
  items: [
    // { name: "upcoming", label: "Upcoming", path: "/" },
    { name: "updates", label: "Updates", path: publicRouteSlug.UPDATES },
    { name: "members", label: "Members", path: publicRouteSlug.MEMBERS },
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
