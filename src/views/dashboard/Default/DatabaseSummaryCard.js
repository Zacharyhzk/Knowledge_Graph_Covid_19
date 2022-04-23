import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import SkeletonEarningCard from '../../../ui-component/cards/Skeleton/EarningCard';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.primary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
        }
    },
    content: {
        padding: '20px !important'
    },
   
    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px'
    },
    subHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        color: theme.palette.primary[200]
    },
   
}));

//===========================|| Summary Card ||===========================//

const DatabaseSummaryCard = ({ isLoading, literatureCounter, summaryCounter, causeEffectCounter}) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <Grid container direction="column">
                    
                    <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography className={classes.cardHeading}>{summaryCounter}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography className={classes.subHeading}>Total Studies</Typography>
                        </Grid>

                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography className={classes.cardHeading}>{literatureCounter}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography className={classes.subHeading}>Total Literature Review</Typography>
                        </Grid>

                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography className={classes.cardHeading}>{causeEffectCounter}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography className={classes.subHeading}>Total Cause-Effects</Typography>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </React.Fragment>
    );
};

DatabaseSummaryCard.propTypes = {
    isLoading: PropTypes.bool
};

export default DatabaseSummaryCard;
