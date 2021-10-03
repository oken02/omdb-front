import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Movies from "../components/Movies";
import { getFavorites } from "../store/user.reducer";

const Favorites = () => {
  const dispatch = useDispatch();

  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    dispatch(getFavorites()).then((action) => {
      setFavorites(action.payload);
    });
  }, []);

  return <div>{favorites && <Movies movies={favorites} style="solid" />}</div>;
};

export default Favorites;
