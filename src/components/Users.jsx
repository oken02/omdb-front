import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../store/user.reducer";
import User from "./User";

const Users = () => {
  const dispatch = useDispatch();
  const [users, setusers] = useState([]);

  useEffect(() => {
    dispatch(getUsers()).then(({ payload: users }) => {
      setusers(users);
    });
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid key={user.id} item lg={4} md={4} sm={6} xs={6}>
            <User user={user} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Users;
