import { Box, Grid, Divider, Button, ButtonBase, Typography, useTheme, Radio, RadioGroup } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { placeOrder } from "../../apollo/graphQL";
import { UserContext } from "../../context/User";
import { createAddress } from "../../apollo/graphQL";


import useStyles from "./styles";

const image = ['https://res.cloudinary.com/do1ia4vzf/image/upload/v1619174168/food/kjzgiugla2gteg1yvihk.jpg', 'https://res.cloudinary.com/do1ia4vzf/image/upload/v1619174168/food/kjzgiugla2gteg1yvihk.jpg', 'https://res.cloudinary.com/do1ia4vzf/image/upload/v1619174168/food/kjzgiugla2gteg1yvihk.jpg', 'https://res.cloudinary.com/do1ia4vzf/image/upload/v1619174168/food/kjzgiugla2gteg1yvihk.jpg']

function CustomizeCard(props) {
    const { profile } = useContext(UserContext)
    console.log(profile)
    const [cartDetails, setCartDetails] = useState({})
    console.log(props.data.item.variations)
    console.log(props.data.id)
    console.log(props.data.title)
    const [orderDetails, setOrderDetails] = useState({ restaurant: "", meal: "", variations: [] })
    const [quantities, setQuantities] = useState(props.data.item.variations.map(() => 0));
    const [totalBill, setTotalBill] = useState(0)


    const theme = useTheme();
    const classes = useStyles();

    const updateQuantity = (index, newQuantity, price) => {
        const newQuantities = [...quantities];
        newQuantities[index] = newQuantity >= 0 ? newQuantity : 0;
        setQuantities(newQuantities);
    };


    const updateCart = async () => {
        console.log(quantities)
        setOrderDetails({ restaurant: props.data.item.title })
        var tempTotal = 0;
        props.data.item.variations.map((variation, index) => (
            tempTotal = tempTotal + ((variation.price) * (quantities[index]))
        ))
        setTotalBill(tempTotal)
        
    }

    return (
        <Grid container direction="row" className={classes.center}>
            <Grid container item xs={10}>
                <Box className={classes.mt3} />
                {orderDetails.title}
                <Typography color="textPrimary" variant="h6" className={classes.subText}>{props.data.item.title + ' Meal'}</Typography>
                <Box display="block" className={classes.mt3} />
            </Grid>
            {console.log(quantities)}
            <Grid container item xs={8}>
                <Box display="block" className={classes.mt3} />
                <Box display="flex" style={{ width: '100%' }} alignItems="center" justifyContent="space-between">
                    <Typography color="textPrimary">{props.data.item.title + ' Meal(Midnight)'}</Typography>
                    <Typography color="textPrimary">{'Total'}</Typography>
                    <Typography color="primary" className={classes.subText}>{totalBill}</Typography>
                    <Typography color="textPrimary">{'Restaurant'}</Typography>
                    <Typography color="primary" className={classes.subText}>{props.data.title}</Typography>
                </Box>
                <Box className={classes.mv2} />
                <Typography variant="subtitle2" color="textSecondary">{props.data.item.description}</Typography>
                {props.data.item.variations.length > 0 ? (
                    props.data.item.variations.map((variation, index) => (
                        <><Box display="block" className={classes.mt3}>
                            <Typography color="textPrimary">{'Select Variation'}<Typography display="inline" color="textSecondary">(Optional)</Typography></Typography>
                        </Box>
                            <Grid item xs={12}>
                                <ButtonBase >
                                    <Box display="flex" alignItems="center">
                                        <Radio color="primary" checked={true} />
                                        <Typography variant="body1" color="textSecondary">
                                            {variation.title}
                                        </Typography>
                                        <Typography color="primary" className={classes.variationPrice}>{'$' + variation.price}</Typography>
                                    </Box>
                                </ButtonBase>
                            </Grid>
                            <Grid xs={12} alignItems="center" justify="space-between" container item>
                                <Grid container alignItems="center" justify="space-between" item xs={5} >
                                    <Button
                                        variant="contained"
                                        disableElevation
                                        size="small"
                                        className={classes.subBtn}
                                        onClick={(e) => {
                                            updateQuantity(index, quantities[index] - 1, variation.price);
                                        }}
                                    >
                                        <Typography
                                            align="center"
                                            color="textSecondary"
                                            className={classes.pH}
                                        >
                                            -
                                        </Typography>
                                    </Button>

                                    <Typography>
                                        {quantities[index]}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        disableElevation
                                        size="small"
                                        className={classes.subBtn}
                                        onClick={(e) => {
                                            updateQuantity(index, quantities[index] + 1, variation.price);
                                        }}
                                    >
                                        <Typography
                                            align="center"
                                            color="textSecondary"
                                        >
                                            +
                                        </Typography>
                                    </Button>
                                </Grid>

                            </Grid>
                        </>
                    ))
                ) : (<></>)}

                {/*<Box display="block" className={classes.mt3}>
                    <Typography color="textPrimary">{'Select Variation'}<Typography display="inline" color="textSecondary">(Optional)</Typography></Typography>
    </Box>
                <Grid item xs={12}>
                    <ButtonBase >
                        <Box display="flex" alignItems="center">
                            <Radio color="primary" checked={true} />
                            <Typography variant="body1" color="textSecondary">
                                Small
                        </Typography>
                        </Box>
                    </ButtonBase>
                </Grid>
                <Box className={classes.mv2} />
                <Grid item xs={12}>
                    <ButtonBase >
                        <Box display="flex" alignItems="center">
                            <Radio color="primary" checked={true} />
                            <Typography variant="body1" color="textSecondary">
                                Medium
              </Typography>
                        </Box>

                    </ButtonBase>
                </Grid>
                <Grid item xs={12}>
                    <ButtonBase >
                        <Box display="flex" alignItems="center">
                            <Radio color="primary" checked={true} />
                            <Typography variant="body1" color="textSecondary">
                                Large 
                        </Typography>
                        </Box>

                    </ButtonBase>
                </Grid>*/}
                <Divider style={{ width: '100%' }} className={classes.mt3} orientation="horizontal" />
                <Box className={classes.mv2} />
                <Grid item xs={12}>
                    <Box className={classes.mt3}>
                        <Typography color="textPrimary">{'Drinks'}</Typography>
                    </Box>
                    <Grid item xs={12}>
                        <ButtonBase >
                            <Box display="flex" alignItems="center">
                                <Radio color="primary" checked={true} />
                                <Typography variant="body1" color="textSecondary">
                                    Pepsi
                                </Typography>
                            </Box>

                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonBase >
                            <Box display="flex" alignItems="center">
                                <Radio color="primary" checked={true} />
                                <Typography variant="body1" color="textSecondary">
                                    Coke
                                </Typography>
                            </Box>

                        </ButtonBase>
                    </Grid>
                    <Button
                        variant="contained"
                        color="secondary"
                        disableElevation
                        className={classes.chatBtn}
                        onClick={() => updateCart()}
                    >
                        <Typography align="center">Add To Cart</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Grid>


    );
}

export default CustomizeCard;