import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  itemTitle: {
    ...theme.typography.h6,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.primary,
    // fontSize:'1.1vw'
  },
  priceTitle: {
    ...theme.typography.subtitle2,
    color: theme.palette.text.disabled,
  },
  dialog:{
    borderRadius:theme.spacing(10)
  },
  header:{
    backgroundColor:theme.palette.grey[100],padding:theme.spacing(3)
  },
  root: {
    '&$paper': {
      borderRadius:20,
    },
  },
  mt3:{
    marginTop:theme.spacing(2)
  },
  doneBtn: {
    margin: theme.spacing(2, 0, 0, 0),
    width:'70%',
    padding: theme.spacing(1.5),
    borderRadius: 20,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  modeText:{
    paddingRight:theme.spacing(0.5),
  },
  infoStyle: {
    ...theme.typography.caption,
    textTransform: "uppercase",
    background: "rgba(39,111,191,0.1)",
    color: "#276FBF",
    padding: "4px 6px",
    fontWeight: 700,
  },
  checkoutContainer: {
    borderRadius: 0,
    width: "80%",
    padding: "10px 0px",
    "&:hover": {
      background: theme.palette.primary.main,
    },
  },
  checkoutText: {
    ...theme.typography.h6,
    fontWeight: 600,
    fontSize: "0.875rem",
  },
  closeContainer: {
    background: theme.palette.grey[300],
    minWidth: "auto",
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    borderRadius: "50%",
    padding: theme.spacing(1),
  },
  itemError: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.warning.main,
  },
  disableBtn: {
    background: theme.palette.grey[400],
    "&:hover": {
      background: theme.palette.grey[400],
    },
  },
  btnBase: {
    borderRadius: "0px",
    height: "50px",
  },
  paymentInfoBtn: {
    width: "100%",
    justifyContent: "space-between",
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
}));

export default useStyle;
