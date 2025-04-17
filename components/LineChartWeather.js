import React from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { useEffect, useState } from 'react';
import { get_weather_data } from '@/utils/api_call';
function LineChartWeather({ lat, lng }) {

    const [weatherData, setWeatherData] = useState([])
    useEffect(() => {

        get_weather_data(lat, lng).then((res)=>{
            let data =[]
            for (let index = 0; index < 7; index++) {
                data.push(
                    {
                        'time': res?.daily?.time[index],
                        'temperature_max':res?.daily?.temperature_2m_max[index],
                        'temperature_min':res?.daily?.temperature_2m_min[index],
                        'rain_sum':res?.daily?.rain_sum[index],
                        'precipitation_hours':res?.daily?.precipitation_hours[index],
                        'precipitation_probability_max':res?.daily?.precipitation_probability_max[index]
                                
                    
                    }
                    )    
                
            }
            setWeatherData(data)
        })

    }, [lat,lng])
    console.log({weatherData});

    return (
        <div className='w-full h-full'>
             <ResponsiveContainer width="100%" height="100%">

                <LineChart
                    width={500}
                    height={300}
                    data={weatherData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperature_max" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="temperature_min" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="rain_sum" stroke="#0F2167" />
                    <Line type="monotone" dataKey="precipitation_hours" stroke="#E26EE5" />
                    <Line type="monotone" dataKey="precipitation_probability_max" stroke="#E26EE5" />
                </LineChart>
             </ResponsiveContainer>

        </div>
    )
}

export default LineChartWeather