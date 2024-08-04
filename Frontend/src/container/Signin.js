// src/components/Signin.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import { ReactComponent as SignupSVG } from "../assest/signin.svg";
import { signin } from "../redux/actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [emailid, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.authError);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signin({ emailid, password }));
      toast.success("Signin successfully!");
      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (err) {
      toast.error("Signin failed. Please try again."); // Show error toast
    }
  };

  return (
    <div className="signup-page">
      <ToastContainer />
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
