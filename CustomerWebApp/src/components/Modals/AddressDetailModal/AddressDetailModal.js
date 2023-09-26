/* eslint-disable react-hooks/exhaustive-deps */
import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { GoogleMap, Marker } from "@react-google-maps/api";
import clsx from "clsx";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { createAddress, editAddress } from "../../../apollo/graphQL";
import MarkerEnatega from "../../../assets/icons/Marker.svg";
import { AlertContext } from "../../../context/Alert";
import useLocation from "../../../hooks/Location";
import { ADDRESS_LABEL } from "../../../utils/constant";
import useStyle from "./styles";

const EDIT_ADDRESS = gql`
  ${editAddress}
`;
const CREATE_ADDRESS = gql`
  ${createAddress}
`;

function AddressDetailModal({ toggleModal, isVisible, regionDetail }) {
  const classes = useStyle();
  const theme = useTheme();
  const formRef = useRef(null);
  const isEdit = Boolean(regionDetail?.id);
  const [region, setRegion] = useState(null);
  const { showAlert } = useContext(AlertContext);
  const [addressError, setAddressError] = useState("");
  const [locationName, setLocationName] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const { loading, geoCodeCoordinates } = useLocation();
  const [selectedLabel, setSelectedLabel] = useState(regionDetail?.label ?? ADDRESS_LABEL[0].value);
  const [mutate, { loading: mutateLoading }] = useMutation(isEdit ? EDIT_ADDRESS : CREATE_ADDRESS, {
    onCompleted,
    onError,
  });

  useEffect(() => {
    if (regionDetail) {
      setRegion({
        lat: regionDetail.lat,
        lng: regionDetail.lng,
      });
      setLocationName(regionDetail.location);
    }
  }, [regionDetail]);

  function onCompleted(data) {
    if (isEdit) {
      showAlert({
        alertSeverity: "success",
        alertMessage: "Address updated",
      });
    } else {
      showAlert({
        alertSeverity: "success",
        alertMessage: "Address added",
      });
    }
    toggleModal();
  }

  function onError(error) {
    console.log(error);
    showAlert({
      alertSeverity: "error",
      alertMessage: `An error occured. Please try again. ${error}`,
    });
  }

  const changeCoordinates = async (coordinates, index) => {
    setLoadingLocation(true);
    const { latLng } = coordinates;
    const regionChange = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    };
    const geoCodeData = await geoCodeCoordinates(regionChange.lat, regionChange.lng);
    setLocationName(geoCodeData);
    setRegion(regionChange);
    setLoadingLocation(false);
  };

  const clearErrors = useCallback(() => {
    setAddressError("");
  }, []);

  const submitAddress = useCallback(() => {
    clearErrors();
    const detailValue = formRef.current["addressDetail"].value;
    if (!detailValue) {
      setAddressError("Delivery details is required");
      return false;
    }
    if (region) {
      mutate({
        variables: {
          addressInput: {
            _id: isEdit ? regionDetail?.id : undefined,
            latitude: `${region?.lat}`,
            longitude: `${region?.lng}`,
            delivery_address: locationName.trim(),
            details: detailValue.trim(),
            label: selectedLabel,
          },
        },
      });
    } else {
      showAlert({
        alertSeverity: "error",
        alertMessage: "Cann't find location coordinates.",
      });
    }
  }, [locationName, region]);

  return (
    <Dialog
      open={isVisible}
      onClose={toggleModal}
      scroll="body"
      fullWidth={true}
      maxWidth="md"
      className={classes.root}
    >
      <DialogTitle id="simple-dialog-title">
        <Box component="div">
          <Typography variant="h6" color="textPrimary" align="center" className={clsx(classes.boldText, classes.title)}>
            Add Address
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          classes={{
            container: classes.mainView,
          }}
        >
          <Grid item xs={6} className={classes.leftContainer}>
            <GoogleMap
              mapContainerStyle={{ height: "400px", width: "100%", borderRadius: 20 }}
              zoom={16}
              options={{
                fullscreenControl: false,
                streetViewControl: false,
                MapTypeControlOptions: false,
                mapTypeControl: false,
              }}
              center={region}
            >
              <Marker
                icon={{
                  url: MarkerEnatega,
                }}
                position={region}
                draggable={true}
                onDragEnd={changeCoordinates}
              />
            </GoogleMap>
          </Grid>

          <Grid container item xs={6} direction="row" justify="space-around">
            <Grid item xs={12} className={classes.rightContainer}>
              <Grid item xs={12}>
                <Typography variant="button" className={classes.boldText}>
                  Label As
                </Typography>
                <Box display="flex" mt={`${theme.spacing(1)}px`} mb={`${theme.spacing(4)}px`}>
                  {ADDRESS_LABEL.map((label, index) => {
                    const isSelected = selectedLabel === label.value;
                    return (
                      <Button
                        variant={isSelected ? "contained" : "outlined"}
                        color={isSelected ? "primary" : "default"}
                        className={classes.btn}
                        classes={{
                          containedPrimary: classes.selectedBtn,
                          outlined: classes.unSelectedBtn,
                        }}
                        startIcon={isSelected && <CheckCircleIcon className={classes.whiteFont} />}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedLabel(label.value);
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          className={clsx(classes.boldText, { [classes.whiteFont]: isSelected })}
                        >
                          {label.title}
                        </Typography>
                      </Button>
                    );
                  })}
                </Box>
              </Grid>
              <Grid item xs={12} className={classes.m2}>
                <TextField
                  name={"userAddress"}
                  value={locationName}
                  disabled
                  fullWidth
                  variant="filled"
                  label="Delivery Address"
                  placeholder="Your full delivery Address"
                  color="secondary"
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      input: classes.input,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <form ref={formRef}>
                  <TextField
                    name={"addressDetail"}
                    error={Boolean(addressError)}
                    helperText={addressError ? "Delivery details is required" : null}
                    defaultValue={regionDetail?.detail ?? null}
                    fullWidth
                    multiline
                    maxRows={4}
                    variant="filled"
                    label="Additional Info"
                    placeholder="Required Details e.f Floor/Building"
                    color="secondary"
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </form>
              </Grid>
            </Grid>
            <Grid container className={classes.rightContainer} alignItems="flex-end">
              <Grid item xs={7}>
                <Button
                  color="secondary"
                  variant="contained"
                  disableElevation
                  fullWidth
                  className={classes.subBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!loading && !loadingLocation && !mutateLoading) {
                      submitAddress();
                    }
                  }}
                >
                  {loading || loadingLocation || mutateLoading ? (
                    <CircularProgress color="inherit" size={24} thickness={5} />
                  ) : (
                    <Typography align="center" className={classes.whiteFont}>
                      Save
                    </Typography>
                  )}
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button
                  variant="text"
                  disableElevation
                  fullWidth
                  className={clsx(classes.subBtn, classes.linkBtn)}
                  onClick={(e) => {
                    e.preventDefault();
                    clearErrors();
                    toggleModal();
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(AddressDetailModal);
