import { Button, Grid, LinearProgress, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ActiveOrdersCard, Footer, PastOrdersCard, SearchContainer } from "../../components";
import { UserContext } from "../../context";
import { ACTIVE_ORDERS, INACTIVE_ORDERS } from "../../utils/constant";
import useStyle from "./styles";

function MyOrders() {
  const classes = useStyle();
  const { orders, loadingOrders, errorOrders } = useContext(UserContext);
  const activeOrders = orders.filter((o) => ACTIVE_ORDERS.includes(o.order_status));
  const pastOrders = orders.filter((o) => INACTIVE_ORDERS.includes(o.order_status));
  let renderView;

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
          {errorOrders.message}
        </Typography>
      </Grid>
    );
  } else if (orders.length < 1) {
    renderView = (
      <Grid container className={classes.center} spacing={10}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" color="textSecondary">
            No order found!
          </Typography>
        </Grid>
        <Button component={RouterLink} to={"/Home"} variant="outlined" color="primary" size="large">
          Start Shopping
        </Button>
      </Grid>
    );
  } else {
    renderView = (
      <>
        <Grid container item className={classes.center}>
          <Grid item xs={11} sm={11} md={9} lg={10}>
            <Typography variant="subtitle1" color="textPrimary" classes={{ subtitle1: classes.bold }}>
              Recent
            </Typography>
          </Grid>
          <Grid container spacing={2} item xs={11} sm={11} md={9} lg={10} className={classes.contentContainer}>
            {activeOrders.length > 0 ? (
              activeOrders.map((item) => (
                <Grid item lg={4} md={6} sm={6} xs={11}>
                  <ActiveOrdersCard key={item._id} {...item} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary" align="center">
                  You have no active orders.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid container item className={classes.center}>
          <Grid item xs={11} sm={11} md={9} lg={10}>
            <Typography variant="subtitle1" color="textPrimary" classes={{ subtitle1: classes.bold }}>
              Old Orders
            </Typography>
          </Grid>
          <Grid container spacing={2} item xs={11} sm={11} md={9} lg={10} className={classes.contentContainer}>
            {pastOrders.length > 0 ? (
              pastOrders.map((item) => (
                <Grid item lg={4} md={6} sm={6} xs={11}>
                  <PastOrdersCard key={item.id} {...item} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary" align="center">
                  You have no past orders.
                </Typography>
              </Grid>
            )}
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

export default React.memo(MyOrders);
