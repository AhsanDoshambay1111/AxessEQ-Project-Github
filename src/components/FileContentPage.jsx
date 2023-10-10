// export default FileContentPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../Styling/FileContentPage.css";
import Navbar from "../components/Navbar";
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling

function FileContentPage() {

  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });


  const { repoId, fileName } = useParams();
  const [fileContent, setFileContent] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    fetchFileContent(repoId, fileName);
  }, [repoId, fileName]);

  const fetchFileContent = async (repoId, fileName) => {
    try {
      const response = await axios.get(
        `http://www.cv.techdriveinnovation.com/api/get-file-content/${repoId}/${fileName}`
      );
      setFileContent(response.data.content);
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };  
  const handleCopy = () => {
    navigator.clipboard.writeText(fileContent).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false); // Reset copied state to false after 5 seconds
      }, 5000);
    });
  };

  return (
    <>
    <Navbar />
        <div className="file-content-container">
        <div className="file-copy">
          <p className="filecontent-para" data-aos="fade-up">   <FontAwesomeIcon icon={faFile} className="file-content-file"/>{fileName}</p>
          <div className="copy-button-container">
        <button onClick={handleCopy} data-aos="fade-down">
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
      </div>
          <div className="code-container" data-aos="zoom-in">
            <SyntaxHighlighter language="javascript" style={atomDark}>
              {fileContent}
            </SyntaxHighlighter>
          </div>
        </div>
    </>
  );
}

export default FileContentPage;