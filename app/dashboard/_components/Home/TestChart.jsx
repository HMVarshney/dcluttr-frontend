"use client"


import { useEffect, useState } from 'react';
import cube from '@cubejs-client/core';
import AreaChart from './AreaChart';
import { DatePickerWithRange } from './DatePickerWithRange';
import moment from 'moment';

const cubeApi = cube(
    process.env.NEXT_PUBLIC_CUBEJS_TOKEN,
    { apiUrl: process.env.NEXT_PUBLIC_CUBEJS_API_URL }
);

export default function TestChart() {

    const [data, setData] = useState(null);
    const [dateRange, setDateRange] = useState({
        from: moment('2019-01-01', "YYYY-MM-DD")._d,
        to: moment('2022-12-23', "YYYY-MM-DD")._d,
        value: null
    });
    useEffect(() => {
        loadData();
    }, [dateRange]);

    const loadData = () => {
        setData(null);
        cubeApi
            .load({
                "measures": [
                    "orders.mau",
                    "orders.wau"
                ],
                "limit": 5000,
                "timeDimensions": [
                    {
                        "dimension": "orders.created_at",
                        "granularity": "quarter",
                        "dateRange": dateRange.value
                            ? dateRange.value
                            : [
                                dateRange.from ? moment(dateRange.from).format("YYYY-MM-DD") : "2019-01-01",
                                dateRange.to ? moment(dateRange.to).format("YYYY-MM-DD") : "2022-12-23"
                            ]
                    }
                ]
            })
            .then(({ loadResponses }) => {
                setData(loadResponses?.[0]?.data);
                console.log(loadResponses?.[0]?.data);
            })
            .catch((error) => { });
    }


    return (<>
        <div className='m-8 flex gap-8'>
            <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
        </div>

        <div className='m-8 flex gap-8'>

            <AreaChart
                isLoading={!data}
                data={{
                    title: 'Spends',
                    dataKeyXAxis: "orders.created_at",
                    series: [
                        {
                            name: "Spends",
                            dataKey: "orders.wau",
                            id: 3,
                            color: '#DB3500CC',
                            type: 'line'
                        },
                        {
                            name: "Revenue",
                            dataKey: "orders.mau",
                            id: 4,
                            color: '#2EB76F',
                            type: 'area'
                        },
                    ],
                    data,
                }} details={{ title: 'ROAS', }} />
        </div>

    </>
    )
}