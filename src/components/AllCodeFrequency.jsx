import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../Styling/AllCodeFrequency.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

function CodeFrequency() {
  AOS.init({
    duration: 1000,
    once: false,
  });

  const { repoId } = useParams();
  const [codeFrequencyData, setCodeFrequencyData] = useState([]);
  const [chartWidth, setChartWidth] = useState(window.innerWidth >= 768 ? 800 : 300);

  const updateChartWidth = () => {
    setChartWidth(window.innerWidth >= 768 ? 800 : 300);
  };

  useEffect(() => {
    axios
      .get(`http://www.cv.techdriveinnovation.com/api/code-frequency`)
      .then((response) => {
        const processedData = processCodeFrequencyData(response.data.data);
        setCodeFrequencyData(processedData);
      })
      .catch((error) => {
        console.error('Error fetching code frequency data:', error);
      });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateChartWidth);
    return () => {
      window.removeEventListener('resize', updateChartWidth);
    };
  }, []);

  const processCodeFrequencyData = (data) => {
    const formattedData = [];
    for (const innerArray of data) {
      for (const entry of innerArray) {
        const [timestamp, additions, deletions] = entry;
        formattedData.push({
          week: timestamp,
          additions: additions,
          deletions: deletions,
        });
      }
    }
    return formattedData;
  };

  return (
    <div className='AllCodeFrequency-main'>
      <div>
        <h2 style={{ textAlign: 'center', color: '#0366d6' }} data-aos="fade-up">Code Frequency Chart</h2>
        <div data-aos="fade-down">
          <AreaChart
            width={chartWidth}
            height={400}
            data={codeFrequencyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis
              domain={['auto', 'auto']}
              tickCount={5}
            />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="additions"
              stackId="1"
              stroke="#28a745"
              fill="#28a745"
              name="Additions"
            />
            <Area
              type="monotone"
              dataKey="deletions"
              stackId="1"
              stroke="#d73a49"
              fill="#d73a49"
              name="Deletions"
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
}

export default CodeFrequency;