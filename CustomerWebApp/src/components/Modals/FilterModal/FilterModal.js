/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Switch,
    FormControlLabel,
    FormGroup,
    IconButton,
    Radio,
    RadioGroup,
    Typography,
    useMediaQuery,
    useTheme,
    ButtonBase,
    Slider
} from "@material-ui/core";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import React, { useCallback, useContext, useEffect, useState } from "react";
import useStyles from "./styles";
import RefreshIcon from '@material-ui/icons/Refresh';

function FilterModal(props) {
    const theme = useTheme();
    const classes = useStyles();
    const extraSmall = useMediaQuery(theme.breakpoints.down("xs"));

    const [value, setValue] = React.useState([20, 37]);

    return (
        <>
            <Dialog
                fullScreen={extraSmall}
                onClose={props.toggleModal}
                open={props.isOpen}
                maxWidth="xs"
                pt={`${theme.spacing(0.5)}px`}
            >
                <DialogTitle style={{ padding: 0 }}>
                    <Box display="flex" justifyContent="center" className={classes.header}>
                        <Typography variant="h5" className={classes.itemTitle}>{'Filters'}</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="body2" className={classes.modeText}>
                            Filter
                             </Typography>
                        <IconButton >
                            <Typography variant="body2" className={classes.modeText} color="secondary">
                                Reset
                            </Typography>
                            <RefreshIcon color="secondary" style={{ fontSize: '19px' }} />
                        </IconButton>
                    </Box>
                    <Divider light orientation="horizontal" />
                    <ButtonBase className={classes.paymentInfoBtn}>
                        <Box display="flex" alignItems="center">
                            <Typography variant="body1" className={classes.modeText} color="textSecondary">
                                Show sales item only
                            </Typography>
                        </Box>
                        <Switch
                            checked={true}
                            // onChange={handleChange}
                            name="checkedA"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            color="primary"
                        />
                    </ButtonBase>
                    <Divider light orientation="horizontal" />
                    <ButtonBase className={classes.paymentInfoBtn}>
                        <Box display="flex" alignItems="center">
                            <Typography variant="body1" className={classes.modeText} color="textSecondary">
                                Show stock item only
                            </Typography>
                        </Box>
                        <Switch
                            checked={true}
                            // onChange={handleChange}
                            name="checkedA"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            color="primary"
                        />
                    </ButtonBase>
                    <Divider light orientation="horizontal" />
                    <Box display="flex" alignItems="center" className={classes.mt3} justifyContent="space-between">
                        <Typography variant="body2" className={classes.modeText}>
                            Price Range
                        </Typography>
                    </Box>
                    <Box display="flex" className={classes.mt3}>
                        <Slider
                            value={value}
                            // onChange={handleChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                        // getAriaValueText={valuetext}
                        />
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="body2" color="textSecondary" className={classes.modeText}>
                            $0
                             </Typography>

                        <Typography variant="body2" className={classes.modeText} color="textSecondary">
                            $1000
                            </Typography>


                    </Box>
                    <Box display="flex" alignItems="center" className={classes.mt3} justifyContent="space-between">
                        <Typography variant="body2" className={classes.modeText}>
                            Sorting
                        </Typography>
                    </Box>
                    <ButtonBase className={classes.paymentInfoBtn}>
                        <Box display="flex" alignItems="center">
                            <Typography variant="body1" className={classes.modeText} color="textSecondary">
                                Default
              </Typography>
                        </Box>
                        <Radio color="primary" checked={true} />
                    </ButtonBase>
                    <Divider light orientation="horizontal" />
                    <ButtonBase className={classes.paymentInfoBtn}>
                        <Box display="flex" alignItems="center">
                            <Typography variant="body1" className={classes.modeText} color="textSecondary">
                                Ascending(A-Z)
              </Typography>
                        </Box>
                        <Radio color="primary" checked={true} />
                    </ButtonBase>
                    <Divider light orientation="horizontal" />
                    <ButtonBase className={classes.paymentInfoBtn}>
                        <Box display="flex" alignItems="center">
                            <Typography variant="body1" className={classes.modeText} color="textSecondary">
                                Descending(Z-A)
              </Typography>
                        </Box>
                        <Radio color="primary" checked={true} />
                    </ButtonBase>
                    <Divider light orientation="horizontal" />
                    <ButtonBase className={classes.paymentInfoBtn}>
                        <Box display="flex" alignItems="center">
                            <Typography variant="body1" className={classes.modeText} color="textSecondary">
                                Price(Low - High)
              </Typography>
                        </Box>
                        <Radio color="primary" checked={true} />
                    </ButtonBase>
                    <Divider light orientation="horizontal" />
                    <ButtonBase className={classes.paymentInfoBtn}>
                        <Box display="flex" alignItems="center">
                            <Typography variant="body1" className={classes.modeText} color="textSecondary">
                                Price(High - Low)
              </Typography>
                        </Box>
                        <Radio color="primary" checked={true} />
                    </ButtonBase>
                    <Divider light orientation="horizontal" />
                </DialogContent>
                <DialogActions>
                    <Box
                        style={{ background: "white", width: "100%" }}
                        //   display="flex"
                        textAlign="center"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            disableElevation
                            className={classes.doneBtn}
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <Typography
                                variant="button"
                                align="center"
                            >
                                Done
            </Typography>
                        </Button>
                        <Box />
                        <Button
                            variant="text"
                            className={classes.doneBtn}
                            onClick={props.toggleModal}
                        >
                            <Typography
                                variant="button"
                                align="center"
                                color="textPrimary"
                            >
                                Cancel
            </Typography>
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default React.memo(FilterModal);
