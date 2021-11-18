import { AiFillFire, AiFillHome } from "react-icons/ai";
import { adminRouteSlug } from "../../router/adminRoute";
import { createSlice } from "@reduxjs/toolkit";

// State
const initialState = {
  items: [
    { name: "dashboard", label: "Dashboard", path: adminRouteSlug.DASHBOARD, Icon: AiFillHome },
    { name: "updates", label: "Updates", path: adminRouteSlug.UPDATES, Icon: AiFillFire },
  ],
};

// Actions
const reducers = {};

// Slice
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers,
});

export default sidebarSlice.reducer;
