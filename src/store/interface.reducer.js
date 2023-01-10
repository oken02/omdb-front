import { createAction, createReducer } from "@reduxjs/toolkit";

export const showLoginModal = createAction("SHOW_LOGIN_MODAL");

const interfaceReducer = createReducer(
  {
    showLoginModal: false,
  },
  {
    [showLoginModal]: (state, { payload }) => {
      state.showLoginModal = payload;
    },
  }
);

export default interfaceReducer;
