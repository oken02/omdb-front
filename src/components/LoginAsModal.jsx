import React, { Fragment, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useForm from "../hooks/useForm";
import { length, required } from "../utils/validators";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, sendLogin } from "../store/user.reducer";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { Box, Modal } from "@material-ui/core";
import RegisterAsModal from "./RegisterAsModal";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginAsModal({ open, setOpen }) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { form, handleInp } = useForm({
    username: ["", [required, length(3)]],
    password: ["", [required, length(3)]],
  });

  const [remember, setRemember] = useState(true);
  const [inlogin, setInLogin] = useState(true);

  const { username, password } = form.controls;

  const onLogin = async (e) => {
    e.preventDefault();

    dispatch(sendLogin({ data: form.getData(), remember })).then((action) => {
      if (!action.error) {
        setOpen(false);
      } else {
        form.setValue("password", "");
      }
    });
  };

  const setUser = (user) => {
    dispatch(googleLogin(user));
  };

  

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, async (googleUser) => {
      console.log("🤔 ~ unsubuscribe ~ googleUser", googleUser);
      if (!googleUser) return;
      const myUser = await axios.get(`/api/users/${googleUser.email}`);
      console.log("🤔 ~ unsubuscribe ~ myUser", myUser);
      setUser({ ...myUser.data, password: "ga", googleToken: googleUser.accessToken });
    });
    return () => unsubuscribe();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setInLogin(true);
  };
  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleProvider);
    const { user: googleUser } = res;
    console.log("🤔 ~ loginWithGoogle ~ googleUser", res);

    const userDB = await axios.post(`/api/auth/google-login`, { googleToken: googleUser.accessToken });

    setOpen(false);
    setUser(userDB.data.user);
  };

  return (
    <Modal onClose={handleClose} open={open} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box className={classes.paper} padding={4} borderRadius={4} component={Paper} elevation={6} square style={{ width: "600px", height: "80vh" }}>
        {!inlogin ? (
          <RegisterAsModal />
        ) : (
          <Fragment>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form autoComplete="off" className={classes.form} noValidate onSubmit={onLogin}>
              <TextField
                error={username.dirty && !!username.errors.length}
                helperText={username.dirty && username.errors[0]}
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="user name"
                name="username"
                onChange={handleInp}
                value={username.value}
              />

              <TextField
                error={password.dirty && !!password.errors.length}
                helperText={password.dirty && password.errors[0]}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleInp}
                value={password.value}
              />
              <FormControlLabel
                control={<Checkbox onClick={() => setRemember((b) => !b)} checked={remember} value="remember" color="primary" />}
                label="Remember me"
              />
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={!form.isValid}>
                Sign In
              </Button>
              <Box display={"flex"} justifyContent="space-between">
                <Button color="primary" onClick={() => setInLogin(false)}>
                  Registrate aquí
                </Button>
                <Button onClick={loginWithGoogle} variant="outlined" color="primary">
                  <img style={{ marginRight: ".5rem" }} width={30} src="https://img.icons8.com/color/512/google-logo.png" alt="google-icon" />
                  Login con Google
                </Button>
              </Box>
            </form>
          </Fragment>
        )}
      </Box>
    </Modal>
  );
}
