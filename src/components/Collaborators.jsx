import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling


function Collaborator() {

  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });



  const { repoId } =useParams()
    // console.log(repoId)
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    // Fetch collaborators data
    axios.get(`http://www.cv.techdriveinnovation.com/api/collaborators/${repoId}`)
      .then((response) => {
        setCollaborators(response.data);
      })
      .catch((error) => {
        console.error('Error fetching collaborators:', error);
      });
  }, []);

  return (
    <>
        <Navbar />
    <div className='page-collabrators'>
      <div data-aos="fade-up">
      <h1 data-aos="fade-down">Collaborators</h1>
      <hr data-aos="fade-up"></hr>
      <ul data-aos="zoom-in">
        {collaborators.map((collaborator) => (
          <li key={collaborator._id}>
            {collaborator.username}{' '}
            {collaborator.accessLevel === 'true' ? 'Verified' : 'Not Verified'}
          </li>
        ))}
      </ul>
      </div>
    </div>
    </>
  );
}

export default Collaborator;