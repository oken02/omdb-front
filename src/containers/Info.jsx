import React from "react";

import { useParams } from "react-router-dom";
import MovieInfo from "./MovieInfo";
import UserInfo from "./UserInfo";

const getContent = (routeParams) => {
  switch (routeParams.type) {
    case "movie":
      return <MovieInfo />;

    case "user":
      return <UserInfo />;

    default:
      return null;
  }
};

const Info = () => {
  const params = useParams();

  return (
    <div>
      info
      {getContent(params)}
    </div>
  );
};

export default Info;
