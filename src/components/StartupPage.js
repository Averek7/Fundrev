import React, { useState } from "react";
import axios from "axios";

function StartupPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setChartData(response.data.chartData);
      } else {
        console.error("Failed to upload sales data");
      }
    } catch (error) {
      console.error("Error during sales data upload:", error);
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div>
      <h2>Startup Page</h2>
      <label>
        Upload Sales Data CSV:
        <input type="file" onChange={handleFileChange} />
      </label>
      <>
        <h3>Monthly Sales Chart</h3>

        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={handleEndDateChange} />
        </label>
      </>
      <button onClick={handleUpload}>Update Sales</button>

      {/* {chartData && ( */}
      {/* )} */}
    </div>
  );
}

export default StartupPage;
