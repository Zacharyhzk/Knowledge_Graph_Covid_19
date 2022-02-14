import PropTypes from 'prop-types';
import React, {useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, MenuItem } from '@material-ui/core';
import { Table,TableBody ,TableCell, TableContainer,TableHead,TableRow ,Paper} from '@mui/material';
// import { Avatar, Button } from '@material-ui/core';

// third-party
// import Chart from 'react-apexcharts';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import SkeletonTotalOrderCard from './../../../ui-component/cards/Skeleton/EarningCard';

// import ChartDataMonth from './chart-data/total-order-month-line-chart';
// import ChartDataYear from './chart-data/total-order-year-line-chart';

// assets
// import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

//Music Player
import ReactPlayer from 'react-player';

import { gridSpacing } from './../../../store/constant';

import { Link } from 'react-router-dom';

import MusicNoteIcon from '@material-ui/icons/MusicNote';


// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.primary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&>div': {
            position: 'relative',
            zIndex: 5
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.primary[800],
            borderRadius: '50%',
            zIndex: 1,
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
            zIndex: 1,
            width: '210px',
            height: '210px',
            background: theme.palette.primary[800],
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
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.primary[800],
        color: '#fff',
        marginTop: '8px'
    },
    cardHeading: {
        fontSize: '1.3rem',
        fontWeight: 500,
        marginRight: '8px',
        marginBottom: '6px'
    },
    subHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        color: theme.palette.primary[200]
    },
    avatarCircle: {
        ...theme.typography.smallAvatar,
        cursor: 'pointer',
        backgroundColor: theme.palette.primary[200],
        color: theme.palette.primary.dark
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    }
}));

//-----------------------|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||-----------------------//

const TotalOrderLineChartCard = ({ isLoading, songList}) => {
    const classes = useStyles();
    const [isOpened, setIsOpened] = useState(false);
    const [url, setUrl] = useState("")
      const load = url => {
        setIsOpened(true)
        setUrl(url)
      }
   
    return (
        <React.Fragment>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <Grid container direction="column">
                        <Grid item sx={{ mb: 0.75 }}>
                            <Grid container alignItems="center" spacing={gridSpacing}>
                                <Grid container alignItems="center" justifyContent="space-between" >
                                        <Grid item>
                                            <Typography variant="h3" paddingTop="20px" paddingLeft="25px">Videos of Zubir Said </Typography>
                                        </Grid>
                                </Grid>
                                {isOpened && (
                                <Grid item xs={12}>
                                    <ReactPlayer
                                        url={url}
                                        width="100%"
                                        playing={false}
                                        controls={true}
                                    />
                                </Grid>
                                )}
                                <Grid item xs={12}>
                                    <div className="container">
                                        <h3 style={{textAlign: 'center' }}>Video Playlist</h3>
                                            {/*<table className="table table-striped table-bordered">*/}
                                            {/*    <tbody>*/}
                                            {/*        { songList.map(song =>*/}
                                            {/*             <tr style={{cursor: 'pointer' }}>*/}
                                            {/*                <th style={{textAlign:'center'}} onClick={() => load(song[0])}>{song[1]}</th>*/}
                                            {/*            </tr>*/}
                                            {/*            */}
                                            {/*        )}*/}
                                            {/*    </tbody>*/}
                                            {/*</table>*/}
                                            <TableContainer component = {Paper}>
                                                <Table>
                                                    { songList.map((song,index) =>
                                                        <TableRow style={
                                                            index % 2 ? {cursor: 'pointer', background:"white"} : {cursor: 'pointer', background:"whitesmoke"}
                                                        }>
                                                            <TableCell align={"center"} onClick={() => load(song[0])}>{song[1]}</TableCell>
                                                        </TableRow>
                                                    )}
                                                </Table>
                                            </TableContainer>
                                     </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </React.Fragment>
    );
};

TotalOrderLineChartCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
