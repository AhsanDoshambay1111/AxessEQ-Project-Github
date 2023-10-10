import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styling/forgetpassword.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import HeroNavbar from "../components/HeroNavbar";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS for styling
import Swal from "sweetalert2";

function ForgotPassword() {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false, // Whether the animation should only happen once
  });

  const navigate = useNavigate();
  const [securityQuestions, setSecurityQuestions] = useState([]); // Fetch security questions from the backend
  const [answers, setAnswers] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [resetSuccessful, setResetSuccessful] = useState(false);

  // Function to fetch security questions from the backend
  const fetchSecurityQuestions = async () => {
    try {
      const response = await axios.get(
        "http://www.cv.techdriveinnovation.com/api/security-questions"
      ); // Replace with your API endpoint
      setSecurityQuestions(response.data);
    } catch (error) {
      console.error("Error fetching security questions:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the user's answers
    const userAnswers = {
      answer1: answers.answer1,
      answer2: answers.answer2,
      answer3: answers.answer3,
    };

    try {
      // Send the user's answers to the backend for validation
      const response = await axios.post(
        "http://www.cv.techdriveinnovation.com/api/security-questions/validate-answers",
        { answers: userAnswers } // Make sure to use the correct key
      );

      if (response.data.success) {
        // If answers are correct, allow the user to set a new password
        setResetSuccessful(true);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Answers are correct. You can now set a new password.",
          customClass: {
            confirmButton: "swal-button-custom-color",
            icon: "swal-icon--success",
          },
        });
      } else {
        // If answers are incorrect, show an error message
        alert("Incorrect answers. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        // If the error has a response, it's an Axios error with a status code
        if (error.response.status === 401) {
          // If status code is 401, show an alert for incorrect password
          // alert("Incorrect password. Please try again.");
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Incorrect answers. Please try again.",
            customClass: {
              confirmButton: "swal-button-custom-color",
              icon: "swal-icon--error",
            },
          });
        } else if (error.response.status === 500) {
          // If status code is 500, show an alert for network error
          Swal.fire({
            icon: "info",
            title: "Error",
            text: "Network error. Please try again later.",
            customClass: {
              confirmButton: "swal-button-custom-color",
            },
          });
        } else {
          // Handle other status codes here if needed
          console.log("Unexpected status code:", error.response.status);
        }
      } else if (error.request) {
        // If the error has a request, it's a network error
        Swal.fire({
            icon: "info",
            title: "Error",
            text: "Network error. Please try again later.",
            customClass: {
              confirmButton: "swal-button-custom-color",
            },
          });
      } else {
        // Handle other types of errors here if needed
        console.error(error);
      }
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      Swal.fire({
        icon: "error",
        title: "Password Error",
        text: "Password cannot be empty.",
        customClass: {
          confirmButton: "swal-button-custom-color",
        },
      });
      return; // Don't proceed further
    }

    // Check if the new password meets the length requirement
    if (newPassword.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Password Error",
        text: "Password must be at least 8 characters long.",
        customClass: {
          confirmButton: "swal-button-custom-color",
        },
      });
      return; // Don't proceed further
    }

    // Check if the new password is strong
    if (!isStrongPassword(newPassword)) {
      Swal.fire({
        icon: "error",
        title: "Password Error",
        text: "Password is not strong enough. It should contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        customClass: {
          confirmButton: "swal-button-custom-color",
        },
      });
      return; // Don't proceed further
    }

    try {
      // Send the new password to the backend for updating
      await axios.post("http://www.cv.techdriveinnovation.com/api/reset-password", {
        newPassword,
      }); // Replace with your API endpoint

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password reset successful. You can now log in with your new password.",
        customClass: {
          confirmButton: "swal-button-custom-color",
        },
      });

      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  // Function to check if a password is strong
  function isStrongPassword(password) {
    // Check if the password contains at least one uppercase letter and at least one special character
    const uppercaseRegex = /[A-Z]/;
    const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/; // You can modify this to include the special characters you want

    return (
      uppercaseRegex.test(password) && specialCharacterRegex.test(password)
    );
  }

  useEffect(() => {
    fetchSecurityQuestions();
  }, []);

  return (
    <>
      <HeroNavbar />

      <div className="forget-main">
        <div className="forget-main2">
          {resetSuccessful ? (
            // Display a form for resetting the password
            <div className="resetpass-main">
              <div className="resetpass-icon" data-aos="fade-up">
                <h2>Password Reset</h2>
                <FontAwesomeIcon
                  icon={faSync}
                  className="key"
                  data-aos="fade-down"
                />
              </div>
              <input
                data-aos="fade-down"
                required
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button onClick={handleResetPassword} data-aos="fade-up">
                Reset Password
              </button>
            </div>
          ) : (
            // Display the security questions
            <form onSubmit={handleSubmit}>
              {securityQuestions.length > 0 && (
                <>
                  <h3 className="forget-head" data-aos="fade-up">
                    Answer The Questions
                  </h3>
                  <div className="forget-questions-main" data-aos="fade-down">
                    <p>{securityQuestions[0].question1}</p>
                    <input
                      required
                      type="text"
                      placeholder="Your Answer"
                      value={answers.answer1 || ""}
                      onChange={(e) =>
                        setAnswers({ ...answers, answer1: e.target.value })
                      }
                    />
                  </div>
                  <div className="forget-questions-main" data-aos="fade-up">
                    <p>{securityQuestions[0].question2}</p>
                    <input
                      required
                      type="text"
                      placeholder="Your Answer"
                      value={answers.answer2 || ""}
                      onChange={(e) =>
                        setAnswers({ ...answers, answer2: e.target.value })
                      }
                    />
                  </div>
                  <div className="forget-questions-main" data-aos="fade-down">
                    <p>{securityQuestions[0].question3}</p>
                    <input
                      required
                      type="text"
                      placeholder="Your Answer"
                      value={answers.answer3 || ""}
                      onChange={(e) =>
                        setAnswers({ ...answers, answer3: e.target.value })
                      }
                    />
                  </div>
                </>
              )}
              <div className="forget-submit">
                <button type="submit">Submit Answers</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;