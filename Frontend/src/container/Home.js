// src/components/LandingPage.js
import React from "react";
import "../styles/home.css";
import { ReactComponent as ExampleSVG } from "../assest/home3.svg";
import { Link } from "react-router-dom"; // Import your SVG here
// import logo from "./logo.png"; // Import your logo image here

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">TodoApp</div>
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign in</Link>
        </nav>
      </header>
      <main className="main-content">
        <section className="content-section">
          <div className="content">
            <h1 className="headline">Organize Your Life with TodoApp</h1>
            {/* <img src={logo} alt="TodoApp Logo" className="content-logo" /> */}
            <p className="intro-text">
              Welcome to TodoApp, your ultimate solution for task management.
              Stay productive and never miss a deadline again!
            </p>
            <p className="intro-text">
              Our app helps you track your tasks efficiently and effectively, so
              you can focus on what matters most.
            </p>
          </div>
        </section>
        <section className="image-section">
          <ExampleSVG />
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
