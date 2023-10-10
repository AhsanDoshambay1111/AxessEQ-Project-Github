import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Styling/contributorchart.css'
import Navbar from "../components/Navbar";
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
import { useParams } from "react-router-dom";
function ContributorChart() {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });
    const { repoId } =useParams()
  const [contributorsData, setContributorsData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Additions");

  useEffect(() => {
    axios
      .get(
        `http://www.cv.techdriveinnovation.com/contributors/${repoId}` 
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

  const data = contributorsData.map((contributor) => ({
    name: contributor.author.login,
    Additions: contributor.weeks.reduce((total, week) => total + week.a, 0),
    Deletions: contributor.weeks.reduce((total, week) => total + week.d, 0),
    Commits: contributor.weeks.reduce((total, week) => total + week.c, 0),
  }));

  const options = [
    { label: "Additions", value: "Additions", color: "#82ca9d" },
    { label: "Deletions", value: "Deletions", color: "#8884d8" },
    { label: "Commits", value: "Commits", color: "#ff7f00" },
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const filteredData = data.map((item) => ({
    name: item.name,
    [selectedOption]: item[selectedOption],
  }));

  return (
    <>
    <Navbar />
    <div className="contributorchart-main">
      <div className="userchart-main2" data-aos="fade-up">

       <div className="chart-select"  data-aos="fade-up">
      <h1 ata-aos="fade-down">Contributors</h1>
      <select value={selectedOption} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      </div> 
      <BarChart width={800} height={400} data={filteredData} className="user-chart" >
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
    </>
  );

}
export default ContributorChart;