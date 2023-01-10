import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { SnackbarProvider } from "notistack";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
console.log("🤔 ~ process.env", process.env)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
