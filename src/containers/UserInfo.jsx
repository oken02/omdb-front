import React from "react";
import { useParams } from "react-router-dom";
import Movies from "../components/Movies";
import User from "../components/User";
import useAsyncAction from "../hooks/useAsyncAction";
import { getUser } from "../store/user.reducer";

const UserInfo = () => {
  const { id } = useParams();

  const { status, res: user } = useAsyncAction(getUser, id);

  return (
    <div>
      <h2>USER INFO</h2>
      {status == "resolved" && (
        <div>
          <User user={user} />
          <h2>Favorites</h2>
          <Movies movies={user.favorites} />
        </div>
      )}
    </div>
  );
};

export default UserInfo;
