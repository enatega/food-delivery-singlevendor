/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Typography } from "@material-ui/core";
import React from "react";
import AppleIcon from "../../assets/icons/AppleIcon";
import FacebookIcon from "../../assets/icons/FacebookIcon";
import GoogleIcon from "../../assets/icons/GoogleIcon";
import LogoAlphabet from "../../assets/icons/LogoAlphabet";
import Logo from "../../assets/images/logo.png";
import useStyles from "./styles";
import { GetStartedWrapper } from "../../components";

function GetStarted() {
  const classes = useStyles();

  return (
    <GetStartedWrapper>
      <img className={classes.imgContainer} src={Logo} />
      <Button
        variant="contained"
        disableElevation
        fullWidth
        className={`${classes.gButton}`}
        startIcon={<FacebookIcon />}
      >
        <Typography
          variant="caption"
          color="textPrimary"
          align="center"
          className={`${classes.font700} ${classes.btnText}`}
        >
          Signup with Facebook
        </Typography>
      </Button>
      <Button
        variant="contained"
        disableElevation
        fullWidth
        className={`${classes.gButton}`}
        startIcon={<GoogleIcon />}
      >
        <Typography
          variant="caption"
          color="textPrimary"
          align="center"
          className={`${classes.font700} ${classes.btnText}`}
        >
          CONTINUE WITH GOOGLE
        </Typography>
      </Button>
      <Button
        variant="contained"
        disableElevation
        className={`${classes.gButton}`}
        fullWidth
        autoCapitalize={false}
        startIcon={<AppleIcon />}
      >
        <Typography
          variant="caption"
          color="textPrimary"
          align="center"
          className={`${classes.font700} ${classes.btnText}`}
        >
          Signup with Apple
        </Typography>
      </Button>
      <Button
        variant="contained"
        disableElevation
        className={`${classes.gButton}`}
        fullWidth
        startIcon={<LogoAlphabet />}
      >
        <Typography
          variant="caption"
          color="textPrimary"
          align="center"
          className={`${classes.font700} ${classes.btnText}`}
        >
          Signup using Email
        </Typography>
      </Button>
      <Button variant="contained" disableElevation className={`${classes.lgnBtn}`} fullWidth>
        <Typography
          variant="caption"
          color="textPrimary"
          align="center"
          className={`${classes.font700} ${classes.btnText}`}
        >
          Already a member ? Login
        </Typography>
      </Button>
    </GetStartedWrapper>
  );
}
export default React.memo(GetStarted);
