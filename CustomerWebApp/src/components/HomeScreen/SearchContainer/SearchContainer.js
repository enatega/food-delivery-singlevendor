import { Button, Grid, InputBase, Paper, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import TuneIcon from "@material-ui/icons/Tune";
import clsx from "clsx";
import React from "react";
import { MainHeader } from "../../Headers";
import useStyle from "./styles";

function SearchContainer(props) {
  const classes = useStyle();
 
  return (
    <Grid container className={classes.mainContainer}>
      <Grid container item xs={12} className={classes.headingContainer}>
        <MainHeader />
        <Grid container item xs={12}>
          <Grid item xs={1} md={1} />
          <Grid container item xs={10} sm={10} md={9} lg={8}>
            <Grid item xs={12} sm={9}>
              {props.showSearch ? (
                <Paper component="form" className={clsx(classes.searchContainer, classes.bottomHeight)}>
                  <SearchIcon color="action" />
                  <InputBase fullWidth color="primary" placeholder="Search" className={classes.input} />
                  <Button onClick={props.toggleModal} size="large" color="primary" className={classes.rightBtn}>
                    <TuneIcon color="primary" />
                    <Typography variant="body1" color="primary">
                      Filters
                    </Typography>
                  </Button>
                </Paper>
              ) : (
                <Typography variant="h3" color="textPrimary" className={classes.bottomHeight}>
                  {props.heading ?? ""}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default React.memo(SearchContainer);
