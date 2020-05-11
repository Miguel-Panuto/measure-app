import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import LandPage from './pages/LandPage';
import DataPage from './pages/DataPage';

const Routes: React.FC = () => (
    <HashRouter>
        <Switch>
            <Route component={LandPage} path="/" exact/>
            <Route component={DataPage} path="/data"/>
        </Switch>
    </HashRouter>
);

export default Routes;