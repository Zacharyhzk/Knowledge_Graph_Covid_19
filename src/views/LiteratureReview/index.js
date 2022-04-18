import React, { useEffect, useState, useContext } from "react";

// material-ui
import { Grid } from "@material-ui/core";
import { gridSpacing } from "./../../store/constant";

// // project imports
// import SummaryCard from "./SummaryCard";
import CauseEffectCard from "./CauseEffectCard";
import KeyCauseEffectCard from "./Key-Cause-Effects"
import MeasureCard from "./Measures"
import SummaryCard from "./Summary"


const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
    "neo4j+s://fc5b611c.databases.neo4j.io",
    neo4j.auth.basic("anonymous", "anonymous")
);
const query = `MATCH ()-[r: cause_effect]->(RE:Cause_Effect) RETURN RE`;
const query2 = `MATCH ()-[r:key_cause_effect]->(RE:Cause_Effect) RETURN RE`;
const query3 = `MATCH ()-[r:measure]->(re:Measure) RETURN re`;
const query4 = `MATCH (n:Summary) RETURN n`;

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
        return output;
    } catch (error) {
        console.log(`unable to execute query. ${error}`);
        debugger
    } finally {
        session.close();
    }
    // debugger
}




const LiterReview = ({match}) => {
    const [causeEffectList, setCauseEffectList] = useState([]);
    const getCauseEffect = async () => {
        var causeEffectsSummary = await retrieve(query);

        // debugger
        var loopData = [];
        // debugger
        loopData = causeEffectsSummary;
        setCauseEffectList(loopData);
    };

    const [keyCauseEffectList, setKeyCauseEffectList] = useState([]);
    const getKeyCauseEffect = async () => {
        var keyCauseEffectsSummary = await retrieve(query2);

        // debugger
        var loopData = [];
        // debugger
        loopData = keyCauseEffectsSummary;
        setKeyCauseEffectList(loopData);
    };

    const [measureList, setMeasureList] = useState([]);
    const getMeasure = async () => {
        var MeasureSummary = await retrieve(query3);

        var loopData = [];

        loopData = MeasureSummary;
        setMeasureList(loopData);
    };
   
    const [summarylist, setSummaryList] = useState([]);
    const getSummary = async () => {
        var SummarySummary = await retrieve(query4);

        var loopData = [];

        loopData = SummarySummary;
        setSummaryList(loopData);
    };


    useEffect(() => {
        getCauseEffect();
        getKeyCauseEffect();
        console.log(match,"1233")
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
                    <Grid item xs={12} md={6}>
                        <KeyCauseEffectCard
                            causeEffectList={keyCauseEffectList}
                        />
                    </Grid>
                </Grid>
            </Grid>
            {/* <Grid item xs={12}>
                <Grid container spacing={gridSpacing} direction="row">
                    <Grid item xs={12} md={6}>
                        <KeyCauseEffectCard
                            causeEffectList={keyCauseEffectList}
                        />
                    </Grid>
                </Grid>
            </Grid> */}

        </Grid>
    );
}

export default LiterReview;
