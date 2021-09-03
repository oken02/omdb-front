// STORE CREATION

import logger from "redux-logger";
import userReducer from "./user.reducer";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

  reducer: {
    user: userReducer,
  },
});

export default store;
