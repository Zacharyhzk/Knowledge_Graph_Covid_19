import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// // project imports
import TotalNodesCard from './TotalNodesCard';
// import ProfileCard from './ProfileCard';

// // import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// // import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// // import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from './../../store/constant';

import axios from 'axios';

//-----------------------|| STUDIES ||-----------------------//
const neo4j = require('neo4j-driver')

const driver = neo4j.driver(
    'neo4j+s://fc5b611c.databases.neo4j.io',
    neo4j.auth.basic('anonymous', 'anonymous')
)
const query = `MATCH (n:Study) RETURN n`

// get Studies Id and Names
function getAttrs(array,attr) {
    var arr = array.map((item)=>{
        return item._fields[0].properties[attr];
    })
    return arr;
}

async function retrieve(parameter, queryText) {
    const session = driver.session({ defaultAccessMode: neo4j.session.READ })
    try {
        const result = await session.readTransaction(tx =>
            tx.run(queryText, { param: parameter })
        )

        var studiesName = getAttrs(result.records,"label")
        var studiesId = getAttrs(result.records,"id")
        // setStudyList(studiesName)
        console.log(studiesName)
        console.log(studiesId)
        return studiesName

    } catch (error) {
        console.log(`unable to execute query. ${error}`)
    } finally {
        session.close()
    }

}

const Studies = () => {
    const [counter, setCounter] = useState(0);
    const [bioCounter, setBioCounter] = useState(0)
    const [songCounter, setSongCounter] = useState(0)

    const [studyList, setStudyList] = useState([]);


    const getStudies = async () => {
        var studiesName = retrieve('Study', query) 
        setStudyList(studiesName)
        // var loopData = [];
        // for (var i = 1; i < data.length; i++) {
        //     loopData.push(data[i]._fields[2].properties.accessURL);
        // }
    }

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
        getStudies();
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
                        <TotalNodesCard isLoading={isLoading} essayCount={counter} songCount={songCounter} bioCount={bioCounter} style={section} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {/* <ProfileCard isLoading={isLoading} style={section} /> */}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                        {/* <TotalOrderLineChartCard isLoading={isLoading} songList={songList} style={section} /> */}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* <TotalGrowthBarChart isLoading={isLoading} photoList={photoList} style={section} /> */}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Studies;
