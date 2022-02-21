import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// // project imports
import SummaryCard from './SummaryCard';
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
const query = `MATCH (n:Study {id: $param}) RETURN n`

// get All Attrs
function getAllAttrs(array) {
    var arr = array.map((item)=>{
        return item._fields[0].properties;
    })
    return arr;
}

async function retrieve(parameter, queryText) {
    const session = driver.session({ defaultAccessMode: neo4j.session.READ })
    try {
        const result = await session.readTransaction(tx =>
            tx.run(queryText, { param: parameter })
        )
        var output = getAllAttrs(result.records)
        // debugger
        return output

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


    const getStudySummary = async () => {
        // console.log(window.location.href)
        var thePath = window.location.href
        const idFromPath = thePath.substring(thePath.lastIndexOf('/') + 1)
        var studiesSummary = await retrieve(idFromPath, query) 
        var loopData = []
        loopData = studiesSummary[0]
        setStudyList(loopData)
        // console.log(studyList)
        // debugger
    }

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
        getStudySummary();
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
                        <SummaryCard studyList={studyList} isLoading={isLoading} essayCount={counter} songCount={songCounter} bioCount={bioCounter} style={section} />
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
