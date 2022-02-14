import React from 'react';

// material-ui
// import { useTheme } from '@material-ui/styles';

import logo from './../../src/assets/images/logo.png';

// uncomment when logodark is used
// import logoDark from './../../src/assets/images/logo-dark.svg';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from './../../assets/images/logo-dark.svg';
 * import logo from './../../assets/images/logo.svg';
 *
 */

//-----------------------|| LOGO SVG ||-----------------------//

const Logo = () => {
    // uncomment when theme is used
    // const theme = useTheme();

    return (
        <img src={logo} alt="Zubir Said" width="150" />
    );
};

export default Logo;
