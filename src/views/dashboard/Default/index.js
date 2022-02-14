import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import TotalNodesCard from './TotalNodesCard';
import ProfileCard from './ProfileCard';

// import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from './../../../store/constant';

import axios from 'axios';

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = () => {
    const [counter, setCounter] = useState(0);
    const [bioCounter, setBioCounter] = useState(0)
    const [songList, setSongList] = useState([]);
    const [songCounter, setSongCounter] = useState(0)
    const [photoList, setPhotoList] = useState([]);

    const getEssayCount = async () => {
        const res = await axios.get('https://chriskhoo.net/ZS/0/Essay');

        var data = res.data;
        var loopData = [];
        
        var count = data.length - 1;
        setCounter(count);
    };

    const getBioCount = async () => {
        const res = await axios.get('https://chriskhoo.net/ZS/0/Biography');

        var data = res.data;
        var loopData = [];
        
        var count = data.length - 1;
        setBioCounter(count);
    };



    const getSongs = async () => {
        const res = await axios.get('https://chriskhoo.net/ZS/0/MusicalWork');

        var data = res.data;
        var loopData = [];
        var songId = [];
        var scoreId = [];

        for (var i = 0; i < data.length; i++) {
            if ((data[i]._fields[2].properties.type = 'MusicalWork')) {
                loopData.push(data[i]._fields[2].properties);
            }
        }

        var songurl = 'https://chriskhoo.net/ZS/0/VideoFile'
        const res2 = await axios.get(songurl);
        const data2 = res2.data
        var playlist = []
        for (var i = 1; i < data2.length; i++) {
            for(var t=0; t<data2[i]._fields[2].properties.accessURL.length; ++t) {
                if(data2[i]._fields[2].properties.accessURL[t].includes('youtube')) {
                    var newSong = []
                    newSong.push(data2[i]._fields[2].properties.accessURL);
                    newSong.push(data2[i]._fields[2].properties.label)
                    var isUniqueSong = true
                    for(var u=0; u<playlist.length; u++) {
                        var currentSong = playlist[u]
                        if(newSong[0] == currentSong[0]) {
                            isUniqueSong = false
                        }
                        if(!isUniqueSong) {
                            break
                        }
                    }
                    if(isUniqueSong) {
                        playlist.push(newSong);
                    }
                }  
            }
        } 
       
        setSongCounter(playlist.length)
        setSongList(playlist) 
    };

    const getPhotos = async () => {
        const res = await axios.get('https://chriskhoo.net/ZS/0/Photograph');

        var data = res.data;
        var loopData = [];
       
        for (var i = 1; i < data.length; i++) {
            loopData.push(data[i]._fields[2].properties.accessURL);
        }
        setPhotoList(loopData)
    }

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
        getEssayCount();
        getEssayCount();
        getBioCount();
        getSongs();
        getPhotos();
    }, []);

    const section = {
        height: '100%'
        // paddingTop: 5
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} direction="row">
                    <Grid item xs={12} md={6}>
                        {/* <TotalNodesCard isLoading={isLoading} essayCount={counter} songCount={songCounter} bioCount={bioCounter} style={section} /> */}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <ProfileCard isLoading={isLoading} style={section} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                        <TotalOrderLineChartCard isLoading={isLoading} songList={songList} style={section} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* <TotalGrowthBarChart isLoading={isLoading} photoList={photoList} style={section} /> */}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
