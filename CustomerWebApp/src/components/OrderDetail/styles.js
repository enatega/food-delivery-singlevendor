import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  w70: {
    width: "70%",
  },
  mv2: {
    margin: theme.spacing(2, 0),
  },
  mt3: {
    marginTop: theme.spacing(3),
  },
  ml: {
    marginLeft: theme.spacing(3),
  },
  ph1: {
    padding: theme.spacing(0, 1),
  },
  center: {
    // justifyContent: "center",
    // padding: theme.spacing(2, 3),
  },
  cardContainer: {
    background: theme.palette.common.white,
  },
  imageCard: {
    width: 180,
    height: 150,
  },
  dot: {
    fontSize: 10,
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(0.5),
  },
  imgContainer: {
    height: 190,
    width: "100%",
    borderRadius: theme.spacing(3),
    // height:'50%',
    // height:'156px',
    backgroundSize: "cover",
  },
  disabledText: {
    color: theme.palette.text.disabled,
  },
  subText: {
    fontWeight: 700,
    paddingRight:theme.spacing(1),
  },
  itemTitleText: {
    // width:'90%'
  },
  lightText: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  smallText: {
    fontSize: "0.75rem",
  },
  cardRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0.1, 0),
  },
  chatBtn: {
    margin: theme.spacing(2, 0, 0, 0),
    width: "100%",
    padding: theme.spacing(1.5),
    borderRadius: 20,
  },
  link: {
    textDecoration: "none",
  },
  subBtn: {
    margin: theme.spacing(2, 0, 0, 0),
    width: "45%",
    padding: theme.spacing(1.5),
    borderRadius: 20,
    backgroundColor: theme.palette.grey[100],
  },
}));

export default useStyles;
