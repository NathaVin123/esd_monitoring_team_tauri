import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomPieChart = ({ data, dataKey, nameKey, innerRadius = 60, outerRadius = 80, cx = '50%', cy = '50%', showLegend = true }) => {
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
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            {showLegend && <Legend />}
        </PieChart>
    );
}

export default CustomPieChart;
