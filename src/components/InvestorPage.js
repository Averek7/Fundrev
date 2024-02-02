import React, { useState, useEffect } from "react";
import axios from "axios";
import StartupCard from "./StartupCard";

const InvestorPage = ({ investorInfo }) => {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await axios.get(
          "https://backend-fundrev.onrender.com/api/startups"
        );
        console.log("Startups:", response.data);
        setStartups(response.data);
      } catch (error) {
        console.error("Error fetching startups:", error);
      }
    };

    fetchStartups();
  }, []);

  console.log("investorInfo:", startups);
  return (
    <>
      <h2>Welcome, {investorInfo.user.userId}!</h2>
      <h3>Explore Startups</h3>
      {startups.map((startup) => (
        <StartupCard key={startup.id} startupInfo={startup} />
      ))}
    </>
  );
};

export default InvestorPage;
