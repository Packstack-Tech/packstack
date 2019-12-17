import * as React from 'react';
import { PackOverview } from "types/pack";

import Loading from "app/components/Loading";

import Item from './PackItem';

interface Props {
    packs: PackOverview[];
    loading: boolean;
    currentUserId?: number;
    deletePack?: (id: number) => void;
}

const PackList: React.FC<Props> = ({ packs, loading, currentUserId, deletePack }) => {
    if (loading) {
        return <Loading size="large"/>
    }

    if (!packs.length) {
        return (
            <p>No packs created yet!</p>
        )
    }

    return (
        <div>
            {packs.map(p => <Item key={p.id} pack={p} currentUserId={currentUserId} deletePack={deletePack} />)}
        </div>
    )
};

export default PackList;