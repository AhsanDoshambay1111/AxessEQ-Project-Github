import React, { useEffect, useState } from 'react';
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area } from 'recharts';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Styling/AllCodeFrequency.css';
import Navbar from '../components/Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling

const ResponsiveAreaChart = ({ codeFrequencyData }) => {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });

  const [chartWidth, setChartWidth] = useState(800); // Default width

  useEffect(() => {
    // Update the chart width based on the window's inner width
    const updateChartWidth = () => {
      if (window.innerWidth > 768) {
        setChartWidth(800); // Set width to 800px for larger screens
      } else {
        setChartWidth(window.innerWidth); // Set width to the window's inner width for smaller screens
      }
    };

    // Attach the event listener for window resize
    window.addEventListener('resize', updateChartWidth);

    // Initial width setup
    updateChartWidth();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateChartWidth);
    };
  }, []);

  return (
    <AreaChart
      className='code-frequencychart'
      width={chartWidth}
      height={400}
      data={codeFrequencyData}
      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='week' />
      <YAxis
        domain={['auto', 'auto']} // Set Y-axis domain to automatically adjust to data
        tickCount={5} // Adjust the number of Y-axis ticks as needed
      />
      <Tooltip />
      <Legend />
      <Area
        type='monotone'
        dataKey='additions'
        stackId='1' // Stack additions and deletions
        stroke='#28a745' // Green color for additions
        fill='#28a745'
        name='Additions'
      />
      <Area
        type='monotone'
        dataKey='deletions'
        stackId='1' // Stack additions and deletions
        stroke='#d73a49' // Red color for deletions
        fill='#d73a49'
        name='Deletions'
      />
    </AreaChart>
  );
};

function CodeFrequency() {
  const { repoId } = useParams();
  const [codeFrequencyData, setCodeFrequencyData] = useState([]);

  useEffect(() => {
    // Fetch code frequency data from GitHub API
    axios
      .get(`http://www.cv.techdriveinnovation.com/api/code-frequency/${repoId}`)
      .then((response) => {
        // Process and set the code frequency data in the state
        console.log(response.data[0].data);
        const processedData = processCodeFrequencyData(response.data[0].data);
        setCodeFrequencyData(processedData);
      })
      .catch((error) => {
        console.error('Error fetching code frequency data:', error);
      });
  }, []);

  // Function to process code frequency data and differentiate additions and deletions
  const processCodeFrequencyData = (data) => {
    return data.map((entry) => ({
      week: entry[0], // Use the first element as the week
      additions: entry[1], // Use the second element as additions
      deletions: entry[2], // Use the third element as deletions
    }));
  };

  return (
    <>
      <Navbar />
      <div className='AllCodeFrequency-main2' data-aos="fade-up">
        <div data-aos="fade-up">
          <h2 style={{ textAlign: 'center', color: '#0366d6' }} data-aos="fade-down">code Frequency Chart</h2>
          <hr></hr>
          <ResponsiveAreaChart codeFrequencyData={codeFrequencyData} />
        </div>
      </div>
    </>
  );
}

export default CodeFrequency;
