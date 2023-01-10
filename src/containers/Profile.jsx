import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { length, required } from "../utils/validators";
import useForm from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/user.reducer";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";

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

const defaultFormValue = (user) => {
  return {
    fullName: [user.data.fullName || "", [required, length(3)]],
    username: [user.data.username || "", [required, length(3)]],
    password: [user.data.password || "", [required, length(3)]],
  };
};

const Profile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { form, handleInp } = useForm(defaultFormValue(user));

  const { fullName, username, password } = form.controls;

  const onRegister = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUser(form.getData())).then((action) => {
        history.push(`info/user/${user.data.username}`);
      });
    } catch (error) {
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
          Editar perfil
        </Typography>

        {!user.isAuthenticated ? (
          <>
            <br />
            <Alert style={{ justifyContent: "center" }} severity="info">
              <strong>Debes logearte primero</strong>
            </Alert>
          </>
        ) : (
          <form autoComplete="off" className={classes.form} noValidate onSubmit={onRegister}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  error={fullName.dirty && !!fullName.errors.length}
                  helperText={fullName.dirty && fullName.errors[0]}
                  name="fullName"
                  variant="outlined"
                  required
                  fullWidth
                  label="Full Name"
                  autoFocus
                  onChange={handleInp}
                  value={fullName.value}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
              <TextField
                error={!!lastName.errors.length}
                helperText={lastName.errors[0]}
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleInp}
                value={lastName.value}
              />
            </Grid> */}
              <Grid item xs={12}>
                <TextField
                  error={username.dirty && !!username.errors.length}
                  helperText={username.dirty && username.errors[0]}
                  variant="outlined"
                  required
                  fullWidth
                  label="username"
                  name="username"
                  autoComplete="username"
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
                  autoComplete="current-password"
                  onChange={handleInp}
                  value={password.value}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={!form.isValid}>
              Update
            </Button>
          </form>
        )}
      </div>
    </Container>
  );
};

export default Profile;
