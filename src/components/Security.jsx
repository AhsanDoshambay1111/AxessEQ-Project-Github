import React, { useState } from 'react';
import '../Styling/security.css';
import Navbar from "../components/Navbar";
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'; // Make sure to import Axios for making API requests
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling
import Swal from 'sweetalert2';

function Security() {

  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });


  // State to store form data
  const [formData, setFormData] = useState({
    question1: '',
    answer1: '',
    question2: '',
    answer2: '',
    question3: '',
    answer3: '',
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send a POST request to your backend API to store the security questions and answers
      const response = await axios.post('http://www.cv.techdriveinnovation.com/api/security-questions/submit', formData);

      // Handle a successful response, e.g., show a success message to the user
      console.log(response.data.message);
      // alert(response.data.message)
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
  
         // Clear the form input fields by resetting the formData state
    setFormData({
        question1: '',
        answer1: '',
        question2: '',
        answer2: '',
        question3: '',
        answer3: '',
      });
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error('Error submitting security questions:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while submitting security questions.',
      });
    }
  };
  
  return (
    <>
     <Navbar />
    <div className='security-main'>
    <div className='security-main2' data-aos="zoom-in">

      <div className='security-head'>
      <h2 data-aos="zoom-in">Add Security Questions</h2>
      <FontAwesomeIcon icon={faLock} className='security-icon' data-aos="zoom-in"/>
      </div>
      <form onSubmit={handleSubmit}>



<div className='security-qa' data-aos="fade-down">
        {/* Security Question 1 */}
        <input
          type="text"
          name="question1"
          value={formData.question1}
          onChange={handleInputChange}
          placeholder="Security Question 1"
        className='security-question' autoComplete='off'/>
        <input
          type="text"
          name="answer1"
          value={formData.answer1}
          onChange={handleInputChange}
          placeholder="Answer 1"
autoComplete='off'></input>
</div>



<div className='security-qa' data-aos="fade-up">
        {/* Security Question 2 */}
        <input
          type="text"
          name="question2"
          value={formData.question2}
          onChange={handleInputChange}
          placeholder="Security Question 2"
        className='security-question' autoComplete='off'/>
        <input
          type="text"
          name="answer2"
          value={formData.answer2}
          onChange={handleInputChange}
          placeholder="Answer 2"
        autoComplete='off' />
</div>


<div className='security-qa' data-aos="fade-down">
        {/* Security Question 3 */}
        <input
          type="text"
          name="question3"
          value={formData.question3}
          onChange={handleInputChange}
          placeholder="Security Question 3"
        className='security-question' autoComplete='off'/>
        <input
          type="text"
          name="answer3"
          value={formData.answer3}
          onChange={handleInputChange}
          placeholder="Answer 3"
        autoComplete='off'/>
</div>



<div className='security-button'>
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </div>
    </>
  );
}

export default Security;