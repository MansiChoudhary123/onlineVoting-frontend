import React, { useState, useEffect } from "react";
import "../css/result.css";
import { backendUrl } from "../backendUrl";
import ChartComponent from "./resultGraph";
export const Result = () => {
  const url = backendUrl();
  const [candidateList, setCandidateList] = useState([]);
  useEffect(() => {
    async function getAllCandidateList() {
      try {
        // Make the API call to send the login data to the server
        const response = await fetch(`${url}/get/candidates/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          // Login successful, perform any necessary actions (e.g., redirect)
          const responseData = await response.json();
          setCandidateList(responseData);
        } else {
          // Login failed, handle the error
          console.error("Error getting data:", response.status);
        }
      } catch (error) {
        console.error("Error getting data:", error);
      }
    }
    getAllCandidateList();
  }, []);
  return (
    <div className="result_body">
      <div className="parent">
        {candidateList.map((item, key) => {
          return (
            <div className="child">
              <h3 className="h3" id="cd1">
                {item.votes}
              </h3>
              <h4>{item.candidate_name}</h4>
              <p>{item.candidate_party}</p>
            </div>
          );
        })}
      </div>
      <ChartComponent data={candidateList} />
    </div>
  );
};
