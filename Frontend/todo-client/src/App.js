import React from "react";
import LandingPage from "./container/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./container/Signup";
import Signin from "./container/Signin";
import Dashboard from "./container/Dashboard";

const App = () => {
  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
