// assets
import {
  IconPlaylist,
  IconSocial,
  IconArchive,
  IconBulb,
  IconBuildingCommunity,
  IconCalendarEvent,
  IconAward,
  IconMap2,
  IconMessageCircle2,
  IconFileMusic,
  IconFiles,
  IconNotebook,
} from "@tabler/icons";

//import axios
import axios from "axios";

// constant
const icons = {
  IconPlaylist: IconPlaylist,
  IconSocial: IconSocial,
  IconArchive: IconArchive,
  IconBulb: IconBulb,
  IconBuildingCommunity: IconBuildingCommunity,
  IconCalendarEvent: IconCalendarEvent,
  IconAward: IconAward,
  IconMap2: IconMap2,
  IconFiles: IconFiles,
  IconMessageCircle2: IconMessageCircle2,
  IconFileMusic: IconFileMusic,
  IconNotebook: IconNotebook,
};

//-----------------------|| EXTRA PAGES MENU ITEMS ||-----------------------//

const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  "neo4j+s://fc5b611c.databases.neo4j.io",
  neo4j.auth.basic("anonymous", "anonymous")
);
const query = `MATCH (n:Study) RETURN n`;
const query3 = `MATCH (n:Class {label: $param}) RETURN n`;
const query4 = `MATCH (study {id: $param})-[:cause_effect]-(CE) RETURN CE`;

// get Studies Id and Names
function getAttrs(array, attr) {
  var arr = array.map((item) => {
    return item._fields[0].properties[attr];
  });
  return arr;
}

// get all Attrs
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
    // var studiesName = getAttrs(result.records,"label")
    // var studiesId = getAttrs(result.records,"id")

    var output = getAllAttrs(result.records);

    // console.log(studiesName)
    // console.log(studiesId)
    return output;
  } catch (error) {
    console.log(`unable to execute query. ${error}`);
  } finally {
    session.close();
  }
}

const generateTopics = () => {
  let topic = {
    id: "topics",
    title: "topics",
    type: "group",
    children: [
      {
        id: "LiteratureReview",
        title: "LiteratureReview",
        type: "collapse",
        icon: icons["IconNotebook"],
        children: [
          {
            id: "covid-19",
            title: "Covid 19",
            type: "collapse",
            icon: icons["IconNotebook"],
            children: [
              {
                id: "Summary",
                title: "Summary",
                type: "collapse",
                icon: icons["IconNotebook"],
                children: [],
              },
              {
                id: "StudiesAll",
                title: "Studies",
                type: "collapse",
                icon: icons["IconNotebook"],
                children: [],
              },
              {
                id: "Cause-Effects",
                title: "Cause-Effects",
                // type: "collapse",
                type :"item",
                url: `/literReview/`,
                target: false,
                breadcrumbs: false,
                icon: icons["IconNotebook"],
              },
              {
                id: "Key-Cause-Effects",
                title: "Key-Cause-Effects",
                type: "collapse",
                icon: icons["IconNotebook"],
                children: [],
              },
              {
                id: "Measures",
                title: "Measures",
                type: "collapse",
                icon: icons["IconNotebook"],
                children: [],
              },
            ],
          },
          {
            id: "others",
            title: "others",
            type: "collapse",
            icon: icons["IconNotebook"],
            children: [],
          },
        ],
      },
      {
        id: "Studies",
        title: "Studies",
        type: "collapse",
        icon: icons["IconNotebook"],
        children: [],
      },
      {
        id: "Cause-Effects",
        title: "Cause-Effects",
        type: "collapse",
        icon: icons["IconNotebook"],
        children: [],
      },
    ],
  };

  const getStudies = async () => {
    var studyInfo = await retrieve("Study", query);
    console.log(11);
    console.log(studyInfo.id);
    // var loopData = [];
    studyInfo.forEach((studyInfo) => {
      let id = studyInfo.id;
      let label = studyInfo.label;
      // debugger
      topic.children[0].children[0].children[1].children.push({
        id: id,
        title: label,
        type: "collapse",
        // url: `/studies/${id}`,
        // target: false,
        // breadcrumbs: false,
        children: [
          {
            id: "Summary",
            title: "Summary",
            type: "item",
            url: `/studies/${id}`,
            target: false,
            breadcrumbs: false,
          },
          {
            id: "Cause-Effect2",
            title: "Cause-Effect",
            type: "item",
            url: `/node/1`,
            target: false,
            breadcrumbs: false,
          },
          {
            id: "Key-Cause-Effect",
            title: "Key-Cause-Effect",
            type: "item",
            url: `/node/1`,
            target: false,
            breadcrumbs: false,
          },
          {
            id: "Measure",
            title: "Measure",
            type: "item",
            url: `/node/1`,
            target: false,
            breadcrumbs: false,
          },
        ],
      });

      topic.children[1].children.push({
        id: id,
        title: label,
        type: "collapse",
        url: `/studies/${id}`,
        // selectId: `${id}`,
        // target: false,
        // breadcrumbs: false,
        children: [
          {
            id: "Summary",
            title: "Summary",
            type: "item",
            url: `/studies/${id}`,
            target: false,
            breadcrumbs: false,
          },
          {
            id: "Cause-Effect",
            title: "Cause-Effect",
            type: "collapse",
            // type: "item",
            // icon: icons['IconNotebook'],
            // url: `/studies/${id}`,
            target: false,
            breadcrumbs: false,
            request: "request",
            url: `/studies/${id}`,
            children:[],
            // onclick:(s)=>{ retrdebugger},
            // getCauseEffect(),

            // children: [
            //   {
            //     id: "Cause-Effect1",
            //     title: "Cause-Effect1",
            //     type: "item",
            //     // icon: icons['IconNotebook'],
            //     url: `/studies/${id}`,
            //     // url: `/node/1`,
            //     target: false,
            //     breadcrumbs: false,
            //   },
            //   {
            //     id: "Cause-Effect2",
            //     title: "Cause-Effect2",
            //     type: "item",
            //     // icon: icons['IconNotebook'],
            //     url: `/studies/${id}`,
            //     // url: `/node/1`,
            //     target: false,
            //     breadcrumbs: false,
            //   },
            //   {
            //     id: "Cause-Effect3",
            //     title: "Cause-Effect3",
            //     type: "item",
            //     // icon: icons['IconNotebook'],
            //     url: `/studies/${id}`,
            //     // url: `/node/1`,
            //     target: false,
            //     breadcrumbs: false,
            //   },
            // ],
          },
          {
            id: "Key-Cause-Effect",
            title: "Key-Cause-Effect",
            type: "item",
            url: `/studies/${id}`,
            // url: `/node/1`,
            target: false,
            breadcrumbs: false,
          },
          {
            id: "Measure",
            title: "Measure",
            type: "item",
            url: `/studies/${id}`,
            // url: `/node/1`,
            target: false,
            breadcrumbs: false,
          },
        ],
      });
    });
  };

//   const getCauseEffect = async () => {
//     var thePath = window.location.href;
//     const idFromPath = thePath.substring(thePath.lastIndexOf("/") + 1);
//     var causeEffect = await retrieve(idFromPath, query4);
//     // debugger
//     console.log(11);
//     console.log(causeEffect);
//     causeEffect.forEach((causeEffect) => {
//       let id = causeEffect.id;
//       let label = causeEffect.label;
//       // debugger
//       topic.children[0].children[0].children[1].children.push({
//         id: id,
//         title: label,
//         type: "collapse",
//         // url: `/studies/${id}`,
//         // target: false,
//         // breadcrumbs: false,
//         children: [
//           {
//             id: "Summary",
//             title: "Summary",
//             type: "item",
//             url: `/studies/${id}`,
//             target: false,
//             breadcrumbs: false,
//           },
//           {
//             id: "Cause-Effect",
//             title: "Cause-Effect",
//             type: "item",
//             url: `/node/1`,
//             target: false,
//             breadcrumbs: false,
//           },
//           {
//             id: "Key-Cause-Effect",
//             title: "Key-Cause-Effect",
//             type: "item",
//             url: `/node/1`,
//             target: false,
//             breadcrumbs: false,
//           },
//           {
//             id: "Measure",
//             title: "Measure",
//             type: "item",
//             url: `/node/1`,
//             target: false,
//             breadcrumbs: false,
//           },
//         ],
//       });

//       topic.children[1].children.push({
//         id: id,
//         title: label,
//         type: "collapse",
//         // url: `/studies/${id}`,
//         // target: false,
//         // breadcrumbs: false,
//         children: [
//           {
//             id: "Summary",
//             title: "Summary",
//             type: "item",
//             url: `/studies/${id}`,
//             target: false,
//             breadcrumbs: false,
//           },
//           {
//             id: "Cause-Effect",
//             title: "Cause-Effect",
//             type: "item",
//             type: "collapse",
//             // icon: icons['IconNotebook'],
//             url: `/studies/${id}`,
//             // url: `/node/1`,
//             target: false,
//             breadcrumbs: false,
//             // children: [
//             //   {
//             //     id: "Cause-Effect1",
//             //     title: "Cause-Effect1",
//             //     type: "item",
//             //     // icon: icons['IconNotebook'],
//             //     url: `/studies/${id}`,
//             //     // url: `/node/1`,
//             //     target: false,
//             //     breadcrumbs: false,
//             //   },
//             // ],
//           },
//           {
//             id: "Key-Cause-Effect",
//             title: "Key-Cause-Effect",
//             type: "item",
//             url: `/studies/${id}`,
//             // url: `/node/1`,
//             target: false,
//             breadcrumbs: false,
//           },
//           {
//             id: "Measure",
//             title: "Measure",
//             type: "item",
//             url: `/studies/${id}`,
//             // url: `/node/1`,
//             target: false,
//             breadcrumbs: false,
//           },
//         ],
//       });
//     });
//   };

  const getLiteratureReview = async () => {
    var LiteratureReview = await retrieve("Literature review", query3);

    LiteratureReview.forEach((literatureReviewName) => {
      let id = literatureReviewName;
      let label = literatureReviewName;
      topic.children[0].children.push({
        id: id,
        title: label,
        type: "item",
        url: `/literatureReview/${id}`,
        target: false,
        breadcrumbs: false,
      });
    });
  };

  getStudies();
//   getCauseEffect();
  // getLiteratureReview();

  return topic;
};

export let topics = generateTopics();
