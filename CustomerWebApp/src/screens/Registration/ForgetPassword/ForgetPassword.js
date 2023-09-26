import { Box, Button, Grid, TextField, Typography, useTheme } from "@material-ui/core";
import clsx from "clsx";
import React, { useRef } from "react";
import Logo from "../../../assets/images/logo.png";
import { GetStartedWrapper } from "../../../components";
import useStyles from "./styles";

function ForgetPassword() {
  const formRef = useRef();
  const classes = useStyles();
  const theme = useTheme();
  return (
    <GetStartedWrapper>
      <Grid
        container
        item
        xs={12}
        direction="column"
        justifyContent="space-between"
        className={clsx(classes.height100, classes.root)}
      >
        <Grid item xs={3} className={clsx(classes.width100, classes.logoView)}>
          <img className={classes.imgContainer} src={Logo} alt="Logo" />
        </Grid>
        <Grid item xs={9} direction="column" className={clsx(classes.width100, classes.bottomView)}>
          <form ref={formRef}>
            <Typography
              display="block"
              variant="caption"
              align="left"
              className={clsx(classes.font700, classes.lightText)}
            >
              To reset your password, please enter your Email address below
            </Typography>
            <Box mt={`${theme.spacing(2)}px`} />
            <TextField
              name={"userEmail"}
              //   defaultValue={state?.email ?? ""}
              //   error={Boolean(emailError)}
              //   helperText={emailError}
              fullWidth
              variant="filled"
              label="Email or Phone"
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{
                style: {
                  color: theme.palette.primary.dark,
                },
              }}
            />
          </form>
          <Button variant="contained" color="primary" disableElevation className={classes.emailBtn} fullWidth>
            <Typography variant="button" color="textPrimary" align="center" className={`${classes.btnText}`}>
              Continue
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </GetStartedWrapper>
  );
}

export default React.memo(ForgetPassword);
