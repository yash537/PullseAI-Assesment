// src/components/Signup.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import { ReactComponent as SignupSVG } from "../assest/signup.svg";
import { signin } from "../redux/actions";

const Signin = () => {
  const [emailid, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signin({ emailid, password })).then(() => {
        navigate("/dashboard"); // Redirect to sign-in page on success
      });
    } catch (err) {
      setError("Signin failed. Please try again."); // Handle error appropriately
    }
  };

  return (
    <div className="signup-page">
      <main className="signup-content">
        <section className="signup-section">
          <div className="signup-form-container">
            <form className="signup-form" onSubmit={handleSignup}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={emailid}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="signup-button">
                Sign In
              </button>
            </form>
          </div>
        </section>
        <section className="signup-image-section">
          <SignupSVG />
        </section>
      </main>
    </div>
  );
};

export default Signin;
