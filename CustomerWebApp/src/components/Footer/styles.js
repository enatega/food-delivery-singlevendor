import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  width100: {
    maxWidth: "100%",
  },
  height100: {
    height: "100%",
  },
  logoView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    width: 85,
    aspectRatio: 1,
  },
  bottomView: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2, 0),
  },
  loginBtn: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(2, 2, 2, 3),
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
  font700: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  emailBtn: {
    margin: theme.spacing(4, 0, 0, 0),
    padding: theme.spacing(2),
    borderRadius: 20,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  btnText: {
    width: "inherit",
    textTransform: "capitalize",
    padding: theme.spacing(0, 2),
  },
}));

export default useStyles;
