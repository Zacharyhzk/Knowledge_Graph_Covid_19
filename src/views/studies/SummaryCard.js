import PropTypes from "prop-types";
import React from "react";

// material-ui
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";

// project imports
import MainCard from "../../ui-component/cards/MainCard";
import SkeletonEarningCard from "../../ui-component/cards/Skeleton/EarningCard";

// style constant
const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.secondary.dark,
    color: "#fff",
    overflow: "hidden",
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      width: "210px",
      height: "210px",
      background: theme.palette.secondary[800],
      borderRadius: "50%",
      top: "-85px",
      right: "-95px",
      [theme.breakpoints.down("xs")]: {
        top: "-105px",
        right: "-140px",
      },
    },
    "&:before": {
      content: '""',
      position: "absolute",
      width: "210px",
      height: "210px",
      background: theme.palette.secondary[800],
      borderRadius: "50%",
      top: "-125px",
      right: "-15px",
      opacity: 0.5,
      [theme.breakpoints.down("xs")]: {
        top: "-155px",
        right: "-70px",
      },
    },
  },
  content: {
    padding: "20px !important",
  },
  avatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.largeAvatar,
    backgroundColor: theme.palette.secondary[800],
    marginTop: "8px",
  },
  avatarRight: {
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary[200],
    zIndex: 1,
  },
  cardHeading: {
    fontSize: "1.125rem",
    fontWeight: 500,
    marginRight: "8px",
    marginTop: "0px",
    marginBottom: "6px",
  },
  subHeading: {
    fontSize: "1rem",
    fontWeight: 500,
    color: theme.palette.secondary[200],
  },
  avatarCircle: {
    // cursor: 'pointer',
    ...theme.typography.smallAvatar,
    backgroundColor: theme.palette.secondary[200],
    color: theme.palette.secondary.dark,
  },
  circleIcon: {
    transform: "rotate3d(1, 1, 1, 45deg)",
  },
  menuItem: {
    marginRight: "14px",
    fontSize: "1.25rem",
  },
}));

//===========================|| DASHBOARD DEFAULT - EARNING CARD ||===========================//

const SummaryCard = ({
  studyList,
  isLoading,
  essayCount,
  songCount,
  bioCount,
}) => {
  const classes = useStyles();
  // debugger
  return (
    <React.Fragment>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <MainCard
          border={false}
          className={classes.card}
          contentClass={classes.content}
        >
          <Grid container direction="column">
            <Grid item sx={{ mb: 1.25 }}>
              <Typography className={classes.subHeading}>Title</Typography>
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography className={classes.cardHeading}>
                    {studyList.label}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <Typography className={classes.subHeading}>Objective</Typography>
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography className={classes.cardHeading}>
                    {studyList.objectives}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <Typography className={classes.subHeading}>Citation</Typography>
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography className={classes.cardHeading}>
                    {studyList.citation}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <Typography className={classes.subHeading}>Comment</Typography>
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography className={classes.cardHeading}>
                    {studyList.comment}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <Typography className={classes.subHeading}>
                Study Method Description
              </Typography>
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography className={classes.cardHeading}>
                    {studyList.study_method_desc}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item sx={{ mb: 1.25 }}>
                            <Typography className={classes.subHeading}>Total Songs</Typography>
                        </Grid>

                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography className={classes.cardHeading}>{essayCount}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography className={classes.subHeading}>Essays</Typography>
                        </Grid>

                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography className={classes.cardHeading}>{bioCount}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography className={classes.subHeading}>Biographies</Typography>
                        </Grid> */}
          </Grid>
        </MainCard>
      )}
    </React.Fragment>
  );
};

SummaryCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default SummaryCard;
