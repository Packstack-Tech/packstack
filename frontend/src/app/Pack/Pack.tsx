import * as React from 'react';
import { Link } from "react-router-dom";
import Linkify from "react-linkify";
import DocumentTitle from 'react-document-title';

import { WeightUnit } from "enums";
import { PackSpecs } from "./types";
import { Pack as PackType } from "types/pack";

import { AppContext } from 'AppContext';
import { useSidebar } from "app/components/Sidebar/Context";
import { alertError } from "app/components/Notifications";
import Loading from "app/components/Loading";
import Statistics from "app/components/Statistics";
import WeightSelector from "app/components/WeightSelector";
import CategoryChart from "app/components/CategoryChart";
import CategoryTable from "app/components/CategoryTable";

import Items from './Items';

import { getWeightByCategory } from 'lib/utils/weight';

import { Credit, PackWrapper, SectionHeader, SectionTitle, TripDescription } from "./styles";
import FullPageError from 'app/components/FullPageError';

const Pack: React.FC<PackSpecs.Props> = ({ getPack, weightUnit, packId }) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [packForbidden, setPackForbidden] = React.useState<boolean>(true);
    const [pack, setPack] = React.useState<PackType | null>(null);
    const [unit, setUnit] = React.useState<WeightUnit>(weightUnit);
    const { dispatch } = useSidebar();
    const app = React.useContext(AppContext);

    React.useEffect(() => {
        getPack(packId)
            .then(pack => {
                setPack(pack);
                setLoading(false);
                setPackForbidden(false);
            })
            .catch(e => {
                setLoading(false);
                if (e.message.includes("failed with status code 403")){//when forbidden to view
                    setPackForbidden(true);
                }
                else {
                    alertError({ message: 'Unable to retrieve pack.' });
                }
            });

        return function cleanup() {
            dispatch({ type: 'reset' });
        }
    }, []);

    // render sidebar
    React.useEffect(() => {
        if (pack) {
            const catWeights = getWeightByCategory(unit, pack.items);
            const Sidebar = () => (
                <>
                    <Statistics pack={pack}/>
                    <CategoryTable data={catWeights} unit={unit}/>
                    <CategoryChart data={catWeights}/>
                </>
            );

            dispatch({ type: 'setTitle', value: 'Details' });
            dispatch({ type: 'setContent', value: Sidebar() })
        }
    }, [pack, unit]);

    const componentDecorator = (href: string, text: string, key: number | string) => (
        <a href={href} key={key} target="_blank">{text}</a>
    );

    if (loading) {
        return <Loading size="large"/>
    }
    
    if (packForbidden) {
        return <FullPageError text="This pack is private. If you're sure this is your pack, make sure you're logged in."></FullPageError>
    }

    if (!pack) {
        return <p>Pack not found!</p>
    }

    const userPack = app.userInfo && app.userInfo.id === pack.userId;
    const isEditable = () => userPack && (
        <div className="edit-link">
            <Link to={`/pack/${pack.id}`}>Edit</Link>
        </div>
    );


    return (
        <DocumentTitle title={`Packstack | ${pack.title}`}>
            <PackWrapper>
                <h1>{pack.title}</h1>
                <Credit>Pack curated by {pack.user.username} {isEditable()}</Credit>

                {pack.description && (
                    <>
                        <SectionHeader>
                            <SectionTitle>
                                Field Notes
                            </SectionTitle>
                        </SectionHeader>

                        <TripDescription>
                            <Linkify componentDecorator={componentDecorator}>
                                {pack.description}
                            </Linkify>
                        </TripDescription>
                    </>
                )}

                <SectionHeader>
                    <div/>
                    <div>
                        <WeightSelector
                            unit={unit}
                            items={pack.items}
                            selectUnit={unit => setUnit(unit)}/>
                    </div>
                </SectionHeader>
                <Items items={pack.items} unit={unit}/>
            </PackWrapper>
        </DocumentTitle>
    );
};

export default Pack;