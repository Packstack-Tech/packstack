import * as React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, LabelList, LabelProps, Cell } from 'recharts';

import { CategoryItemSpecs } from "types/category";

interface CategoryChartProps {
    data: CategoryItemSpecs[];
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
    if (!data.length) {
        return null;
    }

    const CategoryLabel = (props: LabelProps) => {
        const { x, y, value, fill } = props;
        const baseX = x!;
        const baseY = y! - 2;
        return (
            <g>
                <text fill={fill}
                      fontSize={12}
                      fontFamily="Roboto Condensed"
                      fontWeight={600}
                      dominantBaseline="top"
                      y={baseY}
                      x={baseX}>
                    {value!.toString().toUpperCase()}
                </text>
            </g>
        );
    };

    const height = 40 * data.length;
    return (
            <div style={{ height }}>
                <ResponsiveContainer>
                    <BarChart data={data} layout="vertical" barCategoryGap={12}>
                        <YAxis type="category" dataKey="name" tick={false} axisLine={false} tickMargin={0} width={12}/>
                        <XAxis type="number" dataKey="total.value" tick={false} axisLine={false} height={0} width={0}/>
                        <Bar dataKey="total.value">
                            <LabelList dataKey="name" content={CategoryLabel}/>
                            {data.map(rec => <Cell key={rec.id} fill={rec.color}/>)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
    );
};

export default React.memo(CategoryChart);