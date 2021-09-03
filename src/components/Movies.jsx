import { Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import Movie from "./Movie";

const Movies = ({ movies, style }) => {
  return (
    <div>
      <Grid container spacing={2}>
        {movies.length ? (
          movies.map((movie) => (
            <Grid key={movie.imdbID} item lg={4} md={4} sm={6}>
              <Movie movie={movie} style={style} />
            </Grid>
          ))
        ) : (
          <Alert severity="info">No hay resultados</Alert>
        )}
      </Grid>
    </div>
  );
};

export default Movies;
