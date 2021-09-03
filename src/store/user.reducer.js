import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

import axios from "axios";
import { login } from "../utils/login";

export const sendValidation = createAsyncThunk("SEND_VALIDATION", () => {
  return login().then(({ data }) => data);
});

export const getUsers = createAsyncThunk("GET_USERS", (params, thunkAPI) => {
  return axios.get(`/api/users`).then(({ data }) => data);
});

export const getUser = createAsyncThunk("GET_USER", (id, thunkAPI) => {
  return axios.get(`/api/users/${id}`).then(({ data }) => data);
});

export const updateUser = createAsyncThunk("UPDATE_USER", (body, thunkAPI) => {
  const { data } = thunkAPI.getState().user;
  return axios
    .put(`/api/users/${data.username}`, body)
    .then(({ data }) => data);
});

export const getMovie = createAsyncThunk("GET_MOVIE", (id, thunkAPI) => {
  return axios
    .get(`https://www.omdbapi.com/?apikey=b9efff26&t=${id}`)
    .then(({ data }) => data);
});

export const getFavorites = createAsyncThunk(
  "GET_FAVORITES",
  (params, thunkAPI) => {
    const { data } = thunkAPI.getState().user;

    return axios.get(`/api/favorites/${data.id}`).then(({ data }) => data);
  }
);

export const sendLogin = createAsyncThunk(
  "SEND_LOGIN",
  ({ data: userData, remember }) => {
    return axios.post("/api/auth/login", userData).then(({ data }) => ({
      data,
      remember,
    }));
  }
);

export const logout = createAction("LOGOUT");

export const setFavorites = createAction("SET_FAVORITES");

export const addFavorite = createAsyncThunk(
  "ADD_FAVORITE",
  (body, thunkAPI) => {
    const user = thunkAPI.getState().user;

    return axios
      .post(`/api/favorites/${user.data.id}`, body)
      .then((res) => res.data);
  }
);

export const deleteFavorite = createAsyncThunk(
  "DELETE_FAVORITE",
  ({ dbId, imdbID }, thunkAPI) => {
    console.log("THUNK DELETE FAVORITE ", { dbId, imdbID });
    const user = thunkAPI.getState().user;

    return axios
      .delete(`/api/favorites/${user.data.id}/${dbId}`)
      .then(() => imdbID);
  }
);

const userReducer = createReducer(
  {
    validated: false,
    isAuthenticated: false,
    data: {},
  },
  {
    [getFavorites.fulfilled]: (state, action) => {
      state.data.favorites = action.payload;
      console.log("FAVORITES STATE", state.data.favorites);
    },

    [updateUser.fulfilled]: (state, action) => {
      state.data = action.payload;
    },

    [logout]: (state, action) => {
      localStorage.removeItem("token");
      state.data = {};
      state.isAuthenticated = false;
    },

    [sendLogin.fulfilled]: (state, { payload }) => {
      if (payload.remember) {
        localStorage.setItem("token", payload.data.token);
      } else {
        sessionStorage.setItem("token", payload.data.token);
      }
      state.data = payload.data.user;
      state.isAuthenticated = true;
    },

    [sendValidation.fulfilled]: (state, action) => {
      state.data = action.payload.user;
      state.validated = true;
      state.isAuthenticated = true;
    },
    [sendValidation.rejected]: (state, action) => {
      localStorage.removeItem("token");
      state.validated = true;
      state.isAuthenticated = false;
    },
  }
);

export default userReducer;
