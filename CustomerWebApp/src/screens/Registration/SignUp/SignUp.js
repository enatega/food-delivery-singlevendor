/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Typography, Box, TextField, useTheme, CircularProgress } from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import Logo from "../../../assets/images/logo.png";
import useStyles from "./styles";
import { GetStartedWrapper } from "../../../components";
import clsx from "clsx";
import { useRegistration } from "../../../hooks";
import { isValidEmailAddress } from "../../../utils/helper";
import { AlertContext } from "../../../context/Alert";

function Signup() {
  const formRef = useRef(null);
  const theme = useTheme();
  const classes = useStyles();
  const { showAlert } = useContext(AlertContext);
  const [passError, setPassError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const { loading, emailAuthentication } = useRegistration();

  const clearErrors = () => {
    setEmailError("");
    setNameError("");
    setPhoneError("");
    setPassError("");
  };

  const handleAction = useCallback(() => {
    clearErrors();
    let validate = true;
    const emailValue = formRef.current["userEmail"].value;
    const nameValue = formRef.current["fullName"].value;
    const phoneValue = formRef.current["phone"].value;
    const userPass = formRef.current["password"].value;

    if (!nameValue.trim()) {
      setNameError("Name is missing");
      validate = false;
      return;
    }
    if (!isValidEmailAddress(emailValue)) {
      setEmailError("Invalid Email");
      validate = false;
      return;
    }
    if (!phoneValue.trim()) {
      setPhoneError("Phone number is missing");
      validate = false;
      return;
    }
    if (!userPass) {
      setPassError("Password is missing");
      validate = false;
      return;
    }
    if (validate) {
      const user = {
        email: emailValue.toLowerCase().trim(),
        password: userPass,
        name: nameValue,
        phone: phoneValue,
        picture: "",
      };
      emailAuthentication(user);
    } else {
      showAlert({
        alertMessage: "Something is missing",
      });
    }
  }, []);

  return (
    <GetStartedWrapper>
      <Grid
        item
        xs={12}
        direction="column"
        justifyContent="space-between"
        className={clsx(classes.root, classes.height100)}
      >
        <Grid item xs={3} className={clsx(classes.width100, classes.logoView)}>
          <img className={classes.imgContainer} src={Logo} alt="Logo" />
        </Grid>
        <form ref={formRef}>
          <Grid container item xs={9} direction="column" className={clsx(classes.width100, classes.bottomView)}>
            <TextField
              name={"fullName"}
              error={Boolean(nameError)}
              helperText={nameError}
              fullWidth
              variant="filled"
              label="Full Name"
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: classes.input,
                },
              }}
            />
            <Box mt={`${theme.spacing(2)}px`} />
            <TextField
              name={"userEmail"}
              error={Boolean(emailError)}
              helperText={emailError}
              fullWidth
              variant="filled"
              label="Email Address"
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: classes.input,
                },
              }}
            />
            <Box mt={`${theme.spacing(2)}px`} />
            <TextField
              name={"phone"}
              error={Boolean(phoneError)}
              helperText={phoneError}
              fullWidth
              variant="filled"
              label="Phone"
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: classes.input,
                },
              }}
            />
            <Box mt={`${theme.spacing(2)}px`} />
            <TextField
              name={"password"}
              error={Boolean(passError)}
              helperText={passError}
              fullWidth
              variant="filled"
              label="Password"
              type="password"
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: classes.input,
                },
              }}
            />
            <Button
              disabled={loading}
              variant="contained"
              color="primary"
              fullWidth
              disableElevation
              className={classes.lgnBtn}
              onClick={(e) => {
                e.preventDefault();
                handleAction();
              }}
            >
              {loading ? (
                <CircularProgress color="secondary" size={19} thickness={5} />
              ) : (
                <Typography
                  variant="caption"
                  color="textSecondary"
                  align="center"
                  className={`${classes.font700} ${classes.btnText}`}
                >
                  Continue
                </Typography>
              )}
            </Button>
          </Grid>
        </form>
      </Grid>
    </GetStartedWrapper>
  );
}
export default React.memo(Signup);
