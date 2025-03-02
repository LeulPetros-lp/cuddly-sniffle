import React from "react";
import SoilMoistureSection from "./SoilMoistureSection";
import TemperatureSection from "./TemperatureSection";
import HumiditySection from "./HumiditySection";
import LightSection from "./LightSection";
import { Button } from "@heroui/button";
import { useRouter } from 'next/router';

const DashboardLayout: React.FC = () => {
  const router = useRouter(); // Initialize the router

  const handleButtonClick = () => {
    router.push("/chatbot"); // Navigate to the chatbot page
  };

  return (
    <div className="min-h-screen font-poppins" style={{ backgroundColor: "#001E03" }}>
      {/* Dashboard Header */}
      <div className="text-center py-4 text-white">
        <h1 className="text-3xl font-bold" id="font">GreenBiome Dashboard</h1>
        <p className="text-lg">Real-time monitoring of environmental conditions for your plant</p>
      </div>

      {/* Buttons Below Header */}
      <div className="flex justify-center gap-4 my-6">
        <Button
          style={{ width: "50%", backgroundColor: "#47A840", color: 'white' }}
          onClick={handleButtonClick} // Use the router for navigation
        >
          Talk with your data with Biome Assistant
        </Button>
      </div>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 gap-4 px-4 pb-8">
        {/* Top Large Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800" id="font">Temperature</h2>
          <TemperatureSection />
        </div>

        {/* Middle Smaller Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 " id="font">Soil Moisture</h2>
            <SoilMoistureSection />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 " id="font">Humidity</h2>
            <HumiditySection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
