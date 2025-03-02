import React from "react";
import { Line } from "react-chartjs-2";

const SoilMoistureSection: React.FC = () => {
  const soilMoistureData = {
    labels: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM"],
    datasets: [
      {
        label: "Soil Moisture (%)",
        data: [70, 72, 68, 75, 73],
        backgroundColor: "rgba(34, 139, 34, 0.5)",
        borderColor: "rgba(34, 139, 34, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>

      <Line data={soilMoistureData} options={{ responsive: true }} />
    </div>
  );
};

export default SoilMoistureSection;
