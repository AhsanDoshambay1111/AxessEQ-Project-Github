import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styling/totalrepo.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling

function TotalRepo() {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      const response = await axios.get('http://www.cv.techdriveinnovation.com/api/get-repositories');
      setRepositories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='totalrepo-name'>
    <div className="totalrepo-container" data-aos="zoom-in">
      <h2><span>AxessEQ </span>Repositories</h2>
      <hr></hr>
      <p>Total Repositories : {repositories.length}</p>
    </div>
    </div>
  );
}

export default TotalRepo;
