// STORE CREATION

import logger from "redux-logger";
import userReducer from "./user.reducer";
import interfaceReducer from "./interface.reducer";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    interface: interfaceReducer,
  },
});

export default store;
