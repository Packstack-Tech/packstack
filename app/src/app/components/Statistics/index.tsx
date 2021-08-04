import * as React from 'react';
import { Icon } from 'antd'
import { Pack } from "types/pack";

import { getGenderName } from "enums";
import { getPackPath } from "routes";
import Stat from './Stat';

import { CalendarIcon, TempIcon, FootprintsIcon } from 'app/components/Icons';

import { StatCollection } from './styles';


interface StatProps {
    pack: Pack;
}

const Statistics: React.FC<StatProps> = ({ pack }) => {
    const { season, duration, duration_unit, gender, temp_range, id, title } = pack;
    const durationValue = () => {
        if (!duration) {
            return null;
        }
        return `${duration} ${duration_unit}`;
    };

    let packUrlLabel = "Pack URL " + (pack.public ? "" : "(private)");
    const packUrl = getPackPath(id, title);

    return (
        <StatCollection>
            <Stat label="Season" value={season} icon={<Icon component={CalendarIcon}/>}/>
            <Stat label="Temp Range" value={temp_range} icon={<Icon component={TempIcon}/>}/>
            <Stat label="Duration" value={durationValue()} icon={<Icon component={FootprintsIcon}/>}/>
            <Stat label="Gender" value={getGenderName(gender)}/>
            <Stat label={packUrlLabel} value={packUrl} icon={<Icon type="link"/>}></Stat>
        </StatCollection>
    )

};

export default Statistics;