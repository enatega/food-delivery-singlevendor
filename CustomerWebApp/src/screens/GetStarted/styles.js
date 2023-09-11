import { makeStyles } from "@material-ui/core";
import Background from "../../assets/images/Background.jpg";
import MyTheme from "../../utils/theme";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-root": {
      color: theme.palette.text.secondary,
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: theme.palette.common.black,
      },
    },
  },
  container:{
    backgroundImage: `url(${Background})`,
    width:'100%',
    height:'100vh',
    backgroundSize:'contain'
  },
  imgContainer:{
    width:'40%', 
    height:'20%',
    marginBottom:theme.spacing(7)
  },
  font700:{
      fontWeight:theme.typography.fontWeightBold,
    //   textAlign:'center'
  },
  gButton: {
    marginTop: theme.spacing(2),
    padding:theme.spacing(1.5),
    
    background: MyTheme.palette.primary.light,
    borderRadius:theme.spacing(2),
    "&:disabled": {
      backgroundColor:  theme.palette.primary.dark,
    },
    "&:hover": {
      opacity: 0.9,
      backgroundColor:  MyTheme.palette.primary.light
    },
  },
  lgnBtn: {
    marginTop: theme.spacing(4),
    padding:theme.spacing(1.5),
    
    background: MyTheme.palette.primary.main,
    borderRadius:theme.spacing(2),
    "&:disabled": {
      backgroundColor:  theme.palette.primary.dark,
    },
    "&:hover": {
      opacity: 0.9,
      backgroundColor:  MyTheme.palette.primary.light
    },
  },
  btnText: {
    width: "inherit",
  },
  caption: {
    fontSize: "0.875rem",
  }
}));

export default useStyles;
