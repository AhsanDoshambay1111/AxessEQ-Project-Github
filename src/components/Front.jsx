import React, { useState, useEffect} from "react";
import TotalRepo from "./TotalRepo";
import Percentage from "./Percentage";
import axios from "axios";
import '../Styling/front.css'
import AllCollaborators from "./AllCollaborators";
function Front() {
  const [languagePercentages, setLanguagePercentages] = useState({});

  useEffect(() => {
    // Fetch language percentages from your API
    axios.get('http://www.cv.techdriveinnovation.com/calculateAllLanguagesPercentages')
      .then((response) => {
        setLanguagePercentages(response.data.languagePercentages);
      })
      .catch((error) => {
        console.error('Error fetching language percentages:', error);
      });
  }, []);
  return (
    <>
      <div>
        <TotalRepo />
      </div>
      <div className="total-percent">
      <div>
      <AllCollaborators /> 
      </div>
      <div>
      <Percentage languagePercentages={languagePercentages} /> 
      </div>
      </div>
    </>
  );
}

export default Front;
