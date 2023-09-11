import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

function Alert(alertProps) {
  return <MuiAlert elevation={6} variant="filled" {...alertProps} />;
}
function AlertSnack(props) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={props.alertVisible}
      onClose={props.closeAlert}
      message={props.alertMessage}
      autoHideDuration={props.alive}
      key={`${props.alertMessage} top`}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={props.closeAlert}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      {props.alertSeverity && (
        <Alert onClose={props.closeAlert} severity={props.alertSeverity}>
          {props.alertMessage}
        </Alert>
      )}
    </Snackbar>
  );
}

export default React.memo(AlertSnack);
