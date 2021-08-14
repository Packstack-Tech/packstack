import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { LOGIN, NEW } from 'routes';

import { AppContext } from 'AppContext';
import Loading from 'app/components/Loading';
import PackForm from './PackForm';
import { useContext } from "react";
import { PageWrapper } from "styles/common";

const PackFormContainer: React.FC<RouteComponentProps<{ id: string }>> = (routeProps) => {
    const app = useContext(AppContext);
    const [packId, setPackId] = React.useState<null | number>(null);

    React.useEffect(() => {
        const routeId = routeProps.match.params.id;
        const packId = routeId === NEW ? null : parseInt(routeId, 10);
        setPackId(packId);
    }, [routeProps.match.params.id]);

    if (app.isBooting) {
        return <Loading size="large"/>;
    }

    if (!app.userInfo) {
        routeProps.history.push(LOGIN);
        return null;
    }

    return (
        <PageWrapper>
            <PackForm packId={packId}
                      getPack={app.api.PackService.get}
                      getItems={app.api.ItemService.get}
                      exportItems={app.api.PackService.exportItems}
                      createPack={app.api.PackService.create}
                      updatePack={app.api.PackService.update}
                      user={app.userInfo}
                      {...routeProps}/>
        </PageWrapper>
    )
};

export default PackFormContainer;