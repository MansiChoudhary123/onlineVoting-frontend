import React, { useState, useEffect } from "react";
import "../css/result.css";
import { backendUrl } from "../backendUrl";
import ChartComponent from "./resultGraph";
import { useParams } from "react-router-dom";
import NoDataComponent from "./NoDataComponent";
export const Result = () => {
  const url = backendUrl();
  const { id } = useParams();
  const [candidateList, setCandidateList] = useState([]);
  useEffect(() => {
    async function getAllCandidateList() {
      try {
        const response = await fetch(
          `${url}/result/elections/${id}/candidates`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setCandidateList(responseData);
        } else {
          console.error("Error getting data:", response.status);
        }
      } catch (error) {
        console.error("Error getting data:", error);
      }
    }
    getAllCandidateList();
  }, []);
  if (candidateList.length == 0) {
    return <NoDataComponent />;
  }
  return (
    <div className="result_body">
      <div className="parent">
        {candidateList.map((item, key) => {
          return (
            <div className="child">
              <h3 className="h3" id="cd1">
                {item.voteCount}
              </h3>
              <h4>{item.name}</h4>
              <p>{item.subinformation}</p>
            </div>
          );
        })}
      </div>
      <ChartComponent data={candidateList} />
    </div>
  );
};
