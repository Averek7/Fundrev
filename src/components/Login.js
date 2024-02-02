import React, { useState } from "react";
import "./login.css";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [loginType, setLoginType] = useState("investor");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleLoginTypeChange = (event) => {
    setLoginType(event.target.value);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (loginType === "startup") {
      try {
        const response = await axios.post(`http://localhost:5000/auth/login/startup`, {
          companyName,
          loginType,
        });
        onLogin(response.data);
      } catch (error) {
        console.error("Login error:", error);
      }
    } else {
      try {
        const response = await axios.post(`http://localhost:5000/auth/login/investor`, {
          userId,
          password,
          loginType,
        });

        onLogin(response.data);
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Login Type:
          <select value={loginType} onChange={handleLoginTypeChange} required>
            <option value="investor">Investor</option>
            <option value="startup">Startup</option>
          </select>
        </label>
        <br />
        {loginType === "investor" && (
          <>
            <label>
              User ID:
              <input
                type="text"
                value={userId}
                onChange={handleUserIdChange}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </label>
            <br />
          </>
        )}
        {loginType === "startup" && (
          <>
            <label>
              Company Name:
              <input
                type="text"
                value={companyName}
                onChange={handleCompanyNameChange}
                required
              />
            </label>
            <br />
          </>
        )}
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
