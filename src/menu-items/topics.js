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
    IconNotebook
} from '@tabler/icons';

//import axios
import axios from 'axios';

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
    IconNotebook: IconNotebook
};

//-----------------------|| EXTRA PAGES MENU ITEMS ||-----------------------//

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
        // debugger
        return studiesName

    } catch (error) {
        console.log(`unable to execute query. ${error}`)
    } finally {
        session.close()
    }

}

const generateTopics = () => {
    let topic = {
        id: 'topics',
        title: 'topics',
        // caption: 'Pages Caption',
        type: 'group',
        children: [
            // {
            //     id: 'songs',
            //     title: 'Songs',
            //     type: 'collapse',
            //     icon: icons['IconPlaylist'],
            //     children: []
            // },
            // {
            //     id: 'social-network',
            //     title: 'Social Network',
            //     type: 'item',
            //     url: '/node/Person',
            //     icon: icons['IconSocial'],
            //     breadcrumbs: false
            // },
            // {
            //     id: 'social-network',
            //     title: 'Social Network',
            //     type: 'collapse',
            //     icon: icons['IconSocial'],
            //     children: []
            // },
            // {
            //     id: 'organization',
            //     title: 'Organizations',
            //     type: 'collapse',
            //     icon: icons['IconBuildingCommunity'],
            //     children: []
            // },
            // {
            //     id: 'events',
            //     title: 'Events',
            //     type: 'collapse',
            //     icon: icons['IconCalendarEvent'],
            //     children: []
            // },
            // {
            //     id: 'genres',
            //     title: 'Genres',
            //     type: 'collapse',
            //     icon: icons['IconArchive'],
            //     children: []
            // },
            // {
            //     id: 'topics',
            //     title: 'Topics',
            //     type: 'collapse',
            //     icon: icons['IconBulb'],
            //     children: []
            // },
            // {
            //     id: 'awards',
            //     title: 'Awards',
            //     type: 'collapse',
            //     icon: icons['IconAward'],
            //     children: []
            // },
            // {
            //     id: 'musical-expressions',
            //     title: 'Musical Expressions',
            //     type: 'collapse',
            //     icon: icons['IconFileMusic'],
            //     children: []
            // },
            // {
            //     id: 'documents',
            //     title: 'Documents',
            //     type: 'collapse',
            //     icon: icons['IconNotebook'],
            //     children: []
            // },
            // {
            //     id: 'items',
            //     title: 'Items',
            //     type: 'collapse',
            //     icon: icons['IconFiles'],
            //     children: []
            // },
            {
                id: 'studies',
                title: 'studies',
                type: 'collapse',
                icon: icons['IconNotebook'],
                children: []
            }
        ]
    };

    const getStudies = async () => {
        var studiesName = await retrieve('Study', query) 
        console.log(11)
        console.log(studiesName)
        // debugger
        // var loopData = [];
        studiesName.forEach((studiesName) => {
            let id = studiesName;
            let label = studiesName;
            topic.children[0].children.push({
                id: id,
                title: label,
                type: 'item',
                url: `/node/${id}`,
                target: false,
                breadcrumbs: false
            });
        });
    }

    const bCheckLength = async (menuType) =>{
        const res = await axios.get(`https://chriskhoo.net/ZS/0/${menuType}`);
        var data = res.data;
        if (data.length <= 1)
        {
            console.log("<=1")
            console.log(menuType)
            console.log(data.length)
            console.log(data)
            return false
        }
        else{
            console.log(">1")
            console.log(menuType)
            console.log(data.length)
            console.log(data)
            return false
        }

    }

    //Generate sub menu
    const getSubMenu = async (menuType, index) => {
        var _url = `https://chriskhoo.net/ZS/0/${menuType}`;
        const res = await axios.get(_url);

        var data = res.data;
        var loopData = [];
        // console.log(menuType);
        // console.log(data);
        var bPrint = false;
        var bComplete = false;
        for (var i = 0; i < data.length; i++) {
            if (menuType === 'Person' || menuType === 'Event') {
                if (data[i]._fields[2].properties.type === 'Taxonomy') {
                    // bPrint= await bCheckLength(data[i]._fields[2].properties.id);
                    // if(bPrint){
                        loopData.push(data[i]._fields[2].properties);
                    // }
                }
            } else {
                // bPrint= await bCheckLength(data[i]._fields[2].properties.id)
                // if(bPrint){
                    loopData.push(data[i]._fields[2].properties);
                // }
            }
        }
        bComplete = true

        if(bComplete){
            loopData.sort(function (a, b) {
                if (a.label < b.label) {
                    return -1;
                }
                if (a.label > b.label) {
                    return 1;
                }
                return 0;
            });

            loopData.forEach((menu) => {
                let id = menu.id;
                let label = menu.label;
                topic.children[index].children.push({
                    id: id,
                    title: label,
                    type: 'item',
                    url: `/node/${id}`,
                    target: false,
                    breadcrumbs: false
                });
            });
        }

    };
    // getSubMenu('MusicalWork', 0);
    // // getSubMenu('Person', 1);
    // getSubMenu('Organization', 2);
    // getSubMenu('Event', 3);
    // getSubMenu('CreativeWork', 4);
    // getSubMenu('Topic', 5);
    // getSubMenu('Award', 6);
    // getSubMenu('MusicalExpression', 7);
    // getSubMenu('Document', 8);
    // getSubMenu('Item', 9);
    getStudies();




    return topic;
};

export let topics = generateTopics();
