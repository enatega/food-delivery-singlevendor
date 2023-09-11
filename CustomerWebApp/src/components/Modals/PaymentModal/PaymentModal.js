/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    Radio,
    RadioGroup,
    Typography,
    useMediaQuery,
    useTheme,
    ButtonBase,
  } from "@material-ui/core";
  import AddIcon from "@material-ui/icons/Add";
  import CloseIcon from "@material-ui/icons/Close";
  import RemoveIcon from "@material-ui/icons/Remove";
  import CreditCardIcon from '@material-ui/icons/CreditCard';
  import ReceiptIcon from '@material-ui/icons/Receipt';
  import LocalAtmIcon from '@material-ui/icons/LocalAtm';
  import clsx from "clsx";
  import React, { useCallback, useContext, useEffect, useState } from "react";
  import useStyles from "./styles";
  
  function PaymentModal(props) {
    const theme = useTheme();
    const classes = useStyles();
    const extraSmall = useMediaQuery(theme.breakpoints.down("xs"));
    const [isVisible, setIsVisible] = useState(false)
    const toggleModal = () => {
        setIsVisible(!isVisible)
    }
    console.log('paymentmodal', props.isOpen)
    return (
      <>
        <Dialog
          fullScreen={extraSmall}
          onClose={props.toggleModal}
          open={props.isOpen}
          maxWidth="xs"
          pt={`${theme.spacing(0.5)}px`}
        >
          <DialogTitle style={{padding:0}}>
              <Box display="flex" justifyContent="center" className={classes.header}>
              <Typography className={classes.itemTitle}>{'Change Payment method'}</Typography>          
              </Box>
          </DialogTitle>
          <DialogContent>
          <ButtonBase className={classes.paymentInfoBtn}>
            <Box display="flex" alignItems="center">
            <Box display="flex">
              <LocalAtmIcon color="primary" />
            </Box>
              <Typography variant="body1" className={classes.modeText} color="textSecondary">
                Cash on Delivery (COD)
              </Typography>
            </Box>
            <Radio color="primary" checked={true} />
          </ButtonBase>
          <Divider light orientation="horizontal" />
          <ButtonBase className={classes.paymentInfoBtn}>
            <Box display="flex" alignItems="center">
            <Box display="flex">
              <CreditCardIcon color="primary" />
            </Box>
              <Typography variant="body1" className={classes.modeText} color="textSecondary">
                Credit Card/Debit Card
              </Typography>
            </Box>
            <Radio color="primary" checked={true} />
          </ButtonBase>
          <Divider light orientation="horizontal" />
          <ButtonBase className={classes.paymentInfoBtn}>
            <Box display="flex" alignItems="center">
            <Box display="flex">
              <ReceiptIcon color="primary" />
            </Box>
              <Typography variant="body1" className={classes.modeText} color="textSecondary">
                Credit card
              </Typography>
            </Box>
            <Radio color="primary" checked={true} />
          </ButtonBase>
          <Divider light orientation="horizontal" />
          </DialogContent>
          <DialogActions>
            <Box
              style={{ background: "white", width: "100%" }}
            //   display="flex"
            textAlign="center"
              alignItems="center"
              justifyContent="center"
            >
              <Button
            variant="contained"
            color="secondary"
            disableElevation
            className={classes.doneBtn}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Typography
              variant="button"
              align="center"
            >
              Done
            </Typography>
          </Button>
          <Box />
          <Button
            variant="text"
            className={classes.doneBtn}
            onClick={props.toggleModal}
          >
            <Typography
              variant="button"
              align="center"
              color="textPrimary"
            >
              Cancel
            </Typography>
          </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  export default React.memo(PaymentModal);
  