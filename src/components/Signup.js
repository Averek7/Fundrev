import React, { useState } from "react";
import "./signup.css";
import axios from "axios";

const Signup = ({ onSignup }) => {
  const [userType, setUserType] = useState("investor");
  const [investorData, setInvestorData] = useState({
    userId: "",
    password: "",
  });
  const [startupData, setStartupData] = useState({
    companyName: "",
    businessDescription: "",
    revenue: "",
  });

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleInvestorChange = (event) => {
    setInvestorData({
      ...investorData,
      [event.target.name]: event.target.value,
    });
  };

  const handleStartupChange = (event) => {
    setStartupData({
      ...startupData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://backend-fundrev.onrender.com/auth/signup",
        {
          userType,
          ...(userType === "investor" && investorData),
          ...(userType === "startup" && startupData),
        }
      );

      if (response.status === 201) {
        console.log("Signup successful");
        // Clear the form data
        setUserType("investor");
        setInvestorData({
          userId: "",
          password: "",
        });
        setStartupData({
          companyName: "",
          businessDescription: "",
          revenue: "",
        });
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>
          User Type:
          <select value={userType} onChange={handleUserTypeChange} required>
            <option value="investor">Investor</option>
            <option value="startup">Startup</option>
          </select>
        </label>
        <br />
        {userType === "investor" && (
          <>
            <label>
              User ID:
              <input
                type="text"
                name="userId"
                value={investorData.userId}
                onChange={handleInvestorChange}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={investorData.password}
                onChange={handleInvestorChange}
                required
              />
            </label>
            <br />
          </>
        )}
        {userType === "startup" && (
          <>
            <label>
              Company Name:
              <input
                type="text"
                name="companyName"
                value={startupData.companyName}
                onChange={handleStartupChange}
                required
              />
            </label>
            <br />
            <label>
              Business Description:
              <textarea
                name="businessDescription"
                value={startupData.businessDescription}
                onChange={handleStartupChange}
                required
              />
            </label>
            <br />
            <label>
              Revenue:
              <input
                type="text"
                name="revenue"
                value={startupData.revenue}
                onChange={handleStartupChange}
                required
              />
            </label>
            <br />
          </>
        )}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
