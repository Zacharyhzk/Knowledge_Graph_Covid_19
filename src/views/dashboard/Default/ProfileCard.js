import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import TotalIncomeCard from './../../../ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import ZSProfileImage from './../../../assets/images/zs/zs_profile.jpg';

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
            top: '-160px',
            right: '-130px'
        }
    },
    content: {
        padding: '16px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.primary[800],
        color: '#fff'
    },
    primary: {
        color: '#fff'
    },
    secondary: {
        color: theme.palette.primary.light,
        marginTop: '5px'
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    }
}));

//-----------------------|| DASHBOARD - TOTAL INCOME DARK CARD ||-----------------------//

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
                            <ListItemAvatar>
                                <Avatar variant="rounded" className={classes.avatar} src={ZSProfileImage}></Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                className={classes.padding}
                                sx={{
                                    mt: 0.45,
                                    mb: 0.45
                                }}
                                primary={
                                    <Typography variant="h4" className={classes.primary}>
                                        Zubir Said
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="subtitle2" className={classes.secondary}>
                                        Zubir Said, was known as the composer of Singapore's National Anthem, Majulah Singapura.
                                    </Typography>
                                }
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
                                    <Typography variant="body2" className={classes.secondary}>
                                        Majulah Singapura: Zubir Said and the National Anthem honours the man whose life and works offer an
                                        insight into the socio-political structure of Singapore from the late 1950s to 60s. In particular,
                                        the national anthem Majulah Singapura by Zubir Said (1907-87) can be said to bridge the diverse
                                        social, cultural, and political landscapes of Singapore during turbulent times. As an early advocate
                                        for national music, Zubir wrote songs, articles, and delivered speeches on this topic.
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="body2" className={classes.secondary}>
                                        The objective of this online exhibition on the Majulah Singapura is to represent the network of
                                        concepts to support visualization, associative browsing, and research. Its mindmap-like feature
                                        helps one make correlations between the various artefacts and events surrounding this work. Zubir’s
                                        manuscripts and printed scores, official and personal correspondence, as well as interviews on
                                        various print and online media will help the user build a coherent narrative on the significance of
                                        the national anthem for its people.
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
