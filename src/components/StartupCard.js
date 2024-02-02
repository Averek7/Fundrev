import React, { useState } from "react";
import axios from "axios";

const StartupCard = ({ startupInfo }) => {
  const [interested, setInterested] = useState(false);

  const handleInterested = async () => {
    try {
      const response = await axios.put(
        `https://backend-fundrev.onrender.com/api/interest/${startupInfo._id}`
      );

      if (response.status === 200) {
        setInterested(!startupInfo.interestedStartups);
      } else {
        console.error("Failed to express interest");
      }
    } catch (error) {
      console.error("Error during expressing interest:", error);
    }
  };

  console.log("startupInfo:", startupInfo);
  return (
    <div className="card">
      <h3>{startupInfo.companyName}</h3>
      <p>{startupInfo.businessDescription}</p>
      <p>{startupInfo.revenue}</p>
      <button onClick={handleInterested}>
        {startupInfo.interestedStartups ? "Interest Expressed" : "Interested"}
      </button>
    </div>
  );
};

export default StartupCard;
