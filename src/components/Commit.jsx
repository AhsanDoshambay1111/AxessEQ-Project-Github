import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Styling/commit.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling


function Commit() {

  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });


    const { repoId } = useParams();
    const [commits, setCommits] = useState([]);
    console.log(repoId)
  useEffect(() => {
    // Make an API request to fetch commits data
    axios.get(`http://www.cv.techdriveinnovation.com/api/commits/${repoId}`)
      .then((response) => {
        setCommits(response.data);
        console.log(commits)
      })
      .catch((error) => {
        console.error('Error fetching commits:', error);
      });
  }, []);

  return (
    <>
        <Navbar />

    <div className='commits-main'>
      <h2 data-aos="zoom-in">Commits</h2>
      <hr data-aos="fade-up"/>
      <div className='commits-table'>
      <ul>
  {commits.map((commit) => (
    <React.Fragment key={commit._id}>
      <li data-aos="zoom-in">
        <div data-aos="zoom-in">
          <strong data-aos="fade-up" className='commits-msg'>Message :</strong> {commit.message }<br className="br-commit"></br>
          <strong data-aos="zoom-in" className='commits-msg'>Author :</strong> {commit.authorName }<br className="br-commit"></br>
          <strong data-aos="zoom-in" className='commits-msg'>Verification :</strong> {commit.verification }<br className="br-commit"></br>
          <strong data-aos="zoom-in" className='commits-msg'>Timestamp :</strong> {commit.timestamp }
        </div>
        <p className='verified' data-aos="fade-down">Verified</p>
      </li>
      <hr /> {/* Add this line to insert the horizontal rule */}
    </React.Fragment>
  ))}
</ul>

      
      </div>
    </div>
    </>
  );
}

export default Commit;
