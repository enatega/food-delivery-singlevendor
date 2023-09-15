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
  mv4:{

  },
  pH:{
    marginLeft:theme.spacing(1),
    paddingRight:theme.spacing(1)
  },
  center: {
    // justifyContent: "center",
    // padding: theme.spacing(2, 3),
  },
  cardContainer: {
    background: theme.palette.common.white,
  },
  imageCard:{
    width:180,
    height:150,
  },
  dot: {
    fontSize: 10,
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(0.5),
  },
  imgContainer: {
    height:190,
    width:'100%',
    borderRadius:theme.spacing(3),
    // height:'50%',
    // height:'156px',
    backgroundSize: "cover",
  },
  disabledText: {
    color: theme.palette.text.disabled,
  },
  subText: {
    fontWeight: 700,
    
  },
  lightText:{
    fontWeight:theme.typography.fontWeightMedium
  },
  smallText: {
    fontSize: "0.85rem",
    fontWeight:'bold',
  },
  cardRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0.1, 0),
  },
  chatBtn: {
    padding: theme.spacing(1.4),
    borderRadius: 20,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  subBtn: {
    padding: theme.spacing(1,0),
    minWidth:'40px',
    borderRadius:'16px',
    backgroundColor: theme.palette.grey[100],
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  variationPrice: {
    fontWeight: 700,
    marginLeft: 20
  }
}));

export default useStyles;
