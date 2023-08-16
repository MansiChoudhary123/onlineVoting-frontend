import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/signin.css";
import { backendUrl } from "../backendUrl";
import { toast } from "react-toastify";
export const Registration = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const url = backendUrl();
  const handleRegistration = async (e) => {
    e.preventDefault();

    // Perform validation
    if (
      !fullName ||
      !email ||
      !age ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Create the payload
    const payload = {
      name: fullName,
      email: email,
      age: age,
      phone: phone,
      password: password,
    };

    try {
      // Make the API call to send the data to the server
      const response = await fetch(
        `${url}/register/user`, // Removed double slash after 'ballot'
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Added content type header
          },
          body: JSON.stringify(payload), // Stringify payload
        }
      );

      if (response.ok) {
        // Registration successful, perform any necessary actions (e.g., redirect)
        toast.success("Registration successful");
      } else {
        // Registration failed, handle the error
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="body">
      <div className="container">
        <div className="title">Registration</div>
        <div className="content">
          {/*------------------registration form start here------------------------------------*/}
          <form
            className="form"
            onSubmit={handleRegistration}
            encType="multipart/form-data"
          >
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  id="name"
                  name="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <br />
                <span id="error1" className="error" />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Age</span>
                <input
                  type="text"
                  placeholder="Enter your age"
                  name="age"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
                <br />
                <span id="errorAge" className="error" />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  placeholder="Enter your number"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <br />
                <span id="error2" className="error" />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  id="pass"
                  name="pass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <br />
                <span id="error3" className="error" />
              </div>
              <div className="input-box">
                <span className="details">Confirm Password</span>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  id="cpass"
                  name="c_pass"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <br />
                <span id="error4" className="error" />
              </div>
            </div>
            <span id="error5" className="error">
              {errorMessage}
            </span>
            <div className="button">
              <input type="submit" value="Register" id="mysubmit" />
            </div>
          </form>
          {/*------------------ registration form ends here------------------------------------*/}
        </div>
        <div className="signup1">
          <i style={{ color: "white" }}> Registered Already </i>
          {/*------------------link to login page  ------------------------------------*/}
          <Link to="/login">
            <button className="btn">Sign in</button>
          </Link>
        </div>
      </div>
    </div>
  );
};