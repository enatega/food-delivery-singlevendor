import { Box, Card, CardContent, Divider, Grid, IconButton, LinearProgress, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import MarkerEnatega from "../../assets/icons/Marker.svg";
import { Footer, SearchContainer } from "../../components";
import { UserContext } from "../../context";
import ConfigurationContext from "../../context/Configuration";
import theme from "../../utils/theme";
import useStyle from "./styles";

const center = {
  lat: 33.684422,
  lng: 73.047882,
};

function OrderStatus() {
  let renderView;
  let { id } = useParams();
  const classes = useStyle();
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);
  const [map, setMap] = React.useState(null);
  const configuration = useContext(ConfigurationContext);
  const { loadingOrders, errorOrders, orders } = useContext(UserContext);
  const currentOrder = orders.find((o) => o._id === id);

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    // setMap(map)
  }, []);

  if (loadingOrders) {
    renderView = (
      <div style={{ width: "100%" }}>
        <LinearProgress color="primary" />
      </div>
    );
  } else if (errorOrders) {
    renderView = (
      <Grid item xs={12} className={classes.center}>
        <Typography variant="h4" align="center" color="error">
          Unable to load data
        </Typography>
      </Grid>
    );
  } else {
    console.log(currentOrder);
    renderView = (
      <>
        <Grid container item xs={12} justify="center" className={classes.mainView}>
          <Grid container item xs={10} sm={10} md={9} lg={9}>
            <Grid item xs={12} className={classes.row}>
              <IconButton onClick={() => history.goBack()}>
                <ArrowBackIcon />
                <Typography variant="h6" className={classes.pl} color="textPrimary">
                  Back
                </Typography>
              </IconButton>
            </Grid>
            <Card elevation={1} className={classes.cardView}>
              <Typography variant="h6" style={{ textAlign: "center" }} className={classes.pl} color="secondary">
                Thank You!
              </Typography>
              <Divider
                orientation="horizontal"
                variant="inset"
                style={{ height: "2px", backgroundColor: theme.palette.grey[100] }}
                className={classes.mT3}
              />
              <CardContent className={classes.row}>
                <Grid alignItems="center" spacing={4} container justify="center" item xs={12}>
                  <Grid item xs={11} lg={4}>
                    <Typography variant="subtitle2" className={classes.bold} color="textSecondary">
                      Your Order ID
                    </Typography>
                    <Typography variant="h5" className={classes.bold}>
                      {currentOrder.order_id}
                    </Typography>
                    <Box className={classes.mT3} />
                    <Typography variant="subtitle2" className={classes.bold} color="textSecondary">
                      Status
                    </Typography>
                    <Typography variant="subtitle2" className={classes.bold} color="secondary">
                      {currentOrder.order_status}{" "}
                      {/* <Typography variant="subtitle2" display="inline" className={classes.bold} color="textSecondary">
                        (Rider is on the way)
                      </Typography> */}
                    </Typography>
                    <Box className={classes.mT3} />
                    <Typography variant="subtitle2" className={classes.bold} color="textSecondary">
                      Amount
                    </Typography>
                    <Typography variant="subtitle2" className={classes.bold} color="secondary">
                      {configuration.currency_symbol} {currentOrder.order_amount}
                    </Typography>
                    <Box className={classes.mT3} />
                    <Typography variant="subtitle2" className={classes.bold} color="textSecondary">
                      Item
                    </Typography>
                    {currentOrder.items.map((item, index) => (
                      <Typography variant="subtitle2">{`${item.quantity}x ${item.food.title} `}</Typography>
                    ))}

                    <Box className={classes.mT3} />
                    <Typography variant="subtitle2" className={classes.bold} color="textSecondary">
                      Delivery Address
                    </Typography>
                    <Typography variant="subtitle2">{`${currentOrder.delivery_address.delivery_address} | ${currentOrder.delivery_address.details} `}</Typography>
                  </Grid>
                  <Grid item xs={11} lg={7}>
                    <Box style={{ width: "100%", height: "40vh" }}>
                      <GoogleMap
                        mapContainerStyle={{ height: "100%", width: "100%", borderRadius: 20 }}
                        zoom={14}
                        center={{
                          lat: Number(currentOrder.delivery_address.latitude),
                          lng: Number(currentOrder.delivery_address.longitude),
                        }}
                        onLoad={onLoad}
                      >
                        <Marker
                          position={{
                            lat: Number(currentOrder.delivery_address.latitude),
                            lng: Number(currentOrder.delivery_address.longitude),
                          }}
                          icon={MarkerEnatega}
                        />
                      </GoogleMap>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  }
  return (
    <Grid container>
      <Grid container item>
        <SearchContainer />
      </Grid>
      {renderView}
    </Grid>
  );
}

export default React.memo(OrderStatus);
