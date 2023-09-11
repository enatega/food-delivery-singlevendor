import { Box, Grid, Paper, Button, Typography, useTheme } from "@material-ui/core";
import React, {useState, useContext} from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from "./styles";
import { Link as RouterLink } from "react-router-dom";
import {foods  } from "../../apollo/graphQL";
import { gql, useQuery } from "@apollo/client";
import { get } from "lodash";
import ConfigurationContext from "../../context/Configuration";

// constants
const FOODS = gql`
  ${foods}
`

function ItemContainer(props) {
    const theme = useTheme();
    const classes = useStyles();
    const [filters, setFilters] = useState({})
    const { loading, error, data, refetch, networkStatus } = useQuery(FOODS, {
        variables: { category: props._id, ...filters }
      })
    const configuration = useContext(ConfigurationContext)
      console.log('data', data)

   if(loading)
   return  (
   <>
   <Skeleton variant="text"  style={{borderRadius:20,width:'20%',borderTopRightRadius:20}} />
   <Skeleton variant="text"  style={{borderRadius:20,width:'20%',borderTopRightRadius:20}} />
   <Skeleton variant="text" height={100} style={{borderRadius:20,width:'80%',borderTopRightRadius:20}} />
   <Skeleton height={100} style={{borderRadius:20,width:'80%',borderTopRightRadius:20}} />
   <Skeleton height={100} style={{borderRadius:20,width:'80%',borderTopRightRadius:20}} />
   </>
   )   

    return (
        <Grid container direction="row">
            <Grid item xs={10}>
                <Typography color="textPrimary" className={classes.subText}>{props.title}</Typography>
                <Typography color="secondary" className={classes.lightText}>{'Deal Contains'}</Typography>
                {
                    data?.foodByCategory && data?.foodByCategory.map((item, index) => (
                        <RouterLink to={{ pathname: `/Customize` }} className={classes.link}>
                        <Paper elevation={3} style={{ alignItems: 'center', display: 'flex', justifyContent: 'flex-start', padding: 10, height: 80, borderRadius: 20 }} className={classes.mv2} >
                            <img className={classes.ml} style={{ width: '25%', borderRadius: 20, height: '90%' }} src={item.img_url} />
                            <Box className={classes.ml} style={{width:"60%"}}>
                                <Typography noWrap>{item?.title}</Typography>
                                <Typography noWrap variant="body2" className={classes.smallText} color="textSecondary">{item.description}</Typography>
                                {/* {item.variations[0].discounted > 0 && (
                                <Typography className={classes.subText} color="primary">{item.variations[0].price.toFixed(2)}</Typography>
                                )} */}
                                {/* {item.variations[0].discounted > 0 && ( */}
                                <Box display="flex">
                                <Typography className={classes.subText} color="textSecondary">{configuration.currency_symbol}{''} {item.variations[0].price.toFixed(2)}{'  '}</Typography>
                                <Typography className={classes.subText} color="primary">{configuration.currency_symbol}{''} {item.variations[0].price.toFixed(2)}</Typography>
                                </Box>
                                {/* )} */}
                                </Box>
                        </Paper>
                        </RouterLink>
                    ))
                }
            </Grid>
        </Grid>

    );
}

export default ItemContainer;
