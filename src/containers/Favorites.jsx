import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Movies from "../components/Movies";
import { getFavorites } from "../store/user.reducer";

const Favorites = () => {
  const dispatch = useDispatch();

  const [favorites, setFavorites] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFavorites()).then((action) => {
      setFavorites(action.payload || []);
    });
  }, []);

  return (
    <div>
      {!user.isAuthenticated ? (
        <Alert style={{ justifyContent: "center" }} severity="info">
          <strong>Debes logearte primero</strong>
        </Alert>
      ) : (
        favorites &&
        (favorites.length ? (
          <Movies movies={favorites} style="solid" />
        ) : (
          <Alert style={{ justifyContent: "center" }} severity="info">
            <strong>No tienes favoritos</strong>
          </Alert>
        ))
      )}
    </div>
  );
};

export default Favorites;
