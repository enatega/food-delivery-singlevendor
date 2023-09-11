/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AddressDetailModal, Footer, SearchContainer } from "../../components";
import { UserContext } from "../../context/User";
import useLocation from "../../hooks/Location";
import AddressCard from "./components/AddressCard";
import useStyle from "./styles";

const LATITUDE = 33.7001019;
const LONGITUDE = 72.9735978;

function Address() {
  const classes = useStyle();
  const { location } = useLocation();
  const { profile } = useContext(UserContext);
  const [addressInfo, setAddressInfo] = useState(null);
  const [addressVisible, setAddressVisible] = useState(false);

  useEffect(() => {
    if (location && !addressInfo) {
      currentLocation();
    }
  }, [addressInfo, location]);

  const toggleModal = useCallback(() => {
    setAddressVisible((prev) => !prev);
  }, []);

  const currentLocation = useCallback(() => {
    if (location)
      setAddressInfo({
        lat: location?.latitude ?? LATITUDE,
        lng: location?.longitude ?? LONGITUDE,
        location: location?.deliveryAddress ?? "",
      });
  }, [location]);

  const editAddress = useCallback((item) => {
    const coordinates = {
      lat: parseFloat(item?.latitude) ?? null,
      lng: parseFloat(item?.longitude) ?? null,
    };
    setAddressInfo({
      ...coordinates,
      id: item._id,
      location: item.delivery_address,
      detail: item.details,
      label: item.label || "Home",
    });
    toggleModal();
  }, []);

  return (
    <Grid container>
      <Grid container item>
        <SearchContainer heading="My Addresses" />
      </Grid>
      <Grid container alignItems="center" justify="center" item xs={12} className={classes.mainView}>
        <Grid container item xs={10} sm={10} md={9} lg={8} className={classes.center}>
          <Grid item xs={12} alignItems="flex-end" className={classes.right}>
            <Button
              variant="outlined"
              size="medium"
              classes={{
                outlined: classes.editBtn,
              }}
              onClick={(e) => {
                e.preventDefault();
                currentLocation();
                toggleModal();
              }}
            >
              <AddIcon />
            </Button>
          </Grid>
          <Grid item xs={12}>
            {profile.addresses.map((item, index) => (
              <AddressCard key={item.id} item={item} editAction={editAddress} />
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Footer />
      <AddressDetailModal isVisible={addressVisible} regionDetail={addressInfo} toggleModal={toggleModal} />
    </Grid>
  );
}

export default React.memo(Address);
