import React, { useEffect, useState, useContext } from "react";

// material-ui
import { Grid } from "@material-ui/core";
import { gridSpacing } from "./../../store/constant";

// // project imports
// import SummaryCard from "./SummaryCard";
import CauseEffectCard from "./CauseEffectCard";


const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
    "neo4j+s://fc5b611c.databases.neo4j.io",
    neo4j.auth.basic("anonymous", "anonymous")
);
const query = `MATCH ()-[r: $param]->(RE:Cause_Effect) RETURN RE`;
const query2 = `MATCH (study {id: $param})-[:cause_effect]-(CE) RETURN CE`;
const query3 = `MATCH (cause_effect {id: $param })-[:cause]-(CE) RETURN CE`;
const query4 = `MATCH (cause_effect {id: $param })-[:effect]-(CE) RETURN CE`;

// get All Attrs
function getAllAttrs(array) {
    var arr = array.map((item) => {
      return item._fields[0].properties;
    });
    return arr;
  }

async function retrieve(parameter, queryText) {
    const session = driver.session({ defaultAccessMode: neo4j.session.READ });
    try {
        const result = await session.readTransaction((tx) =>    
        tx.run(queryText, { param: parameter })
        );
        var output = getAllAttrs(result.records);
       
        await  console.log(result,"123");
        // debugger
        return output;
    } catch (error) {
        debugger
        console.log(`unable to execute query. ${error}`);
    } finally {
        session.close();
    }
    // debugger
}




const LiterReview = () => {
    const [causeEffectList, setCauseEffectList] = useState([]);
    const getCauseEffect = async () => {
        var thePath = window.location.href;
        const idFromPath = thePath.substring(thePath.lastIndexOf("/") + 1);
        var causeEffectsSummary = await retrieve("cause_effect", query);
        
        // debugger
        var loopData = [];
        // debugger
        loopData = causeEffectsSummary;
        setCauseEffectList(loopData);
    };

    useEffect(() => {
        getCauseEffect();
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} direction="row">
                    <Grid item xs={12} md={6}>
                        <CauseEffectCard
                            causeEffectList={causeEffectList}
                        />
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    );
}

export default LiterReview;
