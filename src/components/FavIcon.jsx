import React, { useState } from "react";
import { useSnackbar } from "notistack";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { useDispatch, useSelector } from "react-redux";
import { addFavorite, deleteFavorite } from "../store/user.reducer";
import { showLoginModal } from "../store/interface.reducer";

const FavIcon = ({ movie, style }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const user = useSelector((state) => state.user);
  const [state, setState] = useState({ isFav: style === "solid" });
  const dispatch = useDispatch();

  const click = () => {
    if (!user.isAuthenticated) {
      dispatch(showLoginModal(true));
    }
    if (!state.isFav) {
      dispatch(addFavorite(movie)).then((action) => {
        if (action.error) return;
        setState({ ...state, dbId: action.payload.id, isFav: true });
        enqueueSnackbar("Favorito agregado", { variant: "success" });
      });
    } else {
      dispatch(deleteFavorite({ dbId: state.dbId || movie.id, imdbID: movie.imdbID })).then((action) => {
        if (action.error) return;
        setState({ ...state, dbId: null, isFav: false });
        enqueueSnackbar("Favorito eliminado", { variant: "warning" });
      });
    }
  };

  return (
    <div style={{ padding: "12px" }} onClick={click}>
      {state.isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </div>
  );
};

export default FavIcon;
