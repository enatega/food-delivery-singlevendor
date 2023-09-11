/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Grid, Typography } from "@material-ui/core";
import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/User";
import useStyles from "./styles";

function DetailCard(props) {
  const classes = useStyles();
  const navigation = useHistory();
  const { isLoggedIn } = useContext(UserContext);

  const addToCart = useCallback(() => {
    if (!isLoggedIn) {
      navigation.push("/Login");
    }
  }, []);

  const customization = useCallback(() => {
    if (!isLoggedIn) {
      navigation.push("/Login");
    }
  }, []);

  const chatRider = useCallback(() => {
    if (!isLoggedIn) {
      navigation.push("/Login");
    }
  }, []);

  return (
    <Grid container direction="row" className={classes.center}>
      <Grid item xs={10}>
        <img className={classes.imgContainer} src={props.img_menu} alt="Pic" />
        <Box display="flex" justifyContent="space-between" className={classes.mv2}>
          <Typography className={classes.subText}>{props.title}</Typography>
          <Typography color="primary" className={classes.subText}>
            {"$129.50"}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          className={classes.chatBtn}
          onClick={(e) => {
            e.preventDefault();
            addToCart();
          }}
        >
          <Typography align="center">Add To Cart</Typography>
        </Button>
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            disableElevation
            className={classes.subBtn}
            onClick={(e) => {
              e.preventDefault();
              customization();
            }}
          >
            <Typography align="center" color="textPrimary">
              Customize Order
            </Typography>
          </Button>
          <Button
            variant="contained"
            disableElevation
            className={classes.subBtn}
            onClick={(e) => {
              e.preventDefault();
              chatRider();
            }}
          >
            <Typography align="center" color="textPrimary">
              Chat with Rider
            </Typography>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default DetailCard;
