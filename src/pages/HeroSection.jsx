import React from 'react';
import '../Styling/HeroSection.css'; // Import your CSS file for styling
import HeroNavbar from '../components/HeroNavbar';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

function HeroSection() {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: true,     // Whether the animation should only happen once
  });
  return (
    <>
    <HeroNavbar/>
    <div className="hero-section">
      <div className="hero-content">
        <img src={`${require("../assets/AxessEQ Logo.png")}`} alt=""  data-aos="fade-up"/>
        <h1  data-aos="fade-down">Welcome to AxessEQ</h1>
        <p  data-aos="fade-up">Your Ultimate Solution for Sequencing Data Analysis</p>
        <a href="https://www.axesseq.com/" className="cta-button">Get Started</a>
      </div>
    </div>
    </>
  );
}

export default HeroSection;