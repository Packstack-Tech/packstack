import * as React from 'react';
import { Redirect, Route } from "react-router";

import { LOGIN } from "routes";
import AppConsumer from 'AppContext';

interface ProtectedProps {
    component: React.ComponentType<any>;
    path: string;
}

const ProtectedRoute: React.FC<ProtectedProps> = ({ component, path }) => {
    return (
        <AppConsumer>
            {app => {
                if (app.isBooting) {
                    return null;
                }

                if (app.userInfo) {
                    return <Route path={path} component={component} />
                }

                return <Redirect to={LOGIN} />
            }}
        </AppConsumer>
    )
};

export default ProtectedRoute;