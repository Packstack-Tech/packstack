import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { HOME, NEW } from 'routes';

import { AppContext } from 'AppContext';
import Loading from 'app/components/Loading';
import PackForm from './PackForm';
import { useContext } from "react";
import { PageWrapper } from "styles/common";

const PackFormContainer: React.FC<RouteComponentProps<{ id: string }>> = (routeProps) => {
    const app = useContext(AppContext);
    if (app.isBooting) {
        return <Loading size="large"/>;
    }

    if (!app.userInfo) {
        routeProps.history.push(HOME);
        return null;
    }

    const getPackId = () => {
        if (routeProps.match.params.id === NEW) {
            return null;
        }

        const packId = parseInt(routeProps.match.params.id, 10);
        return isNaN(packId) ? null : packId;
    };


    return (
        <PageWrapper>
            <PackForm packId={getPackId()}
                      getPack={app.api.PackService.get}
                      getItems={app.api.ItemService.get}
                      createPack={app.api.PackService.create}
                      updatePack={app.api.PackService.update}
                      user={app.userInfo}
                      {...routeProps}/>
        </PageWrapper>
    )
};

export default PackFormContainer;