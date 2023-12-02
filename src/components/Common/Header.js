import React from "react";
import "../../css/voting_navbar.css";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const userRole = localStorage.getItem("ballot_login_as");

  function logoutFunc() {
    localStorage.removeItem("ballot_login_as");
    localStorage.removeItem("ballot_admin_id");
    localStorage.removeItem("ballot_newElectionID");
    localStorage.removeItem("ballot_profile");
    navigate("/login");
  }

  return (
    <div>
      <nav>
        <div className="logo">Ballot</div>
        <input type="checkbox" id="click" />
        <label htmlFor="click" className="menu-btn">
          <i className="fas fa-bars" />
        </label>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/admin_login">Admin</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          {userRole !== "admin" && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {userRole === "user" || !userRole ? (
            <li>
              <Link to="/voting">Voting Area</Link>
            </li>
          ) : null}
          {userRole === "admin" ? (
            <li>
              <Link to="/admin/electionList">My Election</Link>
            </li>
          ) : null}
          <li>
            <Link to={"/login"} onClick={logoutFunc}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
