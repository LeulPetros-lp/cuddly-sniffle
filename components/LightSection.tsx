import React from "react";
import { Line } from "react-chartjs-2";

const LightSection: React.FC = () => {
  const lightData = {
    labels: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM"],
    datasets: [
      {
        label: "Light Intensity (Lux)",
        data: [300, 350, 400, 450, 420],
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Light Intensity</h2>
      <Line data={lightData} options={{ responsive: true }} />
    </div>
  );
};

export default LightSection;
