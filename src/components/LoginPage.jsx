import React, { useState } from 'react';
import axios from 'axios';
import '../Styling/LoginPage.css';
import HeroNavbar from './HeroNavbar';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling
import Swal from 'sweetalert2';

function LoginPage() {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });
  const navigation = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://www.cv.techdriveinnovation.com/login', {
        email: username,
        password: password,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Login successful',
          text: 'You have successfully logged in!',
        }).then(() => {
          console.log('Login successful');
          navigation('/home');
        });
      } else {
        setError('Incorrect email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
    }
  };



  return (
    <>
      <HeroNavbar />
      <div className="login-container">
        <div className="login-box"  data-aos="zoom-in">
          <h1  data-aos="fade-up">Login Account</h1>
          {error && <p className="error-message">{error}</p>}
          <div className="input-container">
            <FontAwesomeIcon icon={faUser} className="input-icon"  data-aos="zoom-in"/>
            <input  data-aos="zoom-in"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              autoComplete="off"
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faLock} className="input-icon"  data-aos="zoom-in"/>
            <input  data-aos="zoom-in"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              autoComplete="off"
            />
            <FontAwesomeIcon 
              icon={showPassword ? faEyeSlash : faEye}
              className="password-toggle-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className="forget-pass">
            <a href="/forget-password">Forget Password ?</a>
          </div>
          <div className="login-btn">
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
