import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, TooltipProps } from 'recharts';

interface ChartData {
    name: string;
    value: number;
    unit: 'seconds' | 'minutes' | 'hours';
}

interface CustomPieChartProps {
    data: ChartData[];
    dataKey: string;
    nameKey: string;
    innerRadius?: number;
    outerRadius?: number;
    cx?: string | number;
    cy?: string | number;
    showLegend?: boolean;
}

const COLORS = ['#0000FF', '#FF0000', '#FFBB28', '#FF8042'];

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, value, payload: { unit } } = payload[0];
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
                <p>{`${name}: ${value} ${unit}`}</p>
            </div>
        );
    }

    return null;
};

const CustomPieChart: React.FC<CustomPieChartProps> = ({ data = [], dataKey, nameKey, innerRadius = 60, outerRadius = 80, cx = '50%', cy = '50%', showLegend = true }) => {
    return (
        <PieChart width={500} height={500}>
            <Pie
                data={data}
                dataKey={dataKey}
                nameKey={nameKey}
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                fill="#8884d8"
                paddingAngle={5}
            >
                {data && data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
        </PieChart>
    );
}

export default CustomPieChart;
