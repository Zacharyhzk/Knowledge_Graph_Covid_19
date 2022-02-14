import React, { useState } from 'react';
// assets
import Zubirold from './../../../assets/images/zs/zubirscore.jpg';
import Zubirpres from './../../../assets/images/zs/zubirpres.jpeg';
import Zubirscore from './../../../assets/images/zs/zubircompose.jpeg';

import { Button, Grid, Typography } from '@material-ui/core';

const PicGallery = ({photoList}) => {
    //changed to usestate - so that do not need to use this. below.
    const [index, setIndex] = useState(0);

    const picList = [Zubirold, Zubirpres, Zubirscore];

    //made changes to show the buttons conditionally
    const onClickNext = () => {
        setIndex(index + 1);
        // if (index + 1 === picList.length) {
        //     setIndex(0);
        // } else {
        //     var ind = ind + 1;
        //     setIndex(ind);
        // }
    };
    const onClickPrevious = () => {
        setIndex(index - 1);
        // var ind;
        // if (index - 1 === -1) {
        //     ind = picList.length - 1;
        //     setIndex(ind);
        // } else {
        //     ind = ind - 1;
        //     setIndex(ind);
        // }
    };

    return (
        <div>
            <img src={photoList[index]} width="100%" height="100%" alt="Zubir Said" /> <br />
            <Grid container alignItems="center" justifyContent="center" direction="row" spacing={2}>
                <Grid item>
                    <Typography variant="subtitle2" color="inherit">
                        {index > 0 && (
                            <Button variant="contained" color="secondary" disableElevation onClick={onClickPrevious}>
                                {' '}
                                Previous{' '}
                            </Button>
                        )}
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography variant="subtitle2" color="inherit">
                        {index < photoList.length - 1 && (
                            <Button
                                variant="contained"
                                color="secondary"
                                disableElevation
                                onClick={onClickNext}
                                style={{ 'margin-left': '5px' }}
                            >
                                {' '}
                                Next{' '}
                            </Button>
                        )}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default PicGallery;
