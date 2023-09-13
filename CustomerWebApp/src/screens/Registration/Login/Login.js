import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";
import AppleIcon from "../../../assets/icons/AppleIcon";
import FacebookIcon from "../../../assets/icons/FacebookIcon";
import GoogleIcon from "../../../assets/icons/GoogleIcon";
import LogoAlphabet from "../../../assets/icons/LogoAlphabet";
import Logo from "../../../assets/images/logo.png";
import { GetStartedWrapper } from "../../../components";
import { useRegistration } from "../../../hooks";
import useStyles from "./styles";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import AppleSignIn from "react-apple-signin-auth";

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { loading, loginButton, googleAuthentication } = useRegistration();

  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <GetStartedWrapper>
      <Grid
        container
        item
        xs={12}
        direction="row"
        justifyContent="space-between"
        className={classes.height100}
      >
        <Grid item xs={12} className={clsx(classes.width100, classes.logoView)}>
          <img className={classes.imgContainer} src={Logo} alt="Logo" />
        </Grid>
        <Grid
          container
          item
          xs={12}
          direction="column"
          className={clsx(classes.width100, classes.bottomView)}
        >
          <Button
            variant="contained"
            size="large"
            disableElevation
            fullWidth
            disabled={loading}
            className={classes.loginBtn}
            startIcon={loading ? null : <GoogleIcon />}
            onClick={(e) => {
              e.preventDefault();
              googleAuthentication();
            }}
          >
            {loading && loginButton === "GOOGLE" ? (
              <CircularProgress color="secondary" size={24} thickness={5} />
            ) : (
              <Typography
                variant="button"
                color="textSecondary"
                align="left"
                className={clsx(classes.font700, classes.btnText)}
              >
                Continue With Google
              </Typography>
            )}
          </Button>

          <Button
            component={RouterLink}
            to="/Signup"
            variant="contained"
            size="large"
            disableElevation
            fullWidth
            disabled={loading}
            className={classes.loginBtn}
            startIcon={<LogoAlphabet />}
          >
            <Typography
              variant="button"
              color="textSecondary"
              align="left"
              className={clsx(classes.font700, classes.btnText)}
            >
              Sign Up With Email
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disabled={loading}
            className={classes.emailBtn}
            fullWidth
            onClick={(e) => {
              e.preventDefault();
              history.push("login-email");
            }}
          >
            <Typography
              variant="button"
              color="textPrimary"
              align="center"
              className={`${classes.font700} ${classes.btnText}`}
            >
              Already a member ? Login
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </GetStartedWrapper>
  );
}

export default React.memo(Login);
