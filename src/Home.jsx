import { Box, Container } from "@material-ui/core";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import IconTabs from "./components/IconTabs";
import Search from "./containers/Search";
import Favorites from "./containers/Favorites";
import Profile from "./containers/Profile";
import Users from "./components/Users";
import Info from "./containers/Info";

const Home = () => {
  return (
    <div>
      <Box mt={2} />

      <Container maxWidth="lg">
        <Header />
        <Box my={4} />

        <IconTabs />
      </Container>

      <Box my={4} />

      <Container maxWidth="md">
        <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>

          <Route path="/users">
            <Users />
          </Route>

          <Route path="/profile">
            <div>
              <Profile />
            </div>
          </Route>

          <Route path="/info/:type/:id">
            <Info />
          </Route>
        </Switch>
      </Container>
    </div>
  );
};

export default Home;
