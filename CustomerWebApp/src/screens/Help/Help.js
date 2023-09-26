import { Card, CardActionArea, CardContent, Grid, Typography } from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Footer, SearchContainer } from "../../components";
import { HELP_NAV } from "../../utils/constant";
import useStyle from "./styles";

function Help() {
  const classes = useStyle();
  return (
    <Grid container>
      <Grid container item>
        <SearchContainer heading="Help" />
      </Grid>
      <Grid container item xs={12} className={classes.mainView}>
        <Grid item xs={1} md={1} />
        <Grid container item xs={10} sm={10} md={9} lg={9}>
          {HELP_NAV.map((item) => (
            <Card key={item.id} className={classes.cardView}>
              <CardActionArea
                component={RouterLink}
                to={{ pathname: item.navigate }}
                target="_blank"
                className={classes.btnView}
              >
                <CardContent className={classes.row}>
                  <Typography
                    variant="subtitle1"
                    color="textPrimary"
                    classes={{
                      subtitle1: classes.bold,
                    }}
                  >
                    {item.name}
                  </Typography>
                  <KeyboardArrowRightIcon fontSize="large" />
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Grid>
      <Footer />
    </Grid>
  );
}

export default React.memo(Help);
