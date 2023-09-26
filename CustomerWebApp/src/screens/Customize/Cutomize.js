/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Typography,Container, useTheme, IconButton } from "@material-ui/core";
import React from "react";
import {SearchContainer, Footer, DetailCard, CustomizeCard } from "../../components";
import useStyles from "./styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";


function OrderDetail() {
    const theme = useTheme();
    const classes = useStyles();
    const history = useHistory()

  return (
    <Grid container justify="space-between" direction="column" style={{minHeight:'100vh'}}>
      <Grid container item>
        <SearchContainer />
      </Grid>
      
      <Container maxWidth="md" className={classes.mainContainer}>
            <Grid container className={classes.center}>
            <Grid item xs={12} className={classes.row}>
                        <IconButton onClick={()=> history.goBack()} style={{color:theme.palette.text.primary}} >
                        <ArrowBackIcon />
                        <Typography variant="h6" className={classes.pl} color="textPrimary">
                            Back
                        </Typography>
                        </IconButton>
            </Grid>
              <Grid item xs={12} sm={6}>
                <DetailCard />
              </Grid>
              <Grid item xs={12} sm={6} >
              <CustomizeCard />
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

