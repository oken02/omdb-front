import React, { useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { useDispatch } from "react-redux";
import { addFavorite, deleteFavorite } from "../store/user.reducer";

const FavIcon = ({ movie, style }) => {
  const [state, setState] = useState({ isFav: style === "solid" });
  const dispatch = useDispatch();

  const click = () => {
    if (!state.isFav) {
      dispatch(addFavorite(movie)).then((action) => {
        if (action.error) return;
        setState({ ...state, dbId: action.payload.id, isFav: true });
      });
    } else {
      dispatch(
        deleteFavorite({ dbId: state.dbId || movie.id, imdbID: movie.imdbID })
      ).then((action) => {
        if (action.error) return;
        setState({ ...state, dbId: null, isFav: false });
      });
    }
  };

  return (
    <div onClick={click}>
      {state.isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </div>
  );
};

export default FavIcon;
