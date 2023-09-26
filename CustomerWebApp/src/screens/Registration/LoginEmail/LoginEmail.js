/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, CircularProgress, Grid, TextField, Typography, useTheme } from "@material-ui/core";
import clsx from "clsx";
import React, { useCallback, useContext, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import { GetStartedWrapper } from "../../../components";
import { AlertContext } from "../../../context/Alert";
import { useRegistration } from "../../../hooks";
import { isValidEmailAddress } from "../../../utils/helper";
import useStyles from "./styles";

function LoginEmail() {
  const formRef = useRef();
  const classes = useStyles();
  const theme = useTheme();
  const { showAlert } = useContext(AlertContext);
  const [passError, setPassError] = useState("");
  const [emailError, setEmailError] = useState("");
  const { emailLogin, loading } = useRegistration();

  const clearErrors = () => {
    setEmailError("");
    setPassError("");
  };

  const loginAction = useCallback(() => {
    clearErrors();
    let validate = true;
    const emailValue = formRef.current["userEmail"].value;
    const passValue = formRef.current["userPass"].value;
    if (!isValidEmailAddress(emailValue)) {
      setEmailError("Invalid Email");
      validate = false;
      return;
    }
    if (!passValue) {
      setPassError("Password required");
      validate = false;
      return;
    }
    if (validate) {
      const user = {
        email: emailValue,
        password: passValue,
        type: "default",
      };
      emailLogin(user);
    } else {
      showAlert({
        alertMessage: "Something is missing",
      });
    }
  }, []);

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
            <Typography display="block" variant="button" align="left" className={classes.lightText}>
              Enter your Email and Password
            </Typography>
            <Box mt={`${theme.spacing(2)}px`} />
            <TextField
              name={"userEmail"}
              error={Boolean(emailError)}
              helperText={emailError}
              fullWidth
              variant="filled"
              label="Email"
              color="primary"
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: classes.input,
                },
              }}
            />

            <Box mt={`${theme.spacing(2)}px`} />
            <TextField
              name={"userPass"}
              error={Boolean(passError)}
              helperText={passError}
              fullWidth
              variant="filled"
              label="Password"
              type="password"
              InputProps={{ disableUnderline: true }}
            />
          </form>
          <Box className={`${classes.width100} ${classes.rightTxt}`}>
            <Button
              component={RouterLink}
              to="/Forget-password"
              variant="text"
              disableRipple
              classes={{
                text: classes.linkBtn,
              }}
            >
              <Typography
                variant="button"
                color="textSecondary"
                align="right"
                className={`${classes.font700} ${classes.btnText}`}
              >
                Forgot Password?
              </Typography>
            </Button>
          </Box>

          <Button
            onClick={(e) => {
              e.preventDefault();
              loginAction();
            }}
            disabled={loading}
            variant="contained"
            color="primary"
            disableElevation
            className={classes.emailBtn}
            fullWidth
          >
            {loading ? (
              <CircularProgress color="secondary" size={24} thickness={5} />
            ) : (
              <Typography
                variant="button"
                color="textSecondary"
                align="center"
                className={`${classes.font700} ${classes.btnText}`}
              >
                Login
              </Typography>
            )}
          </Button>
          <Button
            component={RouterLink}
            to="/Signup"
            variant="outlined"
            color="primary"
            disabled={loading}
            disableElevation
            className={classes.createBtn}
            fullWidth
          >
            <Typography
              variant="button"
              align="center"
              className={clsx(classes.font700, classes.btnText, classes.lightText)}
            >
              Create New Account
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </GetStartedWrapper>
  );
}

export default React.memo(LoginEmail);
