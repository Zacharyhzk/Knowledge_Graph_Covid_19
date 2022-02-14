import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@material-ui/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@material-ui/core';

import {ArrowBack,ArrowForward} from '@material-ui/icons'

//-----------------------|| CUSTOM SUB CARD ||-----------------------//

const SubCard = ({ children, content, contentClass, darkTitle, secondary, sx = {}, title, node, sign, ...others }) => {
    const theme = useTheme();

    console.log(node);
    //
    //
    // if(sign===null){
    //     sign = '';
    // }


    let symbol =(sign)=>
    {
        try{
            if(sign != null){
                if(String(sign) === String("=>")){
                    return <ArrowForward fontSize="inherit"/>;
                }
                else if(String(sign) === String("<=")){
                    return <ArrowBack fontSize="inherit"/>;
                }
                else{
                    return String(sign) + "a" + "a";
                }
            }
        }
        catch(err){

        }

    }



    return (
        <Card
            sx={{
                border: '1px solid',
                borderColor: theme.palette.primary.light,
                ':hover': {
                    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
                },
                ...sx
            }}
            {...others}
        >
            {/* card header and action */}
            {!darkTitle && title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h4">{title + " " }
                {symbol(sign)}
            </Typography>} action={secondary} />}
            {darkTitle && title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h4">{title + " " }
                {symbol(sign)}
            </Typography>} action={secondary} />}

            {/* content & header divider */}
            {title && (
                <Divider
                    sx={{
                        opacity: 1,
                        borderColor: theme.palette.primary.light
                    }}
                />
            )}

            {/* card content */}
            {content && (
                <CardContent sx={{ p: 2.5 }} className={contentClass}>
                    {children}
                </CardContent>
            )}
            {!content && children}
        </Card>
    );
};

SubCard.propTypes = {
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    sx: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

SubCard.defaultProps = {
    content: true
};

export default SubCard;
