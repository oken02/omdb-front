import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { matchPath, NavLink, useHistory, useLocation } from "react-router-dom";
import { AppBar } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import PeopleIcon from "@material-ui/icons/People";

const routes = [
  "/search",
  "/favorites",
  "/profile",
  "/users",
  "/info/:type/:id",
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

function IconTabs() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [value, setValue] = React.useState(() =>
    searchTabIdx(location.pathname)
  ); 

  function searchTabIdx(pathname) {
    for (let i = 0; i < routes.length; i++) {
      const match = matchPath(pathname, {
        path: routes[i],
        exact: true,
        strict: true,
      });

      if (match) return i;
    }
    return 0;
  }

  useEffect(() => {
    history.listen((match) => {
      setValue(searchTabIdx(match.pathname));
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          indicatorColor="primary"
          textColor="primary"
          aria-label="icon tabs example"
          aria-label="scrollable auto tabs example"
        >
          <Tab
            component={NavLink}
            to="/search"
            icon={<SearchIcon />}
            aria-label="phone"
          />
          <Tab
            component={NavLink}
            to="/favorites"
            icon={<FavoriteIcon />}
            aria-label="favorite"
          />
          <Tab
            component={NavLink}
            to="/profile"
            icon={<PersonPinIcon />}
            aria-label="person"
          />

          <Tab
            component={NavLink}
            to="/users"
            icon={<PeopleIcon />}
            aria-label="person"
          />

          <Tab
            component={NavLink}
            to="/info/type/id"
            disabled
            icon={<InfoIcon />}
            aria-label="alt"
          />
        </Tabs>
      </AppBar>
    </div>
  );
}

export default IconTabs;
