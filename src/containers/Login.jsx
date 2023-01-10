import React, { useState } from "react";
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
import useForm  from "../hooks/useForm";
import { length, required } from "../utils/validators";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendLogin } from "../store/user.reducer";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, reauthenticateWithPopup, onAuthStateChanged,   } from "firebase/auth";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
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

export default function Login() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { form, handleInp } = useForm({
    username: ["", [required, length(3)]],
    password: ["", [required, length(3)]],
  });

  const [remember, setRemember] = useState(true);

  const { username, password } = form.controls;

  const onLogin = async (e) => {
    e.preventDefault();

    dispatch(sendLogin({ data: form.getData(), remember })).then((action) => {
      if (!action.error) {
        history.replace("/search");
      } else {
        form.setValue("password", "");
      }
    });
  };

  useEffect(()=> {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log({ currentUser });
    });
    return () => unsubuscribe();
  }, [])

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleProvider);

    // Reauthenticate using a popup.
    
    console.log("🤔 ~ loginWithGoogle ~ res", res)
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form
            autoComplete="off"
            className={classes.form}
            noValidate
            onSubmit={onLogin}
          >
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
              control={
                <Checkbox
                  onClick={() => setRemember((b) => !b)}
                  checked={remember}
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!form.isValid}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item>
                <Link
                  component={RouterLink}
                  to="/register"
                  href="#"
                  variant="body2"
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>

            <button onClick={loginWithGoogle}>Login con Google</button>

          </form>
        </div>
      </Grid>
    </Grid>
  );
}
