import { makeStyles } from "@material-ui/core";
import Background from "../../../assets/images/HomeHeader.png";

const useStyle = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    minWidth: "100%",
    backgroundColor: "transparent",
  },
  headingContainer: {
    display: "flex",
    alignItems: "center",
    minHeight: "45vh",
    backgroundColor: "transparent",
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top",
  },
  bottomHeight: {
    height: 80,
  },
  searchContainer: {
    display: "flex",
    padding: theme.spacing(0, 0, 0, 3),
    boxShadow: theme.shadows[5],
    alignItems: "Center",
    borderRadius: 10,
  },
  input: {
    ...theme.typography.body1,
    margin: theme.spacing(0, 3),
    color: theme.palette.text.primary,
  },
  rightBtn: {
    width: "150px",
    height: "100%",
    borderRadius: 0,
    justifyContent: "space-around",
    borderLeft: "1px solid",
    borderColor: theme.palette.grey[300],
  },
}));

export default useStyle;
