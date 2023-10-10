import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Styling/userchart.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Front() {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false,     // Whether the animation should only happen once
    });
  const [contributorsData, setContributorsData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Additions");

  useEffect(() => {
    axios
      .get(
        // "https://api.github.com/repos/AhsanDT/drivetechnology/stats/contributors"
        "http://www.cv.techdriveinnovation.com/contributors/aggregated"
      )
      .then((response) => {
        if (response.data) {
          setContributorsData(response.data);
        } else {
          console.error("No data received from the API.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Extract contributor names, contributions, and additional data
  const data = contributorsData.map((contributor) => ({
    name: contributor.author.login,
    Additions: contributor.weeks.reduce((total, week) => total + week.a, 0),
    Deletions: contributor.weeks.reduce((total, week) => total + week.d, 0),
    Commits: contributor.weeks.reduce((total, week) => total + week.c, 0),
  }));

  // Define options for the dropdown with color mapping
  const options = [
    { label: "Additions", value: "Additions", color: "#82ca9d" },
    { label: "Deletions", value: "Deletions", color: "#8884d8" },
    { label: "Commits", value: "Commits", color: "#ff7f00" },
  ];

  // Function to handle dropdown change
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Filter data based on the selected option
  const filteredData = data.map((item) => ({
    name: item.name,
    [selectedOption]: item[selectedOption],
    // fill: options.find((opt) => opt.value === selectedOption).color,
  }));

  return (
    <div className="userchart-main">
      <div className="userchart-main2" data-aos="fade-up">

       <div className="chart-select" data-aos="zoom-in">
      <h1>Contributors</h1>
      <select value={selectedOption} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      </div> 
      <BarChart width={800} height={400} data={filteredData} className="user-chart">
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={selectedOption}
          fill={options.find((opt) => opt.value === selectedOption)?.color}
          stackId="a"
        />
      </BarChart>
    </div>
    </div>
  );
}

export default Front;