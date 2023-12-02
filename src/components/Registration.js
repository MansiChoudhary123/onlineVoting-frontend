import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/signin.css";
import { backendUrl } from "../backendUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const Registration = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const url = backendUrl();
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (fullName.length < 5) {
      setErrorMessage("Full name must be at least 5 characters.");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email address.");
      setIsLoading(false);
      return;
    }

    if (isNaN(age) || parseInt(age) <= 15) {
      setErrorMessage("Age must be a number greater than 15.");
      setIsLoading(false);
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      setErrorMessage("Phone number must be a 10-digit number.");
      setIsLoading(false);
      return;
    }
    if (password.length < 5) {
      setErrorMessage("Passwords must contain atleast 5 character.");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const payload = {
      full_name: fullName,
      email: email,
      age: age,
      phone_number: phone,
      password: password,
    };

    try {
      const response = await fetch(`${url}/register/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Registration successful");
        navigate("/");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="title">Registration</div>
        <div className="content">
          <form
            className="form"
            onSubmit={handleRegistration}
            encType="multipart/form-data"
          >
            {/* User Details */}
            <div className="user-details">
              {/* Full Name */}
              <div className="input-box">
                <span className="details">Full Name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Age */}
              <div className="input-box">
                <span className="details">Age</span>
                <input
                  type="text"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  placeholder="Enter your number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="input-box">
                <span className="details">Confirm Password</span>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            <span className="error">{errorMessage}</span>

            {/* Submit Button */}
            <div className="button">
              <input
                type="submit"
                value={isLoading ? "Registering..." : "Register"}
              />
            </div>
          </form>
        </div>

        {/* Link to Sign In */}
        <div className="signup1">
          <i style={{ color: "white" }}>Registered Already</i>
          <Link to="/login">
            <button className="btn">Sign in</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
