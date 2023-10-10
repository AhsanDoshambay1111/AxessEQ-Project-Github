import React from "react";
import "../Styling/Home.css";
import Repositorylist from "../components/Repositorylist";
import Navbar from "../components/Navbar";
import Front from "../components/Front";
import UserChart from '../components/UserChart'
import AllCodeFrequency from '../components/AllCodeFrequency'

function Home() {
  return (
    <>
      <Navbar />
      <div className="repo-front">
        <div className="repository-section">
          <Repositorylist/>
        </div>
        <div className="home-container">
          
          <div>
            <Front/>
          </div>
          
        </div>
      </div>    
      
       <div>
        <UserChart />
      </div>
      
      <div>
        <AllCodeFrequency/>
      </div>
    </>
  );
}

export default Home;
