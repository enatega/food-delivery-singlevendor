import { Box, Container, Button, Divider, Link, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import EnategaLogo from "../../assets/images/enategaFooter.png";
import AppleIcon from "../../assets/icons/AppleIcon";
import LogoHorizontal from "../../assets/icons/LogoHorizontal";

const useStyles = makeStyles((theme) => ({
  titleStyle: {
    ...theme.typography.subtitle2,
    color: theme.palette.text.disabled,
  },
  copyRightText: {
    ...theme.typography.subtitle2,
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.primary.light,
    paddingRight: "1vw",
    fontSize: "1vw",
  },
  footerText: {
    ...theme.typography.caption,
    color: theme.palette.text.disabled,
    margin: "0px 10px",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  iconStyles: {
    color: theme.palette.text.disabled,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  font700: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  btnText: {
    width: "inherit",
    fontSize: "1vw",
    textTransform: "inherit",
    padding: theme.spacing(0, 1),
  },
  marginB: {
    marginBottom: theme.spacing(2),
  },
  loginBtn: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1, 1, 1, 2),
    borderRadius: 20,
    backgroundColor: theme.palette.grey[100],
    "&:disabled": {
      backgroundColor: theme.palette.grey[100],
    },
    "&:hover": {
      opacity: 0.9,
      backgroundColor: theme.palette.grey[50],
    },
  },
  btmBtn: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(1, 3, 1, 3),
    borderRadius: "4vw",
    borderStyle: "solid",
    borderColor: theme.palette.text.primary,
    borderWidth: 2,
    "&:disabled": {
      backgroundColor: theme.palette.grey[100],
    },
    "&:hover": {
      opacity: 0.9,
      backgroundColor: theme.palette.grey[50],
    },
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <>
      <Container
        maxWidth="xl"
        style={{
          marginTop: "5vw",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0px",
            paddingLeft: "17vw",
            paddingRight: "17vw",
          }}
        >
          <Box>
            <LogoHorizontal width={"10vw"} height={"3vw"} color={"#000"} />
            {/* <img style={{ width: "10vw", height: "3vw" }} src={EnategaLogo} /> */}
            <Box />
            <Button
              variant="outlined"
              disableElevation
              className={classes.btmBtn}
              // style={{display:"inline-block"}}
              endIcon={<ArrowRightIcon style={{ width: "3vw", height: "3vw" }} />}
            >
              <Typography
                variant="h1"
                color="textPrimary"
                align="left"
                className={clsx(classes.font700, classes.btnText)}
              >
                Start browsing
              </Typography>
            </Button>
          </Box>
          <Box style={{ display: "flex" }}>
            <Box>
              <Button
                variant="contained"
                disableElevation
                className={classes.loginBtn}
                // style={{display:"inline-block"}}
                startIcon={<AppleIcon style={{ width: "1.5vw", height: "1.5vw" }} />}
              >
                <Typography
                  variant="button"
                  color="textSecondary"
                  align="left"
                  className={clsx(classes.font700, classes.btnText)}
                >
                  Download for Apple ios
                </Typography>
              </Button>
              <Box style={{ display: "block" }} />
              <Button
                variant="contained"
                disableElevation
                // style={{display:'block'}}
                className={classes.loginBtn}
                startIcon={<AppleIcon style={{ width: "1.5vw", height: "1.5vw" }} />}
              >
                <Typography
                  variant="button"
                  color="textSecondary"
                  align="left"
                  className={clsx(classes.font700, classes.btnText)}
                >
                  Download for Android
                </Typography>
              </Button>
            </Box>
            <Box>
              <Link href="https://www.facebook.com/enatega">
                <Typography
                  variant="button"
                  color="textPrimary"
                  //   align="left"
                  className={clsx(classes.font700, classes.btnText)}
                >
                  Facebook
                </Typography>
              </Link>
              <Box className={classes.marginB} />
              <Link href="https://www.facebook.com/enatega">
                <Typography
                  variant="button"
                  color="textPrimary"
                  //   align="left"
                  className={clsx(classes.font700, classes.btnText)}
                >
                  LinkedIn
                </Typography>
              </Link>
              <Box className={classes.marginB} />
              <Link href="https://www.facebook.com/enatega">
                <Typography
                  variant="button"
                  color="textPrimary"
                  //   align="left"
                  className={clsx(classes.font700, classes.btnText)}
                >
                  Instagram
                </Typography>
              </Link>
              <Box className={classes.marginB} />
              <Link href="https://www.facebook.com/enatega">
                <Typography
                  variant="button"
                  color="textPrimary"
                  //   align="left"
                  className={clsx(classes.font700, classes.btnText)}
                >
                  Youtube
                </Typography>
              </Link>
            </Box>
            {/* <Link href="https://www.facebook.com/enatega">
            <FacebookIcon className={classes.iconStyles} fontSize="large" />
          </Link>
          <Link href="https://www.instagram.com/enatega.nb/">
            <InstagramIcon style={{ marginLeft: "20px" }} className={classes.iconStyles} fontSize="large" />
          </Link> */}
          </Box>
        </Box>
        {/* <Divider style={{ width: "100%" }} light orientation="horizontal" /> */}

        {/* <Divider style={{ width: "100%" }} light orientation="horizontal" /> */}
      </Container>
      <Box
        style={{
          width: "100%",
          height: "5vw",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: "black",
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <Box
          style={{
            display: "flex",
            textAlign: "center",
            margin: "auto",
            alignItems: "center",
            height: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            width: "70%",
          }}
        >
          <Typography className={classes.copyRightText}>
            Enatega {"    "}© {new Date().getFullYear()} All right reserved
          </Typography>
          <Box style={{ display: "flex" }}>
            <Typography className={classes.copyRightText}>Privacy Policy</Typography>
            <Typography className={classes.copyRightText}>Terms&Conditions</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
