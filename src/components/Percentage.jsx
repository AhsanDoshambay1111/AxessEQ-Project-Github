import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import '../Styling/Percentage.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling

function Percentage({ languagePercentages }) {

  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });
  // Define your COLORS object to map language names to colors
  const COLORS = {
    JavaScript: '#F0DB4F',
    HTML: '#F06529',
    CSS: '#264de4', 
    Ruby: '#820C02', 
    SCSS: '#CD6799', 
    Shell: '#76FF03', 
    Phyton: '#3770A3', 
    Php: '#7377AD', 
    mongoDB: '#50A644', 
    TypeScript: '#3A74C0',
    Kotlin: '#B9628C', 
    Rust: '#000000', 
    SQL: '#53A6E4', 
    Java: '#DF3A39', 
    Swift: '#E0452A', 
    tailwindcss: '#5CB8F0', 
    Bootstrap: '#7911F1', 
    Reactjs: '#6AD3F3', 
    vuejs: '#34475B', 
    django: '#112D1F', 
    Angular: '#D72A2E', 
    jQuery: '#3266A7', 
    Laravel: '#DF2D2B', 
    vuejs: '#34475B', 
    Expressjs: '#7E7E7E', 
    Nodejs: '#7FC728',
    Golang: '#53A8D0',
    Flutter: '#295596', 
  };

  const chartData = Object.entries(languagePercentages).map(([language, percentage], index) => ({
    name: language,
    value: parseFloat(percentage),
    fill: COLORS[language] || 'gray', // Use the mapped color or gray as a default
  }));

  return (
    <div className="percentage-container" data-aos="fade-down">
      <h2>Programming Language Distribution</h2>
      <div>
        <PieChart width={400} height={400} className='pie-chart'>
          <Pie data={chartData} dataKey="value" cx={200} cy={200} outerRadius={140} fill="black" label>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
        <div className='languages-name' style={{ textAlign: 'center', marginTop: '0px' }}>
          {chartData.map((entry, index) => (
            <span key={`label-${index}`} style={{ color: entry.fill }}>
              {`${entry.name} (${entry.value}%)`} &nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Percentage;