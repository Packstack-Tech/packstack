import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { WeightUnit } from "enums";

import { AppContext } from 'AppContext';
import Loading from 'app/components/Loading';
import Pack from './Pack';

import { PageWrapper } from "styles/common";

// @ts-ignore
const PackContainer: React.FC<RouteComponentProps<{ id: number, slug?: string }>> = ({ match }) => {
    const app = React.useContext(AppContext);
    if (app.isBooting) {
        return <Loading size="large"/>
    }
    const weightUnit = app.userInfo ? app.userInfo.default_weight_unit : WeightUnit.POUNDS;
    return (
        <PageWrapper>
            <Pack getPack={app.api.PackService.get}
                  weightUnit={weightUnit}
                  packId={match.params.id}/>
        </PageWrapper>
    )
};
export default PackContainer;