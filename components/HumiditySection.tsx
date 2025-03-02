import React from "react";
import { Line } from "react-chartjs-2";

const HumiditySection: React.FC = () => {
  const humidityData = {
    labels: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM"],
    datasets: [
      {
        label: "Humidity (%)",
        data: [40, 50, 45, 55, 48],
        backgroundColor: "rgba(56, 67, 233, 0.5)",
        borderColor: "rgba(56, 67, 233, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>

      <Line data={humidityData} options={{ responsive: true }} />
    </div>
  );
};

export default HumiditySection;
