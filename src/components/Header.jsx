import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Avatar, Box } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/user.reducer";
import { useHistory } from "react-router-dom";
import LoginAsModal from "./LoginAsModal";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { showLoginModal } from "../store/interface.reducer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loging, setLoging] = useState(false);
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const interfacee = useSelector((state) => state.interface);

  const onLogout = () => {
    if (user.data.googleId) {
      signOut(auth);
    }
    dispatch(logout());

  };

  useEffect(() => {
    dispatch(showLoginModal(loging));
  }, [loging]);

  useEffect(() => {
    setLoging(interfacee.showLoginModal);
  }, [interfacee.showLoginModal, setLoging]);

  return (
    <div>
      <LoginAsModal open={loging} setOpen={setLoging} />
      <AppBar position="static" color="transparent">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          > */}
          <Box mr={2}>
            <Avatar alt={user.data.fullName || "D"} src="/broken-image.jpg" />
          </Box>
          {/* </IconButton> */}

          <Typography align="center" variant="h6">
            {user.data.fullName || "Desconocido"}
          </Typography>

          <Typography align="center" variant="h5" className={classes.title}>
            <code style={{ fontWeight: "600" }}>REACT PELIS</code>
          </Typography>

          {!user.isAuthenticated && (
            <Button style={{ marginRight: "1rem" }} onClick={() => setLoging(true)} variant="contained" color="primary">
              Login
            </Button>
          )}
          {user.isAuthenticated && (
            <Button onClick={onLogout} variant="contained" color="secondary" startIcon={<ExitToAppIcon />}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
