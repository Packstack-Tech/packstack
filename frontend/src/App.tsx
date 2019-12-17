import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { REGISTER, LOGIN, INVENTORY, PACK_FORM, PACK, PROFILE, HOME, REQUEST_RESET, RESET_PASSWORD } from "./routes";

import Header from 'app/components/Header';
import ProtectedRoute from 'app/Auth/ProtectedRoute';

import { Container } from "styles/common";
import SidebarController from "./app/components/Sidebar/Context";
import Sidebar from "./app/components/Sidebar/Sidebar";

const Home = React.lazy(() => import('./app/Home'));
const Login = React.lazy(() => import('./app/Auth/Login'));
const Registration = React.lazy(() => import('./app/Auth/Register'));
const RequestReset = React.lazy(() => import('./app/Auth/RequestReset'));
const ResetPassword = React.lazy(() => import('./app/Auth/ResetPassword'));
const Inventory = React.lazy(() => import('./app/Inventory'));
const PackForm = React.lazy(() => import('./app/PackForm'));
const Pack = React.lazy(() => import('./app/Pack'));
const Profile = React.lazy(() => import('./app/Profile'));

const App: React.FC = () => {
    return (
        <Container>
            <Header/>
            <SidebarController>
                <React.Suspense fallback={<div style={{ flex: 1 }}/>}>

                    <Switch>
                        <Route path={HOME} exact={true} component={Home}/>
                        <Route path={LOGIN} component={Login}/>
                        <Route path={REGISTER} component={Registration}/>
                        <Route path={REQUEST_RESET} component={RequestReset}/>
                        <Route path={RESET_PASSWORD} component={ResetPassword}/>
                        <ProtectedRoute path={INVENTORY} component={Inventory}/>
                        <ProtectedRoute path={PACK_FORM} component={PackForm}/>
                        <ProtectedRoute path={PROFILE} component={Profile}/>

                        /* wildcard - must be last */
                        <Route path={PACK} component={Pack}/>
                    </Switch>

                </React.Suspense>
                <Sidebar/>
            </SidebarController>
        </Container>
    );
};

export default App;
