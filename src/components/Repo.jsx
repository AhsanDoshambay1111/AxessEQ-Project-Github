import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Styling/Repo.css';
import { FaBars, FaSearch } from 'react-icons/fa';
import Navbar from "../components/Navbar";
import Repositorylist from "../components/Repositorylist";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling
import Swal from 'sweetalert2';

function Repo({ showNavbar = true }) {

  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });


  const [repositories, setRepositories] = useState([]);
  const [visibleRepositories, setVisibleRepositories] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');

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

  const loadMoreRepositories = () => {
    setVisibleRepositories(prevVisible => prevVisible + 6);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setVisibleRepositories(6);
  };

  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => (
          part.toLowerCase() === highlight.toLowerCase() ?
            <span key={index} className="highlighted">{part}</span> :
            part
        ))}
      </span>
    );
  };

  const filteredRepositories = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
 
  const handleDeleteContent = async (repoId) => {
    try {
      const response = await axios.delete(
        `http://www.cv.techdriveinnovation.com/repositories/${repoId}`
      );
  
      if (response.status === 204) {
        // Content successfully deleted
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Repository deleted successfully.',
        }).then(() => {
          fetchRepositories();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete repository.',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting repository.',
      });
    }
  };
  
  return (
    <div className='repo-main'>
    {showNavbar && <Navbar />}
    <Repositorylist/>
    <div className="repo-container">
      <h2 data-aos="zoom-in">Repositories</h2>
      <div className="search">


<div className='Repo-name'>

          <div className="search-container" data-aos="fade-down">
          <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Find a repository..."
              value={searchTerm}
              onChange={handleSearch}
            />
     
          </div>
          <Link to={'/CreateRepo'} className='repo-new'>
<div className='New-repo' data-aos="zoom-in">
<FontAwesomeIcon icon={faCodeBranch} className='repo-icon'/>
<p>New</p>
</div>
</Link>

          </div>
        </div>
      <ul className="repo-list">
        {filteredRepositories.slice(0, visibleRepositories).map((repo) => (
          <li className="repo-item" key={repo._id}>
           <div data-aos="fade-down" className='trash-delete'> <Link className="repo-link" onClick={() => openRepository(repo._id)} to={`/repos/${repo._id}`}>
              {highlightText(repo.name, searchTerm)} 
            </Link>
            <span class="a" onClick={() => handleDeleteContent(repo._id)}>
       Delete Repo
      <FontAwesomeIcon icon={faTrashAlt} className='deleterepo-icon'/>
    </span>
    </div>
          </li>
        ))}
      </ul>
      {visibleRepositories < filteredRepositories.length && (
        <button className="view-more-btn" onClick={loadMoreRepositories}>View More</button>
      )}
    </div>
    </div>
  );
}

export default Repo;