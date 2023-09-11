import { gql, useMutation } from "@apollo/client";
import { Box, Button, CircularProgress, Paper, Typography, useTheme } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import React, { useContext } from "react";
import { deleteAddress } from "../../../apollo/graphQL";
import { AlertContext } from "../../../context/Alert";
import useStyles from "./styles";

const DELETE_ADDRESS = gql`
  ${deleteAddress}
`;

function AddressCard({ item, editAction }) {
  const theme = useTheme();
  const classes = useStyles();
  const { showAlert } = useContext(AlertContext);
  const [mutate, { loading: loadingDelete }] = useMutation(DELETE_ADDRESS, { onCompleted, onError });

  function onCompleted() {
    showAlert({
      alertSeverity: "success",
      alertMessage: "Address Removed!",
    });
  }

  function onError(error) {
    console.log(error);
    showAlert({
      alertSeverity: "error",
      alertMessage: `An error occured. Please try again. ${error}`,
    });
  }
  return (
    <Paper
      elevation={2}
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        padding: 15,
        height: "50px",
        borderRadius: 20,
      }}
      className={classes.mv2}
    >
      <Box display="flex" alignItems="center">
        {item.label === "Other" && <RoomOutlinedIcon style={{ fontSize: "2rem" }} color="primary" />}
        {item.label === "Work" && <LocalMallOutlinedIcon style={{ fontSize: "2rem" }} color="secondary" />}
        {item.label === "Home" && <HomeOutlinedIcon style={{ fontSize: "2rem" }} color="error" />}
        <Box className={classes.ml}>
          <Typography className={classes.type}>{item.label}</Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography className={classes.smallText} color="textSecondary">
              {item.delivery_address}
            </Typography>
            <Box
              style={{
                height: "1.2vw",
                marginLeft: 5,
                marginRight: 5,
                width: "2px",
                backgroundColor: theme.palette.text.secondary,
                opacity: 0.5,
              }}
            />
            <Typography className={classes.smallText} color="textSecondary">
              {item.details}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box display="flex">
        <Button
          variant="contained"
          color="primary"
          disableElevation
          size="small"
          classes={{
            containedPrimary: classes.editBtn,
          }}
          onClick={(e) => {
            e.preventDefault();
            editAction(item);
          }}
        >
          <EditOutlinedIcon style={{ fontSize: "1.3rem" }} />
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          size="small"
          classes={{
            containedPrimary: classes.editBtn,
          }}
          onClick={(e) => {
            e.preventDefault();
            mutate({ variables: { id: item._id } });
          }}
        >
          {loadingDelete ? (
            <CircularProgress color="inherit" size={20} thickness={5} />
          ) : (
            <DeleteOutlineIcon style={{ fontSize: "1.3rem" }} />
          )}
        </Button>
      </Box>
    </Paper>
  );
}

export default React.memo(AddressCard);
