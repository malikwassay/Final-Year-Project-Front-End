import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const CityChart = ({ data, city, height }) => (
  <div style={{ width: '100%', height: height }}>
    <h2 style={{ textAlign: 'center' }}>{`Real-time Predictions of Total Cases (${city})`}</h2>
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="dataPoint" 
          label={{ value: 'Data Point', position: 'bottom' }}
        />
        <YAxis 
          label={{ value: 'Total Cases', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip />
        <Legend 
          wrapperStyle={{
            paddingLeft: '20px',
          }}
          formatter={(value) => {
            return <span style={{ marginRight: '1564px' }}>{value}</span>;
          }}
        />
        <Line
          type="monotone"
          dataKey="predicted"
          name="Predicted Values"
          stroke="#8884d8"
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="future"
          name="Future Predictions"
          stroke="#82ca9d"
          strokeDasharray="5 5"
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const Graph = () => {
  const [data, setData] = useState({
    iquitos: [],
    sanjuan: [],
    lima: [],
    cajamarca: [],
    pucallpa: [],
    tarapoto: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/predict_all');
        
        const transformedData = {};
        
        // Transform data for all cities
        Object.keys(response.data).forEach(city => {
          // Transform real-time predictions
          const cityData = response.data[city].real_time.map((value, index) => ({
            dataPoint: index,
            predicted: value,
          }));
          
          // Add future predictions
          response.data[city].future_horizon.forEach((value, index) => {
            cityData.push({
              dataPoint: cityData.length + index,
              future: value
            });
          });
          
          transformedData[city] = cityData;
        });

        setData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      {Object.keys(data).map((city, index) => (
        <div key={city} style={{ marginTop: index === 0 ? '0' : '40px' }}>
          <CityChart 
            data={data[city]} 
            city={city.charAt(0).toUpperCase() + city.slice(1)} 
            height="400px" 
          />
        </div>
      ))}
    </div>
  );
};

export default Graph;