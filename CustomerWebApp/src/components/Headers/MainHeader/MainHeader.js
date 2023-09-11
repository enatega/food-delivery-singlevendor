/* eslint-disable react-hooks/exhaustive-deps */
import { AppBar, Box, Button, Divider, Grid, IconButton, Toolbar, Typography } from "@material-ui/core";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import clsx from "clsx";
import React, { useCallback, useContext } from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import LogoHorizontal from "../../../assets/icons/LogoHorizontal";
import { UserContext } from "../../../context/User";
import { HEADER_NAV } from "../../../utils/constant";
import useStyle from "./styles";

function MainHeader() {
  const classes = useStyle();
  const navigation = useHistory();
  const location = useLocation();
  const urlPath = location.pathname;
  const { isLoggedIn, logout } = useContext(UserContext);

  const authorization = useCallback(() => {
    if (isLoggedIn) {
      logout();
    } else {
      navigation.push("/Login");
    }
  }, [isLoggedIn]);

  return (
    <Grid container item xs={12}>
      <Grid item xs={1} md={1} />
      <Grid container item xs={9}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar disableGutters>
            <Box display="flex" alignItems="center" flexGrow={1}>
              <IconButton disableRipple edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <LogoHorizontal width="100px" />
              </IconButton>
              {HEADER_NAV.map((element) => {
                const isSelected = urlPath === element.navigate;
                return (
                  <Button
                    component={RouterLink}
                    to={element.navigate}
                    variant="text"
                    key={element.id}
                    color="inherit"
                    classes={{
                      text: classes.MR2,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color={"textPrimary"}
                      className={clsx({ [classes.unSelectedMenu]: !isSelected, [classes.selectedMenu]: isSelected })}
                    >
                      {element.name}
                    </Typography>
                  </Button>
                );
              })}
            </Box>
            <Box display="flex" flexDirection="row" className={classes.loginView} mr={3}>
              <Button color="inherit">
                <Typography variant="body2" color={"textPrimary"} className={classes.upperCase}>
                  EN
                </Typography>
              </Button>
              <Divider orientation="vertical" flexItem />
              <Button
                color="inherit"
                onClick={(e) => {
                  e.preventDefault();
                  authorization();
                }}
              >
                <Typography variant="body2" color={"textPrimary"} className={classes.upperCase}>
                  {isLoggedIn ? "Logout" : "Login"}
                </Typography>
              </Button>
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              classes={{
                containedPrimary: classes.cartBtn,
              }}
            >
              <ShoppingCartOutlinedIcon />
              <Box bgcolor="info.main" borderRadius={20} className={classes.tagView}>
                <Typography
                  component="p"
                  color="textPrimary"
                  variant="subtitle2"
                  classes={{
                    subtitle2: classes.tagIcon,
                  }}
                >
                  2
                </Typography>
              </Box>
            </Button>
          </Toolbar>
        </AppBar>
      </Grid>
    </Grid>
  );
}

export default React.memo(MainHeader);
