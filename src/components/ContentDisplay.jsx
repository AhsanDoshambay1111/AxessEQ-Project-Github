import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "react-bootstrap";

function RepositoryViewer() {
  const [repositoryData, setRepositoryData] = useState({});

  useEffect(() => {
    // Fetch repository data using the repositoryId from your frontend state or props
    axios
      .get(`http://www.cv.techdriveinnovation.com/api/get-code-files/64ef329d68f2e510937ef401`)
      .then((response) => {
        console.log(response.data)
        setRepositoryData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching repository data:", error);
      });
  }, []);

  const renderContent = (contents) => {
    return contents.map((content) => (
      <div key={content.name}>
        <p>{content.name}</p>
        {content.type === "file" && <pre>{content.content}</pre>}
        {content.type === "dir" && content.children && renderContent(content.children)}
      </div>
    ));
  };
  

  return (
    <>
      <Navbar />
      <div>
        <h1>{repositoryData?.name}</h1>
        <h2>{repositoryData?.owner}</h2>
        {repositoryData?.contents && renderContent(repositoryData.contents)}
      </div>
    </>
  );
}

export default RepositoryViewer;
