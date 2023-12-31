import React, { useState } from "react";
import "../css/signin.css";
import { Link } from "react-router-dom";
import { backendUrl } from "../backendUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const url = backendUrl();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    if (email.length < 8) {
      setErrorMessage("Please enter valid email.");
      return;
    }
    if (password.length < 5) {
      setErrorMessage("Please enter valid password.");
      return;
    }
    setErrorMessage("");
    const payload = {
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const response = await fetch(`${url}/login/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        toast.success("Login successful");
        localStorage.setItem("ballot_profile", email);
        localStorage.setItem("ballot_login_as", "user");
        localStorage.setItem("ballotToken", responseData.token);
        navigate("/");
      } else {
        // Login failed, handle the error
        toast.error("Enter valid email and password");
      }
    } catch (error) {
      toast.error("Enter valid email and password:");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="title">Login</div>
        <br />
        <div className="content">
          {/* <!-------------------- form  start here--------------------------------------> */}

          <form className="form" onSubmit={handleLogin}>
            <div className="user-details">
              {/* <h2 style={{color:"red"}}>error1</h2> */}
              <div className="input-box">
                <span className="details">Username</span>
                <input
                  type="email"
                  placeholder="Enter your Username(Email)"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <br />
              <br />
              <br />
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="pass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div style={{ color: "red" }}>{errorMessage}</div>
            <div className="button">
              <input
                type="submit"
                name="signin"
                value={loading ? "Loging ...." : "Login"}
              />
            </div>
          </form>
          {/* <!---------------------------- form ends here--------------------------------------------> */}

          <div className="signup1">
            <i style={{ color: "white" }}> Visting for the first time?</i>
            <Link to="/signup">
              <a href="/">
                <button className="btn">Sign up</button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
