import React, { useReducer } from 'react';
import axios from 'axios';
import MainlistContext from './mainlistContext';
import MainlistReducer from './mainlistReducer';
import { GET_CARDS, GET_NODES, SET_LOADING } from '../types';
import { nodeStyle, nodeMainStyle, edgeStyle } from '../../views/node/CytoscapeStyle';

const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  "neo4j+s://fc5b611c.databases.neo4j.io",
  neo4j.auth.basic("anonymous", "anonymous")
);

const query = "MATCH (study {id: $param})-[re]-(entity) RETURN study,re,entity"

// async function retrieve(parameter, queryText) 
const retrieve = async (parameter, queryText) =>{
    const session = driver.session({ defaultAccessMode: neo4j.session.READ });
    try {
      const result = await session.readTransaction((tx) =>
        tx.run(queryText, { param: parameter })
      );
      return result;
    } catch (error) {
      console.log(`unable to execute query. ${error}`);
    } finally {
      session.close();
    }
  }

const MainlistState = (props) => {
    const initialState = {
        cards: [],
        nodes: [],
        nodeSummary: [],
        loading: false
    };

    const [state, dispatch] = useReducer(MainlistReducer, initialState);

    //Get Cards
    const getCards = async () => {
        setLoading();
        const res = await axios.get('https://chriskhoo.net/ZS/0/Person');

        var data = res.data;
        var loopData = [];
        for (var i = 0; i < data.length; i++) {
            if(data[i]._fields[0].properties.hasOwnProperty("comment")){
                data[i]._fields[0].properties["comment"]=data[i]._fields[0].properties["comment"].replace(/[\u0000-\u001F\u007F-\u009F\ufff0-\uffff]/g, "")
            }
            if(data[i]._fields[2].properties.hasOwnProperty("comment")){
                data[i]._fields[2].properties["comment"]=data[i]._fields[2].properties["comment"].replace(/[\u0000-\u001F\u007F-\u009F\ufff0-\uffff]/g, "")
            }
            loopData.push(data[i]._fields[2].properties);
        }

        dispatch({
            type: GET_CARDS,
            payload: loopData
        });
    };

    //Get Nodes
    const getNodes = async (nodeid) => {
        setLoading();
        // debugger
        // Fetch data of node (START)

        // const res = await axios.get(`https://chriskhoo.net/ZS/0/${nodeid}`);
        var res = await retrieve(nodeid, query);

        var data = res.records;
        var loopData = [];
        var groups = [];
        var groupsign ={};
        for (var i = 0; i < data.length; i++) {
            if(data[i]._fields[0].properties.hasOwnProperty("comment")){
                data[i]._fields[0].properties["comment"]=data[i]._fields[0].properties["comment"].replace(/[\u0000-\u001F\u007F-\u009F\ufff0-\uffff]/g, "")
            }
            if(data[i]._fields[2].properties.hasOwnProperty("comment")){
                data[i]._fields[2].properties["comment"]=data[i]._fields[2].properties["comment"].replace(/[\u0000-\u001F\u007F-\u009F\ufff0-\uffff]/g, "")
            }
        }
        // debugger

        // Fetch data of node (END)

        /*Cytoscape Portion (START)*/
        let cytoscape_main_node = 'node_' + data[0]._fields[0].properties.id;
        let current_node_name = '';
        let current_node_type = '';
        let cytoscape_nodes = [
            {
                data: {
                    id: cytoscape_main_node,
                    label: data[0]._fields[0].properties.label
                },
                // position: { x: 50, y: 100 }
                style: nodeMainStyle(data[0]._fields[0].properties.label),
                className: ['nodes'],
                classes: ['nodes']
            }
        ];
        let cytoscape_edges = [];
        let popup_data = { a: {} };
        popup_data[data[0]._fields[0].properties.id] = {
            labels: data[0]._fields[0].labels,
            properties: data[0]._fields[0].properties
        };
        let current_node_data = data[0];
        delete popup_data['a'];

        /*Cytoscape Portion (END)*/

        // Group data based on the the group properties (START)
        for (var i = 0; i < data.length; i++) {
            // if (true) {
            if (!data[i]._fields[2].labels.includes("Class")) {
                loopData.push(data[i]._fields);

                //group by type
                var groupName = data[i]._fields[1].properties.label; //e.g. score, can change to [1].type if want to show type instead

                //capitalise first letter of the group name
                groupName = groupName.charAt(0).toUpperCase() + groupName.slice(1);

                if (!groups[groupName]) {
                    groups[groupName] = [];
                }
                groups[groupName].push(data[i]._fields[2].properties);

                console.log(data[i]);
                try{

                    if(groupsign[groupName] == null){
                        let current_sign = ""
                        if (data[i]._fields[0].identity.low !== data[i]._fields[1].start.low)
                        { current_sign = '<='  // relation arrow points backward
                        }
                        else if (data[i]._fields[0].identity.low === data[i]._fields[1].start.low) {
                            current_sign += '=>' // relation arrow points forward
                        }
                        else {
                            current_sign = ""
                        }
                        groupsign[groupName] = {sign:current_sign};
                    }
                }
                catch(err){

                }


            /*Cytoscape Portion (START)*/
            // if (!data[i]._fields[2].labels.includes("Class")) {
                current_node_name = 'node_' + data[i]._fields[2].properties.id;
                cytoscape_nodes.push({
                    data: {
                        id: current_node_name,
                        label: data[i]._fields[2].properties.label
                    },
                    style: nodeStyle(data[i]._fields[2].properties.label),
                    className: ['nodes'],
                    classes: ['nodes']

                    // position: { x: 50, y: 100 }
                });

                // popup_data[data[i]]=data[i]._fields[2];
                popup_data[data[i]._fields[2].properties.id] = {
                    labels: data[i]._fields[2].labels,
                    properties: data[i]._fields[2].properties
                };

                cytoscape_edges.push({
                    data: {
                        id: 'edge_' + cytoscape_main_node + '_' + current_node_name,
                        source: cytoscape_main_node,
                        target: current_node_name,
                        label: data[i]._fields[1].type
                    },
                    style: edgeStyle(data[i]._fields[1].type),
                    className: ['edges'],
                    classes: ['edges']
                });
            }
            /*Cytoscape Portion (END)*/
        }

        //push grouped results into nodeArray based on i.e. realization
        var nodeArray = [];
        for (groupName in groups) {
            // to get all cards including subclasses
            // nodeArray.push({
            //     group: groupName,
            //     properties: groups[groupName]
            // });

            // filter out any subclasses cards
            if (groupName !== ('Subclass of' || 'Type')) {
                nodeArray.push({
                    group: groupName,
                    properties: groups[groupName],
                    sign:groupsign[groupName]["sign"],
                });
            }
        }
        // Group data based on the the group properties (START)

        var nodeSummary = data[0]._fields[0].properties;

        dispatch({
            type: GET_NODES,
            payload: nodeArray,
            payload_cytoscape_nodes: cytoscape_nodes,
            payload_cytoscape_edges: cytoscape_edges,
            payload_cytoscape_data: popup_data,
            payload_current_node_data:current_node_data,
            summary: nodeSummary
        });
    };

    //Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <MainlistContext.Provider
            value={{
                cards: state.cards,
                nodes: state.nodes,
                cytoscape_nodes: state.cytoscape_nodes,
                cytoscape_edges: state.cytoscape_edges,
                cytoscape_data: state.cytoscape_data,
                current_node_data: state.current_node_data,
                nodeSummary: state.nodeSummary,
                loading: state.loading,
                getCards,
                getNodes
            }}
        >
            {props.children}
        </MainlistContext.Provider>
    );
};

export default MainlistState;
