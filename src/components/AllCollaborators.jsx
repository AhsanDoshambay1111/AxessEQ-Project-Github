import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styling/allcollabrators.css'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling

function AllCollaborators() {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    // Define the URL for fetching data from your API
    // const apiUrl = '/api/collaborators';

    // Use Axios to make a GET request to your API endpoint
    axios.get("http://www.cv.techdriveinnovation.com/api/collaborators")
      .then((response) => {
        // Handle the successful response here
        setCollaborators(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error fetching collaborators:', error);
      });
  }, []);

  return (
    <div className='allcollabrators-main'  data-aos="zoom-in">
      <h2>All Collaborators</h2>
      <hr></hr>
      <ul>
        {collaborators.map((collaborator, index) => (
          <li key={index}>
            {collaborator.username}{' '}
            {collaborator.accessLevel === 'true' ? 'Verified' : 'Not Verified'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllCollaborators;