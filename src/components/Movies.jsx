import { Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import Movie from "./Movie";

const Movies = ({ movies, style, mess }) => {
  return (
    <div>
      {movies.length ? (
        <Grid container spacing={2}>
          {movies.map((movie) => (
            <Grid key={movie.imdbID} item lg={4} md={4} sm={6}>
              <Movie movie={movie} style={style} />
            </Grid>
          ))}
        </Grid>
      ) : (
        !mess && (
          <Alert style={{ justifyContent: "center" }} severity="info">
            <strong>No tienes favoritos</strong>
          </Alert>
        )
      )}
    </div>
  );
};

export default Movies;
