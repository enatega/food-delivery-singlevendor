import { Box, Grid, Divider, Button, ButtonBase, Typography, useTheme, Radio, RadioGroup } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

const image = ['https://res.cloudinary.com/do1ia4vzf/image/upload/v1619174168/food/kjzgiugla2gteg1yvihk.jpg', 'https://res.cloudinary.com/do1ia4vzf/image/upload/v1619174168/food/kjzgiugla2gteg1yvihk.jpg', 'https://res.cloudinary.com/do1ia4vzf/image/upload/v1619174168/food/kjzgiugla2gteg1yvihk.jpg', 'https://res.cloudinary.com/do1ia4vzf/image/upload/v1619174168/food/kjzgiugla2gteg1yvihk.jpg']

function CustomizeCard(props) {
    const theme = useTheme();
    const classes = useStyles();

    return (
        <Grid container direction="row" className={classes.center}>
            <Grid container item xs={10}>
                <Box className={classes.mt3} />
                <Typography color="textPrimary" variant="h6" className={classes.subText}>{'KFC Meal'}</Typography>
                <Box display="block" className={classes.mt3} />
            </Grid>
            <Grid container item xs={8}>
                <Box display="block" className={classes.mt3} />
                <Box display="flex" style={{ width: '100%' }} alignItems="center" justifyContent="space-between">
                    <Typography color="textPrimary">{'KFC Meal(Midnight)'}</Typography>
                    <Typography color="primary" className={classes.subText}>{'$122.45'}</Typography>
                </Box>
                <Box className={classes.mv2} />
                <Typography variant="subtitle2" color="textSecondary">{'Double Zinger Pattie Burger with regular drink'}</Typography>
                <Box display="block" className={classes.mt3}>
                    <Typography color="textPrimary">{'Select Variation'}<Typography display="inline" color="textSecondary">(Optional)</Typography></Typography>
                </Box>
                <Grid item xs={12}>
                    <ButtonBase >
                        <Box display="flex" alignItems="center">
                            <Radio color="primary" checked={true} />
                            <Typography variant="body1" color="textSecondary">
                                Small Cheese
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
                                Medium Cheese
              </Typography>
                        </Box>

                    </ButtonBase>
                </Grid>
                <Grid item xs={12}>
                    <ButtonBase >
                        <Box display="flex" alignItems="center">
                            <Radio color="primary" checked={true} />
                            <Typography variant="body1" color="textSecondary">
                                Large Cheese
                        </Typography>
                        </Box>

                    </ButtonBase>
                </Grid>
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
                </Grid>
                <Grid xs={12} alignItems="center" justify="space-between" container item>
                    <Grid container alignItems="center" justify="space-between" item xs={5} >
                        <Button
                            variant="contained"
                            disableElevation
                            size="small"
                            className={classes.subBtn}
                            onClick={(e) => {
                                e.preventDefault();
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
                            {2}
                        </Typography>
                        <Button
                            variant="contained"
                            disableElevation
                            size="small"
                            className={classes.subBtn}
                            onClick={(e) => {
                                e.preventDefault();
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
                    <Grid container alignItems="center" justify="space-between" item xs={6}>
                        <Button
                            variant="contained"
                            color="secondary"
                            disableElevation
                            fullWidth
                            className={classes.chatBtn}
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <Typography
                                align="center"
                            >
                                Add To Cart
            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );
}

export default CustomizeCard;
