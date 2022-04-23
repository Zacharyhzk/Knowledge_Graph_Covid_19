import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// material-ui
import { makeStyles } from "@material-ui/styles";
import {
  Collapse,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import ListItemButton from "@material-ui/core/ListItemButton";

// project imports
import NavItem from "./../NavItem";

// assets
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";

// style constant
const useStyles = makeStyles((theme) => ({
  collapseIcon: {
    fontSize: "1rem",
    marginTop: "auto",
    marginBottom: "auto",
  },
  collapseIconSub: {
    fontSize: "1rem",
    marginTop: "auto",
    marginBottom: "auto",
  },
  menuIcon: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  listIcon: {
    minWidth: "18px",
    marginTop: "auto",
    marginBottom: "auto",
  },
  listCustomIconSub: {
    width: "6px",
    height: "6px",
  },
  listCustomIconSubActive: {
    width: "8px",
    height: "8px",
  },
  listItem: {
    marginBottom: "5px",
    alignItems: "flex-start",
  },
  listItemNoBack: {
    marginBottom: "5px",
    backgroundColor: "transparent !important",
    paddingTop: "8px",
    paddingBottom: "8px",
    alignItems: "flex-start",
  },
  subMenuCaption: {
    ...theme.typography.subMenuCaption,
  },
  collapseWrapper: {
    position: "relative",
    "&:after": {
      content: "''",
      position: "absolute",
      left: "32px",
      top: 0,
      height: "100%",
      width: "1px",
      opacity: 1,
      background: theme.palette.primary.light,
    },
  },
}));

//-----------------------|| SIDEBAR MENU LIST COLLAPSE ITEMS ||-----------------------//

const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  "neo4j+s://fc5b611c.databases.neo4j.io",
  neo4j.auth.basic("anonymous", "anonymous")
);
const query = `MATCH (study {id: $param})-[:cause_effect]-(CE) RETURN CE`;
const query2 = `MATCH ({id: $param})-[:cause_effect]-()-[:cause]-()-[:measure]-(CE) RETURN CE`
const query3 = `MATCH ({id: $param})-[:cause_effect]-()-[:effect]-()-[:measure]-(CE) RETURN CE`

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
    var output = getAllAttrs(result.records);
    return output;
  } catch (error) {
    console.log(`unable to execute query. ${error}`);
  } finally {
    session.close();
  }
}

const NavCollapse = ({ menu, level }) => {
  const classes = useStyles();
  const customization = useSelector((state) => state.customization);

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const getCauseEffect = async (menu) => {
    var thePath = window.location.href;
    const idFromPath = thePath.substring(thePath.lastIndexOf("/") + 1);
    var causeEffect = await retrieve(idFromPath, query);
    // debugger;
    causeEffect.forEach((causeEffect,index) => {
      let id = causeEffect.id;
    //   let label = causeEffect.label;
      let label = `Cause-Effect-${index+1}`;
      menu.children.push(
        {
          id: id,
          title: label,
          type: "item",
          // type: "collapse",
          url: `/studies/${id}`,
          target: false,
          breadcrumbs: false,
          children:[
            {
              id: "Cause",
              title: "Cause",
              // type: "item",
              type: "collapse",
              // url: `/studies/${id}`,
              target: false,
              breadcrumbs: false,
              children:[],
            },
            {
              id: "Effect",
              title: "Effect",
              // type: "item",
              type: "collapse",
              // url: `/studies/${id}`,
              target: false,
              breadcrumbs: false,
              children:[],
            }
          ],
        },
      );
      // debugger
    });
    return menu
  };

  // const getCauseEffectFromMeasureCause = async (menu) => {
  //   var thePath = window.location.href;
  //   const idFromPath = thePath.substring(thePath.lastIndexOf("/") + 1);
  //   var measureCause = await retrieve(idFromPath, query2);
  //   // debugger;
  //   measureCause.forEach((measureCause,index) => {
  //     let id = measureCause.id;
  //     let label = `Cause-Measure-${index+1}`;
  //     menu.children.push(
  //       {
  //         id: id,
  //         title: label,
  //         type: "item",
  //         // type: "collapse",
  //         url: `/studies/${idFromPath}`,
  //         target: false,
  //         breadcrumbs: false,
  //         // request: "requestMeasure",
  //         // target: false,
  //         // breadcrumbs: false,
  //         // children:[
  //         //   {
  //         //     id: "Cause",
  //         //     title: "Cause",
  //         //     // type: "item",
  //         //     type: "collapse",
  //         //     // url: `/studies/${id}`,
  //         //     target: false,
  //         //     breadcrumbs: false,
  //         //     children:[],
  //         //   },
  //         //   {
  //         //     id: "Effect",
  //         //     title: "Effect",
  //         //     // type: "item",
  //         //     type: "collapse",
  //         //     // url: `/studies/${id}`,
  //         //     target: false,
  //         //     breadcrumbs: false,
  //         //     children:[],
  //         //   }
  //         // ],
  //       },
  //     );
  //   });
  //   return menu
  // };

  // const getCauseEffectFromMeasureEffect = async (menu) => {
  //   var thePath = window.location.href;
  //   const idFromPath = thePath.substring(thePath.lastIndexOf("/") + 1);
  //   var measureCause = await retrieve(idFromPath, query3);
  //   // debugger;
  //   measureCause.forEach((measureCause,index) => {
  //     let id = measureCause.id;
  //     let label = `Effect-Measure-${index+1}`;
  //     menu.children.push(
  //       {
  //         id: id,
  //         title: label,
  //         type: "item",
  //         // type: "collapse",
  //         url: `/studies/${id}`,
  //         target: false,
  //         breadcrumbs: false,
  //       },
  //     );
  //   });
  //   return menu
  // };

//   if (menu.request === "request") {
//     // console.log(item);
//     debugger;
//     menu = getCauseEffect(menu);
//   }

  const handleClick = (item) => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
    if (menu.request === "request" && menu.children.length === 0) {
      console.log(item);
      // debugger;
      menu = getCauseEffect(menu);
    }
    // if (menu.request === "requestMeasureCause" && menu.children.length === 0) {
    //   menu = getCauseEffectFromMeasureCause(menu);
    // }
    // if (menu.request === "requestMeasureEffect" && menu.children.length === 0) {
    //   menu = getCauseEffectFromMeasureEffect(menu);
    // }
  };

//   useEffect(
//     menu = getCauseEffect(menu)
//       ,[menu.id === "Cause-Effect" && menu.children.length]
//     );

  let listItemProps = {};
  if (menu.url !== null && menu.url !== undefined) {
    listItemProps = {
      component: React.forwardRef((props, ref) => (
        <Link {...props} to={menu.url} />
      )),
    };

    if (menu.external) {
      listItemProps = { component: "a", href: menu.url };
    }
  }

  // menu collapse & item
  const menus = menu.children.map((item) => {
    switch (item.type) {
      case "collapse":
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case "item":
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const Icon = menu.icon;
  const menuIcon = menu.icon ? (
    <Icon stroke={1.5} size="1.3rem" className={classes.listCustomIcon} />
  ) : (
    <FiberManualRecordIcon
      className={
        selected === menu.id
          ? classes.listCustomIconSubActive
          : classes.listCustomIconSub
      }
      fontSize={level > 0 ? "inherit" : "default"}
    />
  );

  let menuIconClass = !menu.icon ? classes.listIcon : classes.menuIcon;

  return (
    <React.Fragment>
      <ListItemButton
        {...listItemProps}
        className={level > 1 ? classes.listItemNoBack : classes.listItem}
        sx={{ borderRadius: customization.borderRadius + "px" }}
        selected={selected === menu.id}
        onClick={handleClick}
        style={{ paddingLeft: level * 23 + "px" }}
      >
        <ListItemIcon className={menuIconClass}>{menuIcon}</ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant={selected === menu.id ? "h5" : "body1"}
              color="inherit"
              className={classes.listItemTypography}
            >
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography
                variant="caption"
                className={classes.subMenuCaption}
                display="block"
                gutterBottom
              >
                {menu.caption}
              </Typography>
            )
          }
        />
        {open ? (
          <IconChevronUp
            stroke={1.5}
            size="1rem"
            className={
              level > 1 ? classes.collapseIconSub : classes.collapseIcon
            }
          />
        ) : (
          <IconChevronDown
            stroke={1.5}
            size="1rem"
            className={
              level > 1 ? classes.collapseIconSub : classes.collapseIcon
            }
          />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          className={classes.collapseWrapper}
        >
          {menus}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
};

export default NavCollapse;
