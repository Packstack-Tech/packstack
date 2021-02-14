import { WeightUnit } from 'enums';
import * as React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, LabelList, LabelProps, Cell, Pie, PieChart, Tooltip, TooltipProps } from 'recharts';

import { CategoryItemSpecs } from "types/category";
import { Option, Select } from "../FormFields/";

interface CategoryChartProps {
    data: CategoryItemSpecs[];
    unit: WeightUnit
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data, unit }) => {
    const [chartType, setChartType] = React.useState<Option<number>>({value: 0, label: 'Bar Chart'});

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

    const PieToolTip = (props: TooltipProps) =>  {
        if (props.active && props.payload) {
            const text: string = props.payload[0].name + ': ' + props.payload[0].value + ' ' + unit;
            return ( 
                <div style={{backgroundColor: '#AAAAA'}}>
                    <span 
                        style={{
                            fontSize:'16px',
                            fontWeight:'bold',
                            color: props.payload[0].payload.fill,
                            backgroundColor:'white',
                            padding:'5px',
                            borderRadius:'5px'}}>
                        {text}
                    </span>
                </div>
          );
        }
        return null;
    }

    const pieData = data.map(record => {
        record.total.value = Number(record.total.value.toFixed(2)); //convert the displayed weight to show only 2 decimal places
        return record;
    })
    const height = 40 * data.length;
    const options = [{value: 0, label: 'Bar Chart'}, {value: 1, label: 'Pie Chart'}];

    function onChartTypeChange(event: Option<number>) {
        setChartType(event);
    }
    
    const Chart = () => {
        if (chartType.value == 0) {
            return <div style={{ height }}>
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
        }
        else {
            return <div style={{ height: '250px' }}>
            <ResponsiveContainer>
                    <PieChart>
                        <Pie data={pieData} dataKey="total.value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={100}>
                            {data.map(rec => <Cell key={rec.id} fill={rec.color}/>)}
                        </Pie>
                        <Tooltip content={PieToolTip} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        }
    }
    return <div>
             <Select 
                        label="Chart Type"
                        options={options}
                        value={chartType}
                        onChange={onChartTypeChange}
                        style={{width: '90%', margin: '0 auto'}}
                />   
                <Chart></Chart> 
            </div>
    
};

export default React.memo(CategoryChart);