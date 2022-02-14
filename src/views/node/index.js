import React, { useEffect, useContext } from 'react';

// get unique identifier
import uuid from 'react-uuid';

//import context
import MainlistContext from '../../contexts/mainlist/mainlistContext';
import { makeStyles } from '@material-ui/styles';


//import nodeItem components
import NodePropertyItem from './NodePropertyItem';

// material-ui
import { Grid, Tab, Box, Typography, Button, CardActions } from '@material-ui/core';

import {TabContext, TabPanel,TabList} from '@material-ui/lab';
// import { Typography } from '@material-ui/core';
// import MuiTypography from '@material-ui/core/Typography';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import SubCard from './../../ui-component/cards/SubCard';
import {List,ListItem,Divider} from '@material-ui/core';
import { gridSpacing } from './../../store/constant';

//Cytoscape components
import CytoscapeComponent from 'react-cytoscapejs/src/component';
import {CytoscapeObj} from './CytoscapeComponent';
import { gridSortModelSelector } from '@material-ui/data-grid';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Image from '@material-ui/icons/Image';
import ReactPlayer from 'react-player/youtube';
import Movie from '@material-ui/icons/Movie';
import Launch from '@material-ui/icons/Launch';


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

//==============================|| SAMPLE PAGE ||==============================//

const Node = ({ match }) => {
    const classes = useStyles();
    const mainlistContext = useContext(MainlistContext);
    const { nodes, cytoscape_nodes,cytoscape_edges, cytoscape_data, current_node_data, getNodes, nodeSummary, loading } = mainlistContext;
    const [value, setValue] = React.useState("0");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const list_of_properties_to_exclude = ["label","id","type","comment","accessURL"];
    const date_arr=["date","Date"];




    let current_node_type = '';

    try{
        current_node_type = ' ('+ current_node_data._fields[0].properties["type"]  +')';
    }
    catch(err){

    }

    useEffect(() => {
        //supplies the nodeid to src/contexts/mainlist/MainlistState.js
        getNodes(match.params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const showAccessURL = (link) => {
        if (link.includes("theonlinecitizen.com")){
            return(
                <br>
                </br>
            );
        } else if (link.includes('pdf')) {
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
        <MainCard title={
            nodeSummary.label + current_node_type
            }>
            <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} position="static">
                <Tab label="Text View" value="0" />
                <Tab label="Graph View" value="1" />
            </TabList>
            </Box>
            <TabPanel value="0">


            <Grid container spacing={gridSpacing}>
                {
                    current_node_data && (Object.keys(current_node_data._fields[0].properties).length > list_of_properties_to_exclude.length) &&
                    <Grid item xs={12} sm={12} key={"Main Information" }>
                        <SubCard title={'Main Information about ' + current_node_data._fields[0].properties["label"] + current_node_type}>
                            <Grid container spacing={gridSpacing}>
                                {
                                    console.log(current_node_data._fields[0].properties)
                                }
                                {
                                    console.log(Object.keys(current_node_data._fields[0].properties))
                                }
                                {
                                    (current_node_data._fields[0].properties != null) &&
                                    <List>
                                        {
                                            Object.keys(current_node_data._fields[0].properties).sort().map(
                                                (key,index) => {

                                                    if(!list_of_properties_to_exclude.includes(key)) {
                                                        if (key.toUpperCase().includes("DATE")) {
                                                            return (
                                                                <ListItem>
                                                                    <Grid container alignItems="flex-start"
                                                                          justifyContent="space-between"
                                                                          direction="row">
                                                                        <Grid item lg={6} md={6} sm={6} xs={12}
                                                                              key={uuid()}>
                                                                            <Grid item>
                                                                                <Typography variant="subtitle1"
                                                                                            color="inherit">
                                                                                    {key[0].toUpperCase() + key.substring(1)}:
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography variant="subtitle2"
                                                                                            color="inherit">
                                                                                    {current_node_data._fields[0].properties[key].day.low}/{current_node_data._fields[0].properties[key].low}/
                                                                                    {current_node_data._fields[0].properties[key].year.low}
                                                                                </  Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Divider />
                                                                    </Grid>
                                                                </ListItem>
                                                            )
                                                        } else if (key.includes("accessURL")) {
                                                            return (
                                                                <ListItem>
                                                                    <Grid container alignItems="flex-start"
                                                                          justifyContent="space-between"
                                                                          direction="row">
                                                                        <Grid item lg={6} md={6} sm={6} xs={12}
                                                                              key={uuid()}>
                                                                            <Grid item>
                                                                                <Typography variant="subtitle1"
                                                                                            color="inherit">
                                                                                    {key[0].toUpperCase() + key.substring(1)}:
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography variant="subtitle2"
                                                                                            color="inherit">
                                                                                    <a href={current_node_data._fields[0].properties[key]}
                                                                                       style={{ textDecoration: 'none' }}>
                                                                                        {current_node_data._fields[0].properties[key]}
                                                                                    </a>
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Divider />
                                                                    </Grid>
                                                                </ListItem>
                                                            )
                                                        } else {
                                                            return (
                                                                <ListItem>
                                                                    <Grid container alignItems="flex-start"
                                                                          justifyContent="space-between"
                                                                          direction="row">
                                                                        <Grid item lg={6} md={6} sm={6} xs={12}
                                                                              key={uuid()}>
                                                                            <Grid item>
                                                                                <Typography variant="subtitle1"
                                                                                            color="inherit">
                                                                                    {key[0].toUpperCase() + key.substring(1)}:
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography variant="subtitle2"
                                                                                            color="inherit">
                                                                                    {current_node_data._fields[0].properties[key]}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Divider />
                                                                    </Grid>
                                                                </ListItem>
                                                            )
                                                        }
                                                    }
                                                }
                                            )
                                        }
                                        {
                                            current_node_data._fields[0].properties["comment"] && (current_node_data._fields[0].properties["comment"].length > 0) &&
                                            <ListItem>
                                                <Grid container alignItems="flex-start" justifyContent="space-between" direction="row">
                                                    <Grid item lg={6} md={6} sm={6} xs={12} key={uuid()}>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            Comment
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="inherit">
                                                            {
                                                                current_node_data._fields[0].properties["comment"].split("\\n").map(textLine => (
                                                                    <span>
                                                                        <br/>
                                                                        {textLine.replace(/[\u0000-\u001F\u007F-\u009F\ufff0-\uffff]/g, "")}
                                                                        <br/>
                                                                    </span>
                                                                ))
                                                            }
                                                        </Typography>
                                                    </Grid>
                                                    <Divider/>
                                                </Grid>
                                            </ListItem>
                                        }
                                        {
                                            current_node_data._fields[0].properties["accessURL"]  &&
                                            <ListItem>
                                                <Grid container alignItems="flex-start" justifyContent="space-between" direction="row">
                                                    <Grid item lg={6} md={6} sm={6} xs={12} key={uuid()}>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            AccessURL:
                                                        </Typography>
                                                        {current_node_data._fields[0].properties["accessURL"].map((link, index) => (
                                                            <Grid item key={index}>
                                                                <Typography variant="subtitle2" color="inherit">
                                                                    <a href={link} style={{ textDecoration: 'none' }}>
                                                                        {showAccessURL(link)}
                                                                    </a>
                                                                </Typography>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                    <Divider/>
                                                </Grid>
                                            </ListItem>
                                        }

                                    </List>

                                }
                            </Grid>
                        </SubCard>
                    </Grid>
                }
                {
                    nodes.map((node) => (

                    <Grid item xs={12} sm={12} key={node.group}>
                        <SubCard
                            title={node.group}
                            node={node}
                            sign={node.sign}
                            >
                            <Grid container spacing={gridSpacing}>
                                {
                                    node.properties.map((property) => (
                                    <Grid item lg={6} md={6} sm={6} xs={12} key={uuid()}>
                                        <NodePropertyItem loading={loading} property={property} key={property.id} />
                                    </Grid>
                                ))
                                }
                            </Grid>
                        </SubCard>
                    </Grid>

                ))}
            </Grid>
            </TabPanel>
            <TabPanel value="1">
                <Grid id={"CytoscapePanelGrid"} itemID={"CytoscapePanelGrid"}>
                <CytoscapeObj
                    height={1000}
                    width={1000}
                    elements={
                        CytoscapeComponent.normalizeElements({
                        nodes:cytoscape_nodes,
                        edges:cytoscape_edges
                    })}
                    cytoscape_data = {cytoscape_data}
                />
                </Grid>
            </TabPanel>
            </TabContext>
        </MainCard>
    );
};

export default Node;

// <NodeItem property={property} key={property.id} />
