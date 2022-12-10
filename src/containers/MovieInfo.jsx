import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useWideCardMediaStyles } from "@mui-treasury/styles/cardMedia/wide";
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";
import { useBouncyShadowStyles } from "@mui-treasury/styles/shadow/bouncy";
import { getMovie } from "../store/user.reducer";
import { useParams } from "react-router-dom";
import useAsyncAction from "../hooks/useAsyncAction";
import { Box, CircularProgress, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    width: "80%",
    margin: "auto",
    boxShadow: "none",
    borderRadius: 0,
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: "initial",
  },
}));

export const MovieInfo = React.memo(function NewsCard() {
  const styles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  const shadowStyles = useBouncyShadowStyles();

  const { id } = useParams();

  const { status, res: movie } = useAsyncAction(getMovie, id);

  return (
    <div>
      {status === "pending" && (
        <Box p={6} textAlign="center">
          <CircularProgress />
        </Box>
      )}
      
      {status === "resolved" && (
        <Card className={cx(styles.root, shadowStyles.root)}>
          <CardMedia classes={mediaStyles} image={movie.Poster} />
          <CardContent className={styles.content}>
            <TextInfoContent
              classes={textCardContentStyles}
              overline={`${movie.Released}`}
              heading={movie.Title}
              body={movie.Plot}
            />

            <Typography variant="overline" display="block" gutterBottom>
              {`${movie.Writer}`}
            </Typography>
            {/* <Button color={"primary"} fullWidth className={styles.cta}>
              {`${movie.Writer}`}
            </Button> */}
          </CardContent>
        </Card>
      )}
    </div>
  );
});

export default MovieInfo;
