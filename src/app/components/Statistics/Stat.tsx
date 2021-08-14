import * as React from 'react';

import { StatWrapper } from "./styles";
import { Label } from "../FormFields/styles";

interface StatProps {
    label: string;
    icon?: JSX.Element;
    value?: string | null;
}

const Statistic: React.FC<StatProps> = ({ label, icon, value }) => {
    if (!value) {
        return null;
    }

    return (
        <StatWrapper>
            <Label>
                {label}
            </Label>
            <p>{value}</p>
        </StatWrapper>
    )
};

export default Statistic;