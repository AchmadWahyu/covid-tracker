import React, { useState, useEffect } from 'react'
import {Line, Bar} from "react-chartjs-2";
import { fetchDailyData } from '../../apis';

import styles from "./Chart.module.css"

const Chart = ({data: {confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData())
        }

        
        fetchAPI()
    },[])
    
    console.log("country: ",country)
    
    const lineChart = (
        dailyData.length?
        <Line
            data={{
                labels: dailyData.map(({date}) => date),
                datasets: [
                    {
                        data: dailyData.map(({confirmed}) => confirmed),
                        label: 'Infected',
                        borderColor: "#E64C2C",
                        fill: true,
                    },
                    {
                        data: dailyData.map(({deaths}) => deaths),
                        label: 'Deaths',
                        borderColor: "#2CBCE6",
                        fill: true,
                    },
                ]
            }}
            options={{
                title:{ display: true, text: `Data global`}
            }}
        />
        : null
    )

    const barChart = (
        confirmed && (
            <Bar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets:[{
                        label: 'People',
                        backgroundColor: ['coral', 'teal', 'hotpink'],
                        data:[confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: {display: false},
                    title:{ display: true, text: `Data di negara ${country}`}
                }}
            />
        )
    )
    
    return (
        <div className={styles.container}>
            {country? barChart: lineChart}
        </div>
    )
}

export default Chart