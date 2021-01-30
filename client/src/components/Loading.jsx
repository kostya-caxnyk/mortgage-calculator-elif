import React from 'react';
import {useSelector} from "react-redux";

import '../App.css';

import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () =>
{
    const isloading = useSelector(state => state.loading);
    return <>
        {isloading && <div className={"loading"}>
            <CircularProgress style={{opacity: 1}}/>
        </div>}
    </>;
};

export default Loading;