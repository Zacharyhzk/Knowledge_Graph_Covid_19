import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import TotalIncomeCard from '../../ui-component/cards/Skeleton/TotalIncomeCard';
import { gridSpacing } from '../../store/constant';

// assets
import MusicNote from '@material-ui/icons/MusicNote';
import Drafts from '@material-ui/icons/Drafts';
import LibraryMusic from '@material-ui/icons/LibraryMusic';
import Description from '@material-ui/icons/Description';

// additional main card assets
import { Button, CardActions, CardContent, Divider, Grid } from '@material-ui/core';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
// import {  Menu, MenuItem } from '@material-ui/core';
// import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';

import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import Launch from '@material-ui/icons/Launch';
import Image from '@material-ui/icons/Image';
import Movie from '@material-ui/icons/Movie';

import ReactPlayer from 'react-player/youtube';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
// import { borderColor, borderTop } from '@material-ui/system';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: 'linear-gradient(210.04deg, ' + theme.palette.warning.dark + ' -50.94%, rgba(144, 202, 249, 0) 83.49%)',
            borderRadius: '50%',
            top: '-30px',
            right: '-180px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: 'linear-gradient(140.9deg, ' + theme.palette.warning.dark + ' -14.02%, rgba(144, 202, 249, 0) 70.50%)',
            borderRadius: '50%',
            top: '-160px',
            right: '-130px'
        }
    },
    content: {
        padding: '0px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main
    },
    secondary: {
        color: theme.palette.grey[500],
        marginTop: '5px'
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    },

    // Additonal styles
    cardAction: {
        padding: '10px',
        justifyContent: 'center'
        // borderTop: '1px solid',
        // borderColor: theme.palette.primary.light
    },
    cardActionImage: {
        padding: '10px',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.light
    },
    primaryLight: {
        color: theme.palette.primary[200],
        cursor: 'pointer'
    },
    divider: {
        marginTop: '12px',
        marginBottom: '12px'
    },
    avatarSuccess: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
        marginLeft: '15px'
    },
    successDark: {
        color: theme.palette.success.dark
    },
    avatarError: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.orange.light,
        color: theme.palette.orange.dark,
        marginLeft: '15px'
    },
    errorDark: {
        color: theme.palette.orange.dark
    }
}));

//-----------------------|| DASHBOARD - TOTAL INCOME LIGHT CARD ||-----------------------//

const NodePropertyItem = ({ loading, property }) => {
    const classes = useStyles();

    //additional logic for the card to have an elipses menu on each card
    // const [anchorEl, setAnchorEl] = React.useState(null);

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    //Render avatar icon based on the property type
    const showAvatarIcon = () => {
        switch (property.type) {
            case 'Letter':
                return <Drafts fontSize="inherit" />;
            case 'Score':
                return <MusicNote fontSize="inherit" />;
            case 'Composer':
                return <LibraryMusic fontSize="inherit" />;
            default:
                return <Description fontSize="inherit" />;
        }
    };

    //Render link text based on the accessURL endpoint
    const showAccessURL = (link) => {
        if (link.includes("theonlinecitizen.com")){
            return(
                <br>
                </br>
            );
        } else if (link.includes('pdf')){
            return (
                <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
                    className={classes.margin}
                    disableElevation
                    startIcon={<PictureAsPdf />}
                >
                    PDF
                </Button>
            );
        } else if (link.includes('jpg') || link.includes('png')) {
            return (
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia component="img" width="auto" image={link} />
                    </CardActionArea>
                    <CardActions className={classes.cardActionImage}>
                        <Button
                            variant="contained"
                            size="medium"
                            color="secondary"
                            className={classes.margin}
                            disableElevation
                            startIcon={<Image />}
                        >
                            Image Source
                        </Button>
                    </CardActions>
                </Card>
            );
        } else if (link.includes('youtube')) {
            return (
                <Card className={classes.root}>
                    <CardActionArea>
                        <ReactPlayer url={link} width="auto" controls="true" />
                    </CardActionArea>
                    <CardActions className={classes.cardActionImage}>
                        <Button
                            variant="contained"
                            size="medium"
                            color="secondary"
                            className={classes.margin}
                            disableElevation
                            startIcon={<Movie />}
                        >
                            Video
                        </Button>
                    </CardActions>
                </Card>
            );
        } else {
            return (
                <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
                    className={classes.margin}
                    disableElevation
                    startIcon={<Launch />}
                >
                    Webpage
                </Button>
            );
        }
    };
    return (
        <React.Fragment>
            {loading ? (
                <TotalIncomeCard />
            ) : (
                <MainCard className={classes.card} contentClass={classes.content}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <List>
                                            <ListItem alignItems="center" disableGutters className={classes.padding}>
                                                <ListItemAvatar>
                                                    <Avatar variant="rounded" className={classes.avatar}>
                                                        {/* Render icon based on the property type in the function showAvatarIcon */}

                                                        {showAvatarIcon()}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    sx={{
                                                        mt: 0.45,
                                                        mb: 0.45
                                                    }}
                                                    className={classes.padding}
                                                    primary={<Typography variant="h4">{property.label}</Typography>}
                                                    secondary={
                                                        <Typography variant="subtitle2" className={classes.secondary}>
                                                            {property.type}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItem>
                                        </List>
                                    </Grid>

                                    {/* <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            className={classes.primaryLight}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}> Today</MenuItem>
                                            <MenuItem onClick={handleClose}> This Month</MenuItem>
                                            <MenuItem onClick={handleClose}> This Year </MenuItem>
                                        </Menu>
                                    </Grid> */}
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                {property.id && (
                                    <Fragment>
                                        <Grid container alignItems="flex-start" justifyContent="space-between" direction="row">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    ID
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2" color="inherit">
                                                    {property.id}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        <Divider className={classes.divider} />
                                    </Fragment>
                                )}

                                {property.birthDate && (
                                    <Fragment>
                                        <Grid container alignItems="flex-start" justifyContent="space-between" direction="row">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    Birth Date
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2" color="inherit">
                                                    {property.birthDate.day.low}/{property.birthDate.month.low}/
                                                    {property.birthDate.year.low}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider className={classes.divider} />
                                    </Fragment>
                                )}

                                {property.deathDate && (
                                    <Fragment>
                                        <Grid container alignItems="flex-start" justifyContent="space-between" direction="row">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    Death Date
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2" color="inherit">
                                                    {property.deathDate.day.low}/{property.deathDate.month.low}/
                                                    {property.deathDate.year.low}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider className={classes.divider} />
                                    </Fragment>
                                )}

                                {property.date && (
                                    <Fragment>
                                        <Grid container alignItems="flex-start" justifyContent="space-between" direction="row">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    Date
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2" color="inherit">
                                                    {property.date.day.low}/{property.date.month.low}/{property.date.year.low}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider className={classes.divider} />
                                    </Fragment>
                                )}

                                {property.streetAddress && (
                                    <Fragment>
                                        <Grid container alignItems="flex-start" justifyContent="space-between" direction="row">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    Address
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2" color="inherit">
                                                    {property.streetAddress}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider className={classes.divider} />
                                    </Fragment>
                                )}

                                {property.addressLocality && (
                                    <Fragment>
                                        <Grid container alignItems="flex-start" justifyContent="space-between" direction="row">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    Vicinity
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2" color="inherit">
                                                    {property.addressLocality}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider className={classes.divider} />
                                    </Fragment>
                                )}

                                {property.comment && (
                                    <Fragment>
                                        <Grid container alignItems="flex-start" justifyContent="space-between" direction="column">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    Comment
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2" color="inherit">
                                                    {
                                                        property.comment.split("\\n").map(textLine => (
                                                            <span>
                                                                <br/>
                                                                {textLine.replace(/[\u0000-\u001F\u007F-\u009F\ufff0-\uffff]/g, "")}
                                                                <br/>
                                                            </span>
                                                        ))
                                                    }
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider className={classes.divider} />
                                    </Fragment>
                                )}

                                {property.accessURL && (
                                    <Fragment>
                                        <Grid container alignItems="center" justifyContent="space-between" direction="row" spacing={2}>
                                            {property.accessURL.map((link, index) => (
                                                <Grid item key={index}>
                                                    <Typography variant="subtitle2" color="inherit">
                                                        <a href={link} style={{ textDecoration: 'none' }}>
                                                            {showAccessURL(link)}
                                                        </a>
                                                    </Typography>

                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Fragment>
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions className={classes.cardAction}>
                        <Link to={`/studies/${property.id}`} style={{ textDecoration: 'none' }}>
                            <Button size="small" disableElevation>
                                {property.label}
                                <ChevronRightOutlinedIcon />
                            </Button>
                        </Link>
                    </CardActions>
                </MainCard>
            )}
        </React.Fragment>
    );
};

NodePropertyItem.propTypes = {
    loading: PropTypes.bool
};

export default NodePropertyItem;
