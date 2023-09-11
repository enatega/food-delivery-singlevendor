import { Button, Card, CardContent, Grid, Typography, Box, Divider, TextField, ButtonBase } from "@material-ui/core";
import React, { useCallback, useState,useContext,useRef, useEffect } from "react";
import { Footer, SearchContainer } from "../../components";
import useStyle from "./styles";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Logo from "../../assets/images/profilePlaceholder.png";
import {UserContext  } from "../../context/User";
import {  isValidEmailAddress} from "../../utils/helper";
import { updateUser } from "../../apollo/graphQL";
import { useMutation, gql } from "@apollo/client";
import {AlertContext } from "../../context/Alert";

const UPDATEUSER = gql`
  ${updateUser}
`

function Settings() {
  const classes = useStyle();
  const [isEdit, setIsEdit] = useState(false);
  const formRef = useRef(null);
  const {profile} = useContext(UserContext)
  const [passError, setPassError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const { showAlert } = useContext(AlertContext);

  const [mutate, { loading: loadingMutation }] = useMutation(UPDATEUSER, {
    onCompleted,
    onError
  })

  function onCompleted({ updateUser }) {
    if (updateUser) {
      showAlert({
        alertMessage: "User Updated Successfully!",
      });
      toggleEdit()
    }
  }

  function onError(error) {
    try {
      if (error.graphQLErrors) {
        showAlert({
          alertMessage:  error.graphQLErrors[0].message,
        });
      } else if (error.networkError) {
        showAlert({
          alertMessage: "No Internet! please check your internet connection",
        });
      }
    } catch (err) {}
  }

  const clearErrors = () => {
    setEmailError("");
    setNameError("");
    setPhoneError("");
    setPassError("");
  };

  const handleSave = () => {
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
    if(validate){
      mutate({
        variables: {
          name: formRef.current["fullName"].value,
          phone: formRef.current["phone"].value
        }
      })  
    }
    
  }

  const toggleEdit = useCallback(() => {
    setIsEdit((prev) => !prev);
  }, []);

  return (
    <Grid container>
      <Grid container item>
        <SearchContainer heading="Settings" />
      </Grid>
      <Grid container item xs={12} className={classes.mainView}>
        <Grid item xs={1} md={1} />
        <Grid container item xs={10} sm={10} md={9} lg={9}>
          <Grid item xs={12} className={classes.row}>
            <Typography variant="h5" color="textPrimary">
              My Profile
            </Typography>
            {isEdit ? (
              <Box>
                <ButtonBase
                  size="large"
                  disableElevation
                  disableTouchRipple
                  className={classes.cancelBtn}
                  onClick={toggleEdit}
                >
                  <Typography variant="subtitle2">Cancel</Typography>
                </ButtonBase>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  disableElevation
                  onClick={handleSave}
                  classes={{
                    containedSecondary: classes.saveBtn,
                  }}
                >
                  Save
                </Button>
              </Box>
            ) : (
              <Button
                variant="outlined"
                size="medium"
                classes={{
                  outlined: classes.editBtn,
                }}
                onClick={toggleEdit}
              >
                <EditOutlinedIcon />
              </Button>
            )}
          </Grid>
          <Card className={classes.cardView}>
            <CardContent className={classes.row}>
              <Grid spacing={1} container item xs={4} className={classes.leftContainer}>
                <Grid container item xs={12} alignItems="center" justifyContent="center">
                  <Box className={classes.imgView}>
                    <Box style={{backgroundColor:'black',alignItems:'center',justifyItems:'center', height:'100%', borderRadius:10}}>
                    <Typography style={{textAlign:'center', color:'#FFF'}} color="secondary" >{profile?.name.substr(0, 1).toUpperCase()}</Typography>
                    </Box>
                    
                  </Box>
                </Grid>
                <Grid container item xs={12} justifyContent="center">
                  <Button variant="text">
                    <Typography variant="body2">Change</Typography>
                  </Button>
                </Grid>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <form ref={formRef}>
              <Grid item xs={8} className={classes.rightView}>
                <TextField color="secondary" disabled={!isEdit} name={"fullName"} error={Boolean(nameError)} helperText={nameError} defaultValue={profile?.name} fullWidth label="Name" className={classes.inputRow} />
                <TextField
                  color="secondary"
                  disabled={true}
                  defaultValue={profile?.email}
                  fullWidth
                  error={Boolean(emailError)}
                  helperText={emailError}
                  name={'userEmail'}
                  label="Email"
                  type="email"
                  className={classes.inputRow}
                />
                <TextField color="secondary" name={'phone'} disabled={!isEdit} defaultValue={profile?.phone} error={Boolean(phoneError)} helperText={phoneError} fullWidth label="Phone" className={classes.inputRow} />
                <TextField
                  color="secondary"
                  disabled={!isEdit}
                  fullWidth
                  label="Password"
                  name={'password'}
                  type="password"
                  className={classes.inputRow}
                />
              </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </Grid>
  );
}

export default React.memo(Settings);
