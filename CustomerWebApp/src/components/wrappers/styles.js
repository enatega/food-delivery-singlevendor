import { makeStyles } from "@material-ui/core";
import Background from "../../assets/images/Background.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-input": {
      color: theme.palette.text.secondary,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.grey[200],
      },
      "&:hover fieldset": {
        borderColor: theme.palette.text.disabled,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${Background})`,
  },
  loginBox: {
    background: theme.palette.common.white,
    padding: theme.spacing(6),
    height: "80vh",
    minWidth: "30vw",
    borderRadius: theme.spacing(2),
    textAlign: "center",
    alignItems:'center'
  },
}));

export default useStyles;
