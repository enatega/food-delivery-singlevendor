import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React, { useCallback, useRef } from "react";
import Card from "../Card/Card";
import useStyles from "./styles";

function RestaurantSection(props) {
  const theme = useTheme();
  const extraSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles(extraSmall);
  const ref = useRef([]);

  const ScrollLeft = useCallback((index1) => {
    ref.current[index1].scrollTo({
      left: ref.current[index1].scrollLeft + 500,
      behavior: "smooth",
    });
  }, []);

  const ScrollRight = useCallback((index1) => {
    ref.current[index1].scrollTo({
      left: ref.current[index1].scrollLeft - 500,
      behavior: "smooth",
    });
  }, []);

  console.log('props section', props.restaurantSections)

  return (
    <Grid container item justify="center" alignItems="center" className={classes.mainContainer}>
      <Grid item sm={1} />
      <Grid item xs={12} sm={9}>
        {props.restaurantSections.map((section, index1) => (
          <Box style={{ marginTop: "50px", position: "relative" }} key={section._id}>
            <Typography variant="h5" className={classes.sectionHeading}>
              {section.name}
            </Typography>
            {section.categories.length > 4 && (
              <Button
                variant="contained"
                color="primary"
                className={classes.nextButtonStyles}
                style={{
                  left: "-4vw",
                }}
                onClick={() => ScrollRight(index1)}
              >
                <ArrowBackIcon />
              </Button>
            )}

            <Box
              style={{
                overflow: "auto",
                whiteSpace: "nowrap",
              }}
              ref={(el) => (ref.current[index1] = el)}
              className={classes.restauranCardContainer}
            >
              {section.categories.map((data, index) => (
                <Box style={{ display: "inline-block", marginRight: "25px" }} key={index}>
                  <Card
                    data={data}
                    cardImageHeight="165px"
                    showMessage={props.showMessage}
                    checkCart={props.checkCart}
                  />
                </Box>
              ))}
            </Box>
            {section.categories.length > 4 && (
              <Button
                variant="contained"
                color="primary"
                className={classes.nextButtonStyles}
                style={{
                  right: "-4vw",
                }}
                onClick={() => ScrollLeft(index1)}
              >
                <ArrowForwardIcon />
              </Button>
            )}
          </Box>
        ))}
      </Grid>
      <Grid item sm={1} />
    </Grid>
  );
}

export default React.memo(RestaurantSection);
