import React, { useState, useEffect } from 'react';
import '../Styling/Repositorylist.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons'; 
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling



function RecentlyOpenedRepos() {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });

  const [recentlyOpenedRepos, setRecentlyOpenedRepos] = useState([]);

  useEffect(() => {
    // Fetch recently opened repositories (limit to 6)
    const fetchRecentlyOpenedRepos = async () => {
      try {
        const response = await axios.get('http://www.cv.techdriveinnovation.com/get-recently-opened-repos');
        setRecentlyOpenedRepos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecentlyOpenedRepos();
  }, []);
  const openRepository = async (repoId) => {
    try {
      // Make a POST request to the API route for opening a repository
      await axios.post(`http://www.cv.techdriveinnovation.com/${repoId}`);
      // Optionally, you can refresh the repository list after opening to reflect the changes
      // FetchRepositories(); // Assuming you have a fetchRepositories function
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='Repositorylist-maini'>
      <h2 data-aos="zoom-in">Recently Opened Repositories :</h2>
      <ul data-aos="fade-up">
        {recentlyOpenedRepos.map((repo) => (

          <li key={repo._id}>

            <a onClick={() => openRepository(repo._id)} href={`/repos/${repo._id}`}>{repo.name}</a>
            <FontAwesomeIcon icon={faClock} size="2x" className='recent-icon'/> 
            </li>
        
        ))}
      </ul>
    </div>
  );
}

export default RecentlyOpenedRepos;