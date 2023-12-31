import React, { useEffect, useState } from "react";
import "../css/profile.css";
import bar from "../images/bar.png";
import bharat from "../images/bharat.png";
import { backendUrl } from "../backendUrl";
import { useNavigate } from "react-router-dom";
export const Profile = () => {
  const url = backendUrl();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    async function getProfileData() {
      const email = localStorage.getItem("ballot_profile");
      if (email) {
        try {
          const response = await fetch(`${url}/profile/user/${email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const responseData = await response.json();
            setProfileData(responseData);
          } else {
            console.error("Login failed:", response.status);
          }
        } catch (error) {
          console.error("Error logging in:", error);
        }
      } else {
        navigate("/login");
      }
    }
    getProfileData();
  }, []);
  return (
    <div className="profile_body">
      <div className="ring1" />
      {/*------------------card for profile start here------------------------------------*/}
      <div className="profile-card">
        <center>
          <img src={bharat} alt="" className="img1" />
        </center>
        <p>Election commission of India</p>
        <br />
        <p>ELECTORS PHOTO IDENTITY CARD</p>
        {/*------------------user profile photo ------------------------------------*/}
        <center>
          <img
            src="https://cdn.xxl.thumbs.canstockphoto.fr/silhouette-hommes-costume-noir-clipart-vecteur_csp6923810.jpg"
            alt=""
            id="img2"
            style={{ marginTop: "5%" }}
          />
        </center>
        <br />
        <center>
          <img src={bar} alt="" id="img3" />
        </center>
        <form>
          <center>
            <div className="form"> Voter id : {profileData._id} </div>
          </center>
        </form>
        <div className="pf_detail">
          <div className="form">
            <br />
            Name:{profileData.full_name} <br />
            <br />
            Email :{profileData.email} <br />
            <br />
            Age : {profileData.age}
            <br />
            <br />
            Phone No : {profileData.phone_number}
            <br />
            <br />
          </div>
        </div>
      </div>
      <div className="ring2" />
    </div>
  );
};
