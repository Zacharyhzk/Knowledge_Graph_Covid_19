import React, { useEffect, useState, useContext } from "react";

// // project imports
import SummaryCard from "./SummaryCard";
import CauseEffectCard from "./CauseEffectCard";
import KeyCauseEffectCard from "./KeyCauseEffectCard";
import CauseCard from "./CauseCard";
import EffectCard from "./EffectCard";
import MeasureCard from "./MeasureCard";
import KGCard from "./KGCard";
// material-ui
import { makeStyles } from "@material-ui/styles";
import { TabContext, TabPanel, TabList } from "@material-ui/lab";
// material-ui
import {
  Grid,
  Tab,
  Box,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";
import MainCard from "../../ui-component/cards/MainCard";
import { gridSpacing } from "./../../store/constant";

//Cytoscape components
import CytoscapeComponent from "react-cytoscapejs/src/component";
import { CytoscapeObj } from "../node/CytoscapeComponent";

//import context
import MainlistContext from "../../contexts/mainlist/mainlistContext";

//-----------------------|| STUDIES ||-----------------------//
const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  "neo4j+s://fc5b611c.databases.neo4j.io",
  neo4j.auth.basic("anonymous", "anonymous")
);
const query = `MATCH (n:Study {id: $param}) RETURN n`;
const query2 = `MATCH (CE {id: $param})-[:cause_effect]-() RETURN CE`;
const query3 = `MATCH (cause_effect {id: $param })-[:cause]-(CE) RETURN CE`;
const query4 = `MATCH (cause_effect {id: $param })-[:effect]-(CE) RETURN CE`;
const query5 = `MATCH (study {id: $param})-[:key_cause_effect]-(CE) RETURN CE`;
const query6 = `MATCH ({id: $param})-[:cause_effect]-()-[:cause]-()-[:measure]-(CE) RETURN CE`;
const query7 = `MATCH ({id: $param})-[:cause_effect]-()-[:effect]-()-[:measure]-(CE) RETURN CE`;


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

const Studies = ({ match }) => {
  const [studyList, setStudyList] = useState([]);
  const [causeEffectList, setCauseEffectList] = useState([]);
  const [keyCauseEffectList, setKeyCauseEffectList] = useState([]);
  const [causeList, setCauseList] = useState([]);
  const [effectList, setEffectList] = useState([]);
  const [measureCauseList, setMeasureCauseList] = useState([]);
  const [measureEffectList, setMeasureEffectList] = useState([]);
  const [value, setValue] = useState("0");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let summaryLoc = localStorage.getItem("Summary");
  let measureLoc = localStorage.getItem("Measure");
  let causeEffectLoc = localStorage.getItem("Cause-Effect");
  let keyCauseEffectLoc = localStorage.getItem("Key-Cause-Effect");

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
    var studiesSummary = await retrieve(match.params.id, query);
    var loopData = [];
    loopData = studiesSummary[0];
    setStudyList(loopData);
  };

  const getCauseEffect = async () => {
    var causeEffectsSummary = await retrieve(match.params.id, query2);
    var loopData = [];
    loopData = causeEffectsSummary;
    setCauseEffectList(loopData);
    // debugger
  };

  const getMeasureCause = async () => {
    var measureSummary = await retrieve(match.params.id, query6);
    var loopData = [];
    loopData = measureSummary;
    setMeasureCauseList(loopData);
    // debugger
  };

  const getMeasureEffect = async () => {
    var measureSummary = await retrieve(match.params.id, query7);
    var loopData = [];
    loopData = measureSummary;
    setMeasureEffectList(loopData);
    // debugger
  };

  const getKeyCauseEffect = async () => {
    var keyCauseEffectsSummary = await retrieve(match.params.id, query5);
    var loopData = [];
    loopData = keyCauseEffectsSummary;
    setKeyCauseEffectList(loopData);
    // debugger
  };

  const getCause = async () => {
    var causeSummary = await retrieve(match.params.id, query3);
    var loopData = [];
    loopData = causeSummary;
    setCauseList(loopData);
    // debugger
  };

  const getEffect = async () => {
    var effectSummary = await retrieve(match.params.id, query4);
    var loopData = [];
    loopData = effectSummary;
    setEffectList(loopData);
    // debugger
  };

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    getStudySummary();
  }, []);

  useEffect(() => {
    getCauseEffect();
  }, causeEffectList);

  useEffect(() => {
    getKeyCauseEffect();
  }, keyCauseEffectList);

  useEffect(() => {
    getCause();
  }, causeList);

  useEffect(() => {
    getEffect();
  }, effectList);

  useEffect(() => {
    getMeasureCause();
  }, measureCauseList);

  useEffect(() => {
    getMeasureEffect();
  }, measureEffectList);

  useEffect(() => {
    const fetchData = async () => {
      await getNodes(match.params.id);
    };
    fetchData();
  }, []);

  const section = {
    height: "100%",
    // paddingTop: 5
  };

  return (
    <MainCard title={nodeSummary.label}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} position="static">
            <Tab label="Text View" value="0" />
            <Tab label="Graph View" value="1" />
          </TabList>
        </Box>
        <TabPanel value="0">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing} direction="row">
                {summaryLoc == "1" ? (
                  <Grid item xs={12} md={12}>
                    <SummaryCard
                      studyList={studyList}
                      isLoading={isLoading}
                      style={section}
                    />
                  </Grid>
                ) : null}
                {causeEffectLoc == "1" ? (
                  <Grid item xs={12} md={12}>
                    <CauseEffectCard
                      causeEffectList={causeEffectList}
                      isLoading={isLoading}
                      style={section}
                    />
                  </Grid>
                ) : null}
                {causeEffectLoc == "1" ? (
                  <Grid item xs={12} md={6}>
                    <CauseCard
                      causeList={causeList}
                      isLoading={isLoading}
                      style={section}
                    />
                  </Grid>
                ) : null}
                {causeEffectLoc == "1" ? (
                  <Grid item xs={12} md={6}>
                    <EffectCard
                      effectList={effectList}
                      isLoading={isLoading}
                      style={section}
                    />
                  </Grid>
                ) : null}
                {measureLoc == "1" ? (
                  <Grid item xs={12} md={12}>
                    <MeasureCard
                      measureList={measureCauseList}
                      isLoading={isLoading}
                      style={section}
                    />
                  </Grid>
                ) : null}
                 {measureLoc == "2" ? (
                  <Grid item xs={12} md={12}>
                    <MeasureCard
                      measureList={measureEffectList}
                      isLoading={isLoading}
                      style={section}
                    />
                  </Grid>
                ) : null}
                {keyCauseEffectLoc === "1" ? (
                  <Grid item xs={12} md={12}>
                    <KeyCauseEffectCard
                      keyCauseEffectList={keyCauseEffectList}
                      isLoading={isLoading}
                      style={section}
                    />
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="1">
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid
                item
                xs={12}
                md={12}
                id={"CytoscapePanelGrid"}
                itemID={"CytoscapePanelGrid"}
              >
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
        </TabPanel>
      </TabContext>
    </MainCard>
  );
};

export default Studies;
