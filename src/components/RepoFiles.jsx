import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../Styling/RepoFiles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling
import Swal from 'sweetalert2';


function RenderItem({ item }) {

  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });


  let { repoId } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [childContents, setChildContents] = useState([]);
  console.log(repoId);
  const toggleFolder = async () => {
    setIsExpanded(!isExpanded);

    if (!childContents.length && isExpanded === false) {
      fetchChildrenData(item.children);
    }
  };
  const fetchChildrenData = async (childIds) => {
    const childrenData = [];
    for (const childId of childIds) {
      console.log("here is child", childIds);
      try {
        const childResponse = await axios.get(
          `http://www.cv.techdriveinnovation.com/api/get-content/${childId}`
        );
        childrenData.push(childResponse.data);
      } catch (error) {
        console.error("Error fetching child content:", error);
      }
    }
    setChildContents(childrenData);
    // console.log(childrenData)
  };
  return (
    <div className="hala" data-aos="fade-down">
    <li className="code-file-item" data-aos="zoom-in">
      {item.type === "dir" ? (
        <div className="folder">
          <span className="folder-name" onClick={toggleFolder}>
            {isExpanded ? "📁▼" : "📁"} {item.name}
          </span>
          {isExpanded && (
            <ul className="child-list">
              {childContents.map((child) => (
                <RenderItem key={child._id} item={child} />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <li className="code-file-item" key={item._id}>
          <a className="code-file-link" href={`/repos/${repoId}/${item.path}`}>
          <FontAwesomeIcon icon={faFile} className="file-img" />{item.name}
          </a>
        </li>
      )}
    </li>
    </div>
  );
}

function RepoFiles() {
  let { repoId } = useParams();
  // console.log(repoId)
  const [codeFiles, setCodeFiles] = useState([]);
  const [githubRepoName, setGithubRepoName] = useState("");
  const [repositoryId, setRepositoryId] = useState("");
  const [languageData, setLanguageData] = useState(null); // State to store language data

  // setRepositoryId = repoId
  useEffect(() => {
    if (repoId) {
      fetchCodeFiles(repoId);
      fetchLanguageData(repoId); // Fetch language data when the component loads
    }
  }, [repoId]);

  const fetchCodeFiles = async (repoId) => {
    try {
      const response = await axios.get(
        `http://www.cv.techdriveinnovation.com/api/get-code-files/${repoId}`
      );
      setCodeFiles(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching code files:", error);
    }
  };

  const fetchLanguageData = async (repoId) => {
    try {
      const response = await axios.get(
        `http://www.cv.techdriveinnovation.com/calculateLanguagePercentages/${repoId}`
      );
      setLanguageData(response.data.languagePercentages);
      console.log(response.data.languagePercentages);
    } catch (error) {
      console.error("Error fetching language data:", error);
      // console.log(repoId)
    }
  };
  console.log(languageData);
  const handleImportButtonClick = async () => {
    try {
      const response = await axios.post(
        "http://www.cv.techdriveinnovation.com/fetch-repo-contents",
        {
          repositoryNames: githubRepoName,
          repositoryId: repoId,
        }
      );
      console.log(repoId);
      console.log(response.data);
      // You can add further handling here if needed
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDeleteContent = async () => {
    try {
      const response = await axios.delete(
        `http://www.cv.techdriveinnovation.com/repositories/${repoId}/content`
      );
  
      if (response.status === 204) {
        // Content successfully deleted
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Content deleted successfully.',
        });
        setCodeFiles([]);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete content.',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting content.',
      });
    }
  };

  return (
<><Navbar />
    <div className="repo-files-container">
      <div className="header" >
        <h3 data-aos="zoom-in">Code Files for : {repoId ? repoId.name : "Loading..."}</h3>
        <div>
          <input data-aos="fade-up"
            className="github-url-input"
            type="text"
            placeholder="Enter Your repository Name"
            value={githubRepoName}
            onChange={(e) => setGithubRepoName(e.target.value)}
          />
          <div className="buttons-repofile">
          <button className="import-button" onClick={handleImportButtonClick} data-aos="zoom-in">
            Import
          </button>
          <button data-aos="zoom-in"
            className="delete-content-button"
            onClick={handleDeleteContent}
          >
            Delete Content
            <span class="trash">
      <FontAwesomeIcon icon={faTrashAlt} />
    </span>
          </button>
          </div>
        </div>
        <div>
          <ul className="code-files-list">
            {codeFiles.map((item) => (
              <RenderItem key={item._id} item={item} />
            ))}
          </ul>
          </div>
      </div>
      {codeFiles.length === 0 ? (
        <p className="nocode-para">No code files available for this repository.</p>
      ) : (


        <div className="code-file2" data-aos="zoom-in">
          <p className="languages-p" data-aos="fade-up">Languages :</p>
          <ul className="language-names" data-aos="zoom-in">
            {languageData &&
              Object.entries(languageData).map(([language, percentage]) => (
                <li key={language}>
                  {language}: {percentage}%
                </li>
              ))}
          </ul>

          <div className="repofile-side" data-aos="fade-up">
        <Link to={`/commits/${repoId}`}>Commits</Link>
        </div>
          <div className="repofile-side" data-aos="fade-down">
        <Link to={`/contributors/${repoId}`}>Contributor</Link>
        </div>
          <div className="repofile-side" data-aos="fade-up">
        <Link to={`/collaborators/${repoId}`}>Collaborators</Link>
        </div>
          <div className="repofile-side" data-aos="fade-down">
        <Link to={`/code-frequency/${repoId}`}>Code Frequncy</Link>
        </div>
        </div>
      )}
    </div>
    </>
  );
}
export default RepoFiles;
