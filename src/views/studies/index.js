import React, { useEffect, useState, useContext } from "react";

// material-ui
import { Grid } from "@material-ui/core";

// // project imports
import SummaryCard from "./SummaryCard";
import CauseEffectCard from "./CauseEffectCard";
import CauseCard from "./CauseCard";
import KGCard from "./KGCard";

// import ProfileCard from './ProfileCard';

// // import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// // import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// // import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from "./../../store/constant";

//Cytoscape components
import CytoscapeComponent from "react-cytoscapejs/src/component";
import { CytoscapeObj } from "../node/CytoscapeComponent";

//import context
import MainlistContext from "../../contexts/mainlist/mainlistContext";

import axios from "axios";

//-----------------------|| STUDIES ||-----------------------//
const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  "neo4j+s://fc5b611c.databases.neo4j.io",
  neo4j.auth.basic("anonymous", "anonymous")
);
const query = `MATCH (n:Study {id: $param}) RETURN n`;
const query2 = `MATCH (study {id: $param})-[:cause_effect]-(CE) RETURN CE`;
const query3 = `MATCH (cause_effect {id: $param })-[:cause]-(CE) RETURN CE`

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
    // debugger
    return output;
  } catch (error) {
    console.log(`unable to execute query. ${error}`);
  } finally {
    session.close();
  }
}

const Studies = () => {
  const [studyList, setStudyList] = useState([]);
  const [causeEffectList, setCauseEffectList] = useState([]);
  const [causeList, setCauseList] = useState([]);


  const mainlistContext = useContext(MainlistContext);
  const {
    nodes,
    cytoscape_nodes,
    cytoscape_edges,
    cytoscape_data,
    current_node_data,
    getNodes,
    nodeSummary,
    loading,
  } = mainlistContext;

  const getStudySummary = async () => {
    // console.log(window.location.href)
    // debugger
    var thePath = window.location.href;
    const idFromPath = thePath.substring(thePath.lastIndexOf("/") + 1);
    var studiesSummary = await retrieve(idFromPath, query);
    var loopData = [];
    loopData = studiesSummary[0];
    setStudyList(loopData);
    // console.log(studyList)
    // debugger
  };

  const getCauseEffect = async () => {
    var thePath = window.location.href;
    const idFromPath = thePath.substring(thePath.lastIndexOf("/") + 1);
    var causeEffectsSummary = await retrieve(idFromPath, query2);
    var loopData = [];
    loopData = causeEffectsSummary;
    setCauseEffectList(loopData);
  };

  const getCause = async () => {
    var thePath = window.location.href;
    const idFromPath = thePath.substring(thePath.lastIndexOf("/") + 1);
    var causeSummary = await retrieve("Becker2005-CauseEffect1", query3);
    var loopData = [];
    loopData = causeSummary;
    setCauseList(loopData);
    // debugger
  };

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    getStudySummary();
    getCauseEffect();
  }, []);

  useEffect(() => {
    getCause();
  }, causeList);
  

  const section = {
    height: "100%",
    // paddingTop: 5
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing} direction="row">
          <Grid item xs={12} md={6}>
            <SummaryCard
              studyList={studyList}
              isLoading={isLoading}
              style={section}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CauseEffectCard
              causeEffectList={causeEffectList}
              isLoading={isLoading}
              style={section}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing} direction="row">
          <Grid item xs={12} md={6}>
            <CauseCard
              causeList={causeList}
              isLoading={isLoading}
              style={section}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing} direction="row">
          <Grid item xs={12} md={6}>
            <CytoscapeObj
                height={1000}
                width={1000}
                elements={CytoscapeComponent.normalizeElements({
                  nodes: cytoscape_nodes,
                  edges: cytoscape_edges,
                })}
                cytoscape_data={cytoscape_data}
              />
          </Grid>
        </Grid>
      </Grid> */}
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12} id={"CytoscapePanelGrid"} itemID={"CytoscapePanelGrid"}>
              <CytoscapeObj
                height={1000}
                width={1000}
                elements={CytoscapeComponent.normalizeElements({
                  nodes: cytoscape_nodes,
                  edges: cytoscape_edges,
                })}
                cytoscape_data={cytoscape_data}
              />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Studies;
