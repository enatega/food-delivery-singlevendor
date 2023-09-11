import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(8),
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  MR2: {
    marginRight: theme.spacing(2),
  },
  upperCase: {
    textTransform: "uppercase",
    padding: theme.spacing(0, 2),
  },
  loginView: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    height: "70%",
    minWidth: 140,
    overflow: "hidden",
  },
  selectedMenu: {
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.primary.main,
  },
  unSelectedMenu: {
    color: theme.palette.grey[400],
  },
  cartBtn: {
    minWidth: "auto",
    height: "70%",
    aspectRatio: 1,
    borderRadius: 10,
    padding: theme.spacing(1.5),
  },
  tagView: {
    position: "absolute",
    right: -10,
    top: -10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1.5, 1),
  },
  tagIcon: {
    lineHeight: 0,
    letterSpacing: 0,
  },
}));
export default useStyle;
