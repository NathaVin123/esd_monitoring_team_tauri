import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Define the type for the chart data
interface ChartData {
    name: string;
    value: number;
}

// Define the prop types for CustomPieChart
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomPieChart: React.FC<CustomPieChartProps> = ({
                                                           data = [], // Default to an empty array
                                                           dataKey,
                                                           nameKey,
                                                           innerRadius = 60,
                                                           outerRadius = 80,
                                                           cx = '50%',
                                                           cy = '50%',
                                                           showLegend = true,
                                                       }) => {
    return (
        <PieChart width={400} height={400}>
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
            <Tooltip />
            {showLegend && <Legend />}
        </PieChart>
    );
}

export default CustomPieChart;
