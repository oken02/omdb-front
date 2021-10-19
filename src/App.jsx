import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Protector2 from "./components/Protector2";
import Login from "./containers/Login";
import Register from "./containers/Register";

import Home from "./Home";
import { sendValidation } from "./store/user.reducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(sendValidation());
  }, []);

  const auth = (path) => {
    if (user.isAuthenticated) return "/search";
  };

  if (!user.validated) {
    return (
      <div
        style={{ height: "200px", lineHeight: "200px", textAlign: "center" }}
      >
        authenticating
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

{
  /* <Route path="/login">
          <Protector2
            evaluate={(user) => {
              if (user.isAuthenticated) return "/search";
            }}
          >
            <Login />
          </Protector2>
        </Route>

        <Route path="/register">
          <Protector2
            evaluate={(user) => {
              if (user.isAuthenticated) return "/search";
            }}
          >
            <Register />
          </Protector2>
        </Route>

        <Route path="/">
          <Protector2
            evaluate={(user) => {
              if (!user.isAuthenticated) return "/login";
            }}
          >
            <Home />
          </Protector2>
        </Route> */
}
