/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from "react";
import { Line } from "react-chartjs-2"; // Import the Line chart component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js"; // Import necessary components from chart.js
import { Button } from "@heroui/button";
import { useAuth } from "../config/context/AuthContext";
import Link from "next/link";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

// Define the props for the LineGraphSection component
interface LineGraphSectionProps {}

// Define the dataset structure
interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

const LineGraphSection: React.FC<LineGraphSectionProps> = () => {
  // Fake data for the line graph
  const lineData = {
    labels: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM"],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [22, 24, 27, 25, 23],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
      {
        label: "Humidity",
        data: [26, 30, 32, 25, 20],
        backgroundColor: "rgba(56, 67, 233, 0.5)",
        borderColor: "rgba(15, 30, 235, 0.5)",
        borderWidth: 2,
      },
      {
        label: "Light",
        data: [20, 20, 34, 30, 30],
        backgroundColor: "rgba(255, 166, 0, 0.5)",
        borderColor: "rgba(255, 166, 0, 0.5)",
        borderWidth: 2,
      },
    ] as Dataset[], // Type assertion for dataset array
  };

  const { user }: { user: { email: string } | null } = useAuth();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-black text-lg font-bold mb-4" id="font">
        {user?.email || "Guest"}, BIOME_set_ID: 2jf3232d2w
      </h3>
      <Line data={lineData} options={{ responsive: true }} />
      <br />
      <Link href="/chatbot">
        <Button fullWidth style={{ color: "white", backgroundColor: "#47A840" }}>
          Talk to GreenBiome Assistant
        </Button>
      </Link>
    </div>
  );
};

export default LineGraphSection;
