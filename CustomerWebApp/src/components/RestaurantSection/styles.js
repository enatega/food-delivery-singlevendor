import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  restauranCardContainer: {
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  nextButtonStyles: {
    minWidth: "auto",
    width: "44px",
    height: "47px",
    position: "absolute",
    top: "45%",
    zIndex: 5,
    borderRadius: 15,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  sectionHeading: {
    marginBottom: theme.spacing(3),
  },
  mainContainer: {
    marginTop: "50px",
    padding: (extraSmall) => (extraSmall ? "0px  5vw" : "0px"),
  },
}));

export default useStyle;
