import { Box, Container } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

function GetStartedWrapper({ children }) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.mainContainer}>
        <Container maxWidth="xs" className={classes.loginBox}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
export default React.memo(GetStartedWrapper);
