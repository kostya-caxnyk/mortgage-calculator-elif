import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React from "react";

import './App.css';
import BanksPages from "./pages/BanksPage/BanksPage";
import Header from "./components/Header";
import MortgagePage from "./pages/MortgagePage/MortgagePage";
import Loading from "./components/Loading";

function App()
{
    return (
        <Router>
            <Header/>
            <Switch>
                <Route path={'/'} exact component={BanksPages}/>
                <Route path={'/mortgage-calculator'} component={MortgagePage}/>
            </Switch>
            <Loading/>
        </Router>
    );
}

export default App;
