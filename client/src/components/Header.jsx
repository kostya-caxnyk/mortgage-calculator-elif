import React from 'react';
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {getAllBanks} from "../store/actions";

const styles = {
    display: 'flex',
    position: 'fixed',
    zIndex: 1000,
    top: 0,
    left: 0,
    fontSize: 25,
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
};


const Header = () =>
{
    const dispatch = useDispatch();

    React.useEffect(() =>
    {
        dispatch(getAllBanks());
    }, [dispatch]);

    return (
        <Breadcrumbs aria-label="breadcrumb"
                     style={styles}>
            <NavLink to="/" activeStyle={{color: 'red'}} exact>
                Banks
            </NavLink>
            <NavLink to="/mortgage-calculator" activeStyle={{color: 'red'}}>
                Mortgage calculator
            </NavLink>
        </Breadcrumbs>
    );
};

export default Header;
