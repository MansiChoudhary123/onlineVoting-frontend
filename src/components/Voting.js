import React, { useState, useEffect } from "react";
import "../css/voting.css";
import axios from "axios";
import profile from "../images/profile.png";
import { useParams } from "react-router-dom";
import NoDataComponent from "./NoDataComponent";
import { backendUrl } from "./../backendUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const Voting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [voterId, setVoterId] = useState(0);
  const updateVoterId = (id) => {
    setVoterId(id);
  };
  useEffect(() => {
    if (localStorage.getItem("ballot_login_as") != "user") {
      navigate("/login");
    }
  }, []);
  const url = backendUrl();
  const [candidateList, setCandidates] = useState([]);
  async function getCandidatesaList() {
    try {
      const response = await axios.get(`${url}/elections/${id}/candidates/`);
      setCandidates(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }
  async function addVote() {
    try {
      const response = await axios.post(`${url}/votes/add`, {
        voter_email_id: localStorage.getItem("ballot_profile"),
        candidate: voterId,
        election: id,
      });

      toast.success("Vote added successfully!");
    } catch (error) {
      if (error.response) {
        toast.error(` ${error.response.data.error || error.response.status}`);
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        toast.error("Error: " + error.message);
      }
    }
  }
  useEffect(() => {
    if (id) {
      getCandidatesaList();
    }
  }, [id]);
  if (candidateList.length == 0)
    return (
      <>
        <NoDataComponent />
      </>
    );
  return (
    <div className="voting_body">
      {candidateList.map((item) => (
        <div className="custom-card">
          <div className="custom-card-body">
            <div className="profile">
              <img
                src={profile}
                alt="profile"
                style={{ borderRadius: "50%", height: "120px", width: "120px" }}
              />
            </div>
            <div className="detail">
              <p id="big">{item.name}</p>
              <p id="small">{item.subinformation}</p>
            </div>
            <div
              className={
                voterId == item._id
                  ? "voting-button voting-button-active"
                  : "voting-button"
              }
            >
              <button onClick={() => updateVoterId(item._id)}>Vote</button>
            </div>
          </div>
        </div>
      ))}

      <center>
        <button type="submit" id="subbtn" onClick={addVote}>
          Confirm
        </button>
      </center>
    </div>
  );
};
