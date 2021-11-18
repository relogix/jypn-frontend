import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin";
import publicReducer from "./public";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    public: publicReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
