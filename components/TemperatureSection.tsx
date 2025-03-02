import React from "react";
import { Line } from "react-chartjs-2";

const TemperatureSection: React.FC = () => {
  const temperatureData = {
    labels: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM"],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [22, 24, 27, 25, 23],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>

      <Line data={temperatureData} options={{ responsive: true }} />
    </div>
  );
};

export default TemperatureSection;
