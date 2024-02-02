import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import InvestorPage from "./components/InvestorPage";
import StartupPage from "./components/StartupPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );
  const [authMode, setAuthMode] = useState("login");

  const handleLogin = (loginData) => {
    setLoggedInUser(loginData);
    localStorage.setItem("loggedInUser", JSON.stringify(loginData));
  };

  const handleSignup = (signupData) => {
    console.log("Signup:", signupData);
    setLoggedInUser(signupData);
    localStorage.setItem("loggedInUser", JSON.stringify(signupData));
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

  const toggleAuthMode = () => {
    setAuthMode((prevMode) => (prevMode === "login" ? "signup" : "login"));
  };

  return (
    <div className="App">
      <h1>Investor & Startup Sign Up</h1>
      {loggedInUser ? (
        <div>
          {loggedInUser.user.userType === "investor" ? (
            <InvestorPage investorInfo={loggedInUser} />
          ) : (
            <StartupPage startupInfo={loggedInUser} />
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          {authMode === "login" ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Signup onSignup={handleSignup} />
          )}
          <button onClick={toggleAuthMode}>
            Switch to {authMode === "login" ? "Signup" : "Login"}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
