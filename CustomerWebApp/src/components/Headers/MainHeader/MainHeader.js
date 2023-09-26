// /* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useContext, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import LogoHorizontal from "../../../assets/icons/LogoHorizontal";
import { UserContext } from "../../../context/User";
import { HEADER_NAV } from "../../../utils/constant";
import useStyle from "./styles";

const useStyles = (theme) => ({
  drawerPaper: {
    width: 300,
  },
  selectedListItem: {
    backgroundColor: "#febb2c",
    "&:hover": {
      backgroundColor: "#B1821E",
    },
  },
});

function MainHeader({ classes }) {
  const headerClasses = useStyle();
  const mobileClasses = useStyles(); // Mobile-specific styles
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Grid container item xs={12}>
      <Grid item xs={1} md={1} />
      <Grid container item xs={9}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar disableGutters>
            <Box display="flex" alignItems="center" flexGrow={1}>
              <LogoHorizontal width="130px" height="100%" />
            </Box>
            <Hidden smDown>
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
                      text: headerClasses.MR2,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color={"textPrimary"}
                      className={clsx({
                        [headerClasses.unSelectedMenu]: !isSelected,
                        [headerClasses.selectedMenu]: isSelected,
                      })}
                    >
                      {element.name}
                    </Typography>
                  </Button>
                );
              })}
            </Hidden>
            <Box
              display="flex"
              flexDirection="row"
              className={headerClasses.loginView}
              mr={3}
            >
              <Button color="inherit">
                <Typography
                  variant="body2"
                  color={"textPrimary"}
                  className={headerClasses.upperCase}
                >
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
                <Typography
                  variant="body2"
                  color={"textPrimary"}
                  className={headerClasses.upperCase}
                >
                  {isLoggedIn ? "Logout" : "Login"}
                </Typography>
              </Button>
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              classes={{
                containedPrimary: headerClasses.cartBtn,
              }}
            >
              <ShoppingCartOutlinedIcon />
              <Box
                bgcolor="info.main"
                borderRadius={20}
                className={headerClasses.tagView}
              >
                <Typography
                  component="p"
                  color="textPrimary"
                  variant="subtitle2"
                  classes={{
                    subtitle2: headerClasses.tagIcon,
                  }}
                >
                  2
                </Typography>
              </Box>
            </Button>
            <Hidden mdUp>
              <IconButton
                edge="end"
                className={clsx(
                  headerClasses.menuButton,
                  mobileClasses.menuButtonMobile
                )}
                color="inherit"
                aria-label="menu"
                onClick={toggleSidebar}
              >
                <MenuIcon style={{ color: "white" }} />
              </IconButton>
            </Hidden>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          {/* Customize the Drawer */}
          <Drawer
            anchor="right"
            open={sidebarOpen}
            onClose={toggleSidebar}
            classes={{
              paper: classes.drawerPaper, // Apply custom styles to the Drawer
            }}
          >
            <List>
              {HEADER_NAV.map((element) => (
                <ListItem
                  button
                  component={RouterLink}
                  to={element.navigate}
                  key={element.id}
                  onClick={toggleSidebar}
                  className={
                    urlPath === element.navigate
                      ? classes.selectedListItem
                      : null
                  } // Apply selected style
                >
                  <ListItemText primary={element.name} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Hidden>
      </Grid>
    </Grid>
  );
}

export default withStyles(useStyles)(React.memo(MainHeader)); // Apply custom styles using withStyles
