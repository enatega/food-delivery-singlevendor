import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& label": {
      color: theme.palette.grey[600],
      fontSize: "0.85rem",
    },
    "& .MuiTextField-root": {
      borderRadius: 20,
      overflow: "hidden",
      "& .MuiFilledInput-root": {
        backgroundColor: theme.palette.grey[100],
        fontSize: 14,
        borderRadius: 20,
      },
    },
  },
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
    width: 100,
    aspectRatio: 1,
  },
  bottomView: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2, 0),
  },
  font700: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  lgnBtn: {
    margin: theme.spacing(4, 0, 0, 0),
    padding: theme.spacing(2),
    borderRadius: 20,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  btnText: {
    width: "inherit",
    textTransform: "none",
    padding: theme.spacing(0, 2),
  },
  input: {
    fontSize: 16,
    color: theme.palette.text.primary,
  },
}));

export default useStyles;
