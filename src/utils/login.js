import axios from "axios";
import getToken from "./getToken";

export const login = () => {
  return new Promise((res, rej) => {
    const lstoken = localStorage.getItem("token");
    if (!lstoken) {
      rej();
      return;
    }
    axios.post("/api/auth/validate", {}, getToken()).then(res, rej);
  });
};
