import React, { useState, useEffect } from "react";
import "../css/voting.css";
import profile from "../images/profile.png";
import { backendUrl } from "../backendUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Voting = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(0);
  const [candidateList, setCandidateList] = useState([]);
  const navigate = useNavigate();
  const url = backendUrl();
  const updateSelectedCandidate = (id) => {
    setSelectedCandidate(id);
  };
  const handleVote = async () => {
    const email = localStorage.getItem("profile");
    if (email) {
      try {
        // Make the API call to send the login data to the server
        const response = await fetch(
          `${url}/add/vote/${selectedCandidate}/${email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          toast.success("Your votes has been saved successfully");
        } else {
          toast.warn("Your are not Eligible for voting");
        }
      } catch (error) {
        console.error("Some Error Occured:", error);
      }
    } else {
      navigate("/login");
    }
  };
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
          console.error("Login failed:", response.status);
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    }
    getAllCandidateList();
  }, []);
  return (
    <div className="voting_body">
      {candidateList.map((item, key) => {
        return (
          <div key={key} className="custom-card">
            <div className="custom-card-body">
              <div className="profile">
                <img src={profile} alt="profile " />
              </div>
              <div className="detail">
                <p id="big">{item.candidate_name}</p>
                <p id="small">{item.candidate_party}</p>
              </div>
              <div
                className={
                  item.id == selectedCandidate
                    ? "voting-button-active"
                    : "voting-button"
                }
              >
                <button onClick={() => updateSelectedCandidate(item.id)}>
                  Vote
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <center>
        <button type="submit" id="subbtn" onClick={handleVote}>
          Confirm
        </button>
      </center>
    </div>
  );
};
