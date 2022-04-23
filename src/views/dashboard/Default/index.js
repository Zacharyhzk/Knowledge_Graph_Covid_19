import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports

import DatabaseSummaryCard from './DatabaseSummaryCard';
import ProfileCard from './ProfileCard';


import { gridSpacing } from '../../../store/constant';



//-----------------------|| DEFAULT DASHBOARD ||-----------------------//
const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  "neo4j+s://fc5b611c.databases.neo4j.io",
  neo4j.auth.basic("anonymous", "anonymous")
);
const query = `MATCH (n:Summary) RETURN n`;
const query2 = `MATCH (n:Study) RETURN n`;
const query3 = `MATCH (n:Cause_Effect) RETURN n`;


// get All Attrs
function getAllAttrs(array) {
  var arr = array.map((item) => {
    return item._fields[0].properties;
  });
  return arr;
}

async function retrieve(queryText) {
  const session = driver.session({ defaultAccessMode: neo4j.session.READ });
  try {
    const result = await session.readTransaction((tx) =>
      tx.run(queryText)
    );
    var output = getAllAttrs(result.records);
    // debugger
    return output;
  } catch (error) {
    console.log(`unable to execute query. ${error}`);
  } finally {
    session.close();
  }
}


const Dashboard = () => {
    const [literatureCounter, setLiteratureReviewCounter] = useState(0);
    const [summaryCounter, setSummaryCounter] = useState(0);
    const [causeEffectCounter, setCauseEffectCounter] = useState(0);
      
    const getLiteratureReviewCounter = async () => {  
        var literatureNumber = await retrieve(query);
        var loopData = 0;
        if(literatureNumber !== undefined){loopData = literatureNumber.length;}    
        setLiteratureReviewCounter(loopData);
      };

      const getSummaryCounter = async () => {
        var summaryNumber = await retrieve(query2);
        var loopData = 0;
        if(summaryNumber !== undefined){loopData = summaryNumber.length;}
        setSummaryCounter(loopData);
      };

      const getCauseEffectCounter = async () => {
        var causeEffectNumber = await retrieve(query3);
        var loopData = 0;
        if(causeEffectNumber !== undefined){loopData = causeEffectNumber.length;}
        setCauseEffectCounter(loopData);
      };
    
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
        getLiteratureReviewCounter();
        getSummaryCounter();
        getCauseEffectCounter ();
        
    }, []);

    const section = {
        height: '100%'
        // paddingTop: 5
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} direction="row">
                    

                    <Grid item xs={12} md={12}>
                        <ProfileCard isLoading={isLoading} style={section} />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <DatabaseSummaryCard isLoading={isLoading} literatureCounter={literatureCounter} 
                        summaryCounter={summaryCounter} causeEffectCounter={causeEffectCounter} style={section} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                        {/* <TotalOrderLineChartCard isLoading={isLoading} songList={songList} style={section} /> */}
                        {/* <ProfileCard isLoading={isLoading} style={section} /> */}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* <TotalGrowthBarChart isLoading={isLoading} photoList={photoList} style={section} /> */}
                        {/* <ProfileCard isLoading={isLoading} style={section} /> */}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
