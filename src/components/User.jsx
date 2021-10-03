import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import { useGutterBorderedGridStyles } from "@mui-treasury/styles/grid/gutterBordered";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    // minWidth: 256,
    textAlign: "center",
    cursor: "pointer",
  },
  avatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: "0.875em",
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: "1px",
  },
}));

export const ProfileCardDemo = React.memo(function ProfileCard({ user }) {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: "rgba(0, 0, 0, 0.08)",
    height: "50%",
  });

  const history = useHistory();

  const click = () => {
    history.push(`/info/user/${user.username}`);
  };

  return (
    <Card onClick={click} className={cx(styles.card, shadowStyles.root)}>
      <CardContent>
        <Avatar
          alt={user.username}
          src="/broken-image.jpg"
          className={styles.avatar}
        />
        <h3
          className={styles.heading}
        >{`${user.firstName} ${user.lastName}`}</h3>
        <span className={styles.subheader}>{user.username}</span>
      </CardContent>
      <Divider light />
      <Box display={"flex"}>
        <Box p={2} flex={"auto"} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Favorites</p>

          <p className={styles.statValue}>
            {user.cantFavorites || user.favorites.length}
          </p>
        </Box>
        <Box p={2} flex={"auto"} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Last activity</p>

          <p className={styles.statValue}>
            {new Date(user.lastActivity).toLocaleDateString()}
          </p>
        </Box>
      </Box>
    </Card>
  );
});

export default ProfileCardDemo;
