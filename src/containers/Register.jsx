import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { length, required } from "../utils/validators";
import  useForm  from "../hooks/useForm";

import { Link as RouterLink, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const defaultFormValue = {
  firstName: ["", [required, length(2)]],
  lastName: ["", [required, length(5)]],
  username: ["", [required, length(4)]],
  password: ["", [required, length(6)]],
};

const Register = () => {
  const classes = useStyles();
  const history = useHistory();

  const { form, handleInp } = useForm(defaultFormValue);

  const { firstName, lastName, username, password } = form.controls;

  const onRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/users", form.getData());
      history.push("/login");
    } catch (error) {
      form.setValue("password", "");
      console.log(error.response);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form
          autoComplete="off"
          className={classes.form}
          noValidate
          onSubmit={onRegister}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={firstName.dirty && !!firstName.errors.length}
                helperText={firstName.dirty && firstName.errors[0]}
                name="firstName"
                variant="outlined"
                required
                fullWidth
                label="First Name"
                autoFocus
                onChange={handleInp}
                value={firstName.value}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={lastName.dirty && !!lastName.errors.length}
                helperText={lastName.dirty && lastName.errors[0]}
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                name="lastName"
                onChange={handleInp}
                value={lastName.value}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={username.dirty && !!username.errors.length}
                helperText={username.dirty && username.errors[0]}
                variant="outlined"
                required
                fullWidth
                label="username"
                name="username"
                onChange={handleInp}
                value={username.value}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={password.dirty && !!password.errors.length}
                helperText={password.dirty && password.errors[0]}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={handleInp}
                value={password.value}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!form.isValid}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// fname: {
//   default: "",
//   validators: [required, length(5)],
// },
// lname: {
//   default: "",
//   validators: [required, length(5)],
// },
// username: {
//   default: "",
//   validators: [required, length(5)],
// },
// password: {
//   default: "",
//   validators: [required, length(5)],
// },
// repeatPassword: {
//   default: "",
//   validators: [
//     required,
//     length(5),
//     (value, state) => {
//       return value === state[password];
//     },
//   ],
// },
