/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Card as ICard,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import React, { useCallback, useContext } from "react";
import useStyles from "./styles";
import PlaceHolder from "../../assets/images/placeholder.png";
import { useHistory } from "react-router-dom";

function Card(props) {
  const history = useHistory()
  const item = props.data ?? null;
  const cardImageHeight = props.cardImageHeight ? props.cardImageHeight : "144px";
  const classes = useStyles(props);

    const navigate = useCallback(() => {
      // if (props.checkCart(item._id) && !loading) {
        history.push({
          pathname: "/OrderDetail",
          state:{...item},
        });
      // }
    }, []);


  return (
    <ICard className={classes.card}>
      <CardActionArea
        onClick={(e) => {
          e.preventDefault();
          navigate()
        }}
      >
        <Box style={{ minWidth: "300px" }}>
          <Box
            style={{
              height: cardImageHeight,
            }}
            className={classes.imageContainer}
          >
            <Box
              style={{
                height: cardImageHeight,
                backgroundImage: `url("${item.img_menu ? item.img_menu : PlaceHolder }")`,
              }}
              className={classes.imgContainer}
            />
            {/* <Box className={classes.offContainer}>
              <Typography className={classes.offText}>Flat 50% OFF</Typography>
            </Box> */}
            <Box className={classes.cardBottomHeader} color="info.main">
              <Typography variant="subtitle1" className={classes.textBold}>
                {item.title}
              </Typography>

              <Typography noWrap variant="subtitle2" className={classes.subDescription}>
                {item.description}
              </Typography>
            </Box>

            {/* <IconButton
            //   onMouseDown={(e) => e.stopPropagation()}
              size="small"
              
              className={classes.heartBtn}
            >
              
                <FavoriteBorderIcon fontSize="small" color="primary" />
              
            </IconButton> */}
          </Box>
          {/* <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1" color="textSecondary" className={classes.textBold}>
              {item.name}
            </Typography>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <StarSharpIcon style={{ fontSize: "14px", color: "#276fa5" }} />
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" className={classes.subDescription}>
              category name
            </Typography>
          </Box> */}
        </Box>
      </CardActionArea>
    </ICard>
  );
}

export default React.memo(Card);
