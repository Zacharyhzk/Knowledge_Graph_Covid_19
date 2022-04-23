import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import TotalIncomeCard from './../../../ui-component/cards/Skeleton/TotalIncomeCard';


// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.warning.dark,
        color: theme.palette.primary.light,
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: 'linear-gradient(210.04deg, ' + theme.palette.primary[200] + ' -50.94%, rgba(144, 202, 249, 0) 83.49%)',
            borderRadius: '50%',
            top: '-30px',
            right: '-180px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: 'linear-gradient(140.9deg, ' + theme.palette.primary[200] + ' -14.02%, rgba(144, 202, 249, 0) 77.58%)',
            borderRadius: '50%',
            // top: '-160px',
            top: '-125px',
            right: '-15px',
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
            // right: '-130px'
        }
    },
    content: {
        padding: '20px !important'
    },
   
    secondary: {
        color: '#fff',
        fontSize: '1.2rem',
        marginTop: '5px'
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    },
    cardHeading: {
        color: '#fff',
        fontSize: '2rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px'
    },
}));

//-----------------------|| Introduction Card||-----------------------//

const ProfileCard = ({ isLoading }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <List className={classes.padding}>
                        <ListItem alignItems="center" disableGutters className={classes.padding}>
                           
                            <ListItemText
                                className={classes.padding}
                                sx={{
                                    mt: 0.45,
                                    mb: 0.45
                                }}
                        
                            />
                        </ListItem>
                    </List>

                    <List className={classes.padding}>
                        <ListItem alignItems="center" disableGutters className={classes.padding}>
                            <ListItemText
                                className={classes.padding}
                                sx={{
                                    mt: 0.45,
                                    mb: 0.45
                                }}
                                primary={
                                    <Typography variant="body2" className={classes.cardHeading}>
                                        Introduction    
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="body2" className={classes.secondary}>
                                        This knowledge graph interface presents research results and summaries in a text-based interface to help policymakers and healthcare professionals make evidence-based scientific decisions quickly during a pandemic.
                                        During a pandemic, policymakers and healthcare professionals have to make evidence-based decisions quickly, based on scientific evidence. Research papers related to healthcare are being published at breakneck speed, making it challenging to keep abreast of different types and quality research findings. Lack of direct presence of discoveries in various academic papers becomes the barrier to quick decision making.
 
                                    </Typography>
                                }
                               
                              
                            />
                        </ListItem>
                    </List>
                </MainCard>
            )}
        </React.Fragment>
    );
};

ProfileCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ProfileCard;
