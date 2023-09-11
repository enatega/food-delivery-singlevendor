/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Typography,Container, useTheme } from "@material-ui/core";
import React from "react";
import {SearchContainer, Footer, DetailCard, ItemContainer } from "../../components";
import useStyles from "./styles";
import {useHistory} from "react-router-dom";

function OrderDetail() {
    const theme = useTheme();
    const classes = useStyles();
    const {location} = useHistory()
    const {state} = location
    
  return (
    <Grid container justify="space-between" direction="column" style={{minHeight:'100vh'}}>
      <Grid container item>
        <SearchContainer showSearch />
      </Grid>
      
      <Container maxWidth="md" className={classes.mainContainer}>
            <Grid container className={classes.center}>
              <Grid item xs={12} sm={6}>
                <DetailCard {...state} />
              </Grid>
              <Grid item xs={12} sm={6} >
              <ItemContainer {...state} />
                {/* <Box pt={`${theme.spacing(2)}px`} /> */}
              </Grid>
            </Grid>
          </Container>
      <Box>
      <Footer />
      </Box>
    </Grid>
  );
}

export default OrderDetail;
