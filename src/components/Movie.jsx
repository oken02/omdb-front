import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Box, IconButton } from "@material-ui/core";
import FavIcon from "./FavIcon";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 170,
    backgroundSize: "contain",
  },
});

export default function Movie({ movie, style }) {
  const classes = useStyles();
  const history = useHistory();

  const click = () => {
    history.push(`/info/movie/${movie.Title}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={click}>
        <CardMedia
          className={classes.media}
          image={
            movie.Poster === "N/A"
              ? "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
              : movie.Poster
          }
          title={movie.Title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.Title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavIcon movie={movie} style={style} />
        </IconButton>

        <Box width="100%" display="flex" justifyContent="flex-end" pr={3}>
          <Typography >1995</Typography>
        </Box>
      </CardActions>
    </Card>
  );
}
