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
    backgroundColor: theme.palette.warning.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: '210px',
        height: '210px',
        background: 'linear-gradient(210.04deg, ' + theme.palette.primary[200] + ' -50.94%, rgba(144, 202, 249, 0) 83.49%)',
        borderRadius: '50%',
        top: '-30px',
        right: '-180px'
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: '210px',
        height: '210px',
        background: 'linear-gradient(140.9deg, ' + theme.palette.primary[200] + ' -14.02%, rgba(144, 202, 249, 0) 77.58%)',
        borderRadius: '50%',
        top: '-160px',
        right: '-130px'
    }
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
    color: "black !important",
  },
  subHeading: {
    fontSize: "1rem",
    fontWeight: 500,
    color: theme.palette.secondary[200],
    color: "#7d0909 !important",
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

const EffectCard = ({ effectList, isLoading }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <MainCard
          border={false}
          className={classes.card}
          contentClass={classes.content}
          title="Effect"
        >
          {effectList.map((value, index) => {
            return (
              <Grid container direction="column">
                <Grid item sx={{ mb: 1.25 }}>
                  <Typography className={classes.subHeading}>Title</Typography>
                </Grid>

                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography className={classes.cardHeading}>
                        {effectList[index].id}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ mb: 1.25 }}>
                  <Typography className={classes.subHeading}>Label</Typography>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography className={classes.cardHeading}>
                        {effectList[index].label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </MainCard>
      )}
    </React.Fragment>
  );
};

EffectCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default EffectCard;
