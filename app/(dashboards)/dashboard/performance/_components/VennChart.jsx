"use client"
import CustomActiveDot from '@/components/CustomActiveDot';
import React from 'react';
import { ScatterChart, Scatter, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, XAxis, YAxis, Legend } from 'recharts';

const data01 = [
    {
        "x": 1,
        "y": 10,
        "z": 1
    }
];
const data02 = [
    {
        "x": 6,
        "y": 10,
        "z": 1
    },
];

const VennChart = () => (
    <ResponsiveContainer width={286} height={200}>
        <ScatterChart margin={{ top: 90, right: 20, bottom: 20, left: 20 }}>
            <XAxis dataKey="x" type="number" name="stature" unit="cm" axisLine={false} tickLine={false} tick={{ fontSize: 0 }} />

            <YAxis dataKey="y" type="number" name="weight" unit="kg" axisLine={false} tickLine={false} tick={{ fontSize: 0 }} />
            <Scatter
                name="B school"
                data={data01}
                fill="#1D874F33"
                shape={(props) => (
                    // <circle cx={props.cx} cy={props.cy} r={99} fill={props.fill} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="none">
                        <circle cx={props.cx} cy={props.cy} r="99.8594" fill="#0081FB" fill-opacity="0.1" />
                        <circle cx={props.cx} cy={props.cy} r="99.2578" stroke="#0081FB" stroke-opacity="0.2" stroke-width="1.20312" />
                    </svg>
                )}
            />
            <Scatter
                name="B school"
                data={data02}
                fill="#0081FB33"
                shape={(props) => (
                    <circle cx={props.cx} cy={props.cy} r={54} fill={props.fill} />
                )}
            />
        </ScatterChart>
    </ResponsiveContainer>
);

export default VennChart;
