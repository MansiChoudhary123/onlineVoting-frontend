import React, { useState, useEffect } from "react";
import "../css/result.css";
import { backendUrl } from "../backendUrl";
import ChartComponent from "./resultGraph";
import { useParams } from "react-router-dom";
import NoDataComponent from "./NoDataComponent";
import { toast } from "react-toastify";
import { Ellipsis } from "react-css-spinners";

export const Result = () => {
  const url = backendUrl();
  const { id } = useParams();
  const [candidateList, setCandidateList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAllCandidateList() {
      setLoading(true);
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
          toast.error("Error fetching data. Status: " + response.status);
        }
      } catch (error) {
        toast.error("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    }
    getAllCandidateList();
  }, [id, url]);

  if (loading) {
    return (
      <div
        className="result_body"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Ellipsis size={80} color="#007bff" />
      </div>
    );
  }

  if (candidateList.length === 0) {
    return <NoDataComponent />;
  }

  return (
    <div className="result_body">
      <div className="parent">
        {candidateList.map((item, key) => (
          <div className="child" key={key}>
            <h3 className="h3">{item.voteCount}</h3>
            <h4>{item.name}</h4>
            <p>{item.subinformation}</p>
          </div>
        ))}
      </div>
      <ChartComponent data={candidateList} />
    </div>
  );
};
