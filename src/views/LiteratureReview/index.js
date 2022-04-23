import React, { useEffect, useState, useContext } from "react";

// material-ui
import { Grid } from "@material-ui/core";
import { gridSpacing } from "./../../store/constant";

// // project imports
// import SummaryCard from "./SummaryCard";
import CauseEffectCard from "./CauseEffectCard";
import KeyCauseEffectCard from "./Key-Cause-Effects";
import MeasureCard from "./Measures";
import SummaryCard from "./Summary";

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
    const result = await session.readTransaction((tx) => tx.run(queryText));
    var output = getAllAttrs(result.records);
    return output;
  } catch (error) {
    console.log(`unable to execute query. ${error}`);
    // debugger
  } finally {
    session.close();
  }
  // debugger
}

const LiterReview = ({ match }) => {
  var thePath = window.location.href;
  const idFromPath = thePath.substring(thePath.lastIndexOf("/") + 1);
  //   let causeEffectLoc = localStorage.getItem("Cause-Effect");
  const [causeEffectList, setCauseEffectList] = useState([]);
  const getCauseEffect = async () => {
    var causeEffectsSummary = await retrieve(query);
    var loopData = [];
    // debugger
    loopData = causeEffectsSummary;
    setCauseEffectList(loopData);
  };

  useEffect(() => {
    getCauseEffect();
    // debugger
  }, causeEffectList);

  const [keyCauseEffectList, setKeyCauseEffectList] = useState([]);
  const getKeyCauseEffect = async () => {
    var keyCauseEffectsSummary = await retrieve(query2);
    var loopData = [];
    loopData = keyCauseEffectsSummary;
    setKeyCauseEffectList(loopData);
  };

  useEffect(() => {
    getKeyCauseEffect();
    // debugger
  }, keyCauseEffectList);

  const [measureList, setMeasureList] = useState([]);
  const getMeasure = async () => {
    var MeasureSummary = await retrieve(query3);
    var loopData = [];
    loopData = MeasureSummary;
    setMeasureList(loopData);
  };

  useEffect(() => {
    getMeasure();
    // debugger
  }, measureList);

  const [summaryList, setSummaryList] = useState([]);

  const getSummary = async () => {
    var summary = await retrieve(query4);
    var loopData = [];
    loopData = summary;
    setSummaryList(loopData);
  };

  useEffect(() => {
    getSummary();
  }, summaryList);

  useEffect(() => {
    getCauseEffect();
    getKeyCauseEffect();
    console.log(match, "1233");
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing} direction="row">
          {idFromPath == "summary" ? (
            <Grid item xs={12} md={12}>
              <SummaryCard summaryList={summaryList} />
            </Grid>
          ) : null}
          {idFromPath == "causeEffect" ? (
            <Grid item xs={12} md={12}>
              <CauseEffectCard causeEffectList={causeEffectList} />
            </Grid>
          ) : null}
          {idFromPath == "keyCauseEffect" ? (
            <Grid item xs={12} md={12}>
              <KeyCauseEffectCard causeEffectList={keyCauseEffectList} />
            </Grid>
          ) : null}
        {idFromPath == "measure" ? (
            <Grid item xs={12} md={12}>
              <MeasureCard measureList={measureList} />
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LiterReview;
