/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
// pages/index.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "@/layouts/default";
import ChatBot from "@/components/ChatBot";  // Import the new ChatBot component

interface WeatherData {
  current_condition: Array<{
    temp_C: string;
    weatherDesc: Array<{ value: string }>;
    humidity: string;
    windspeedKmph: string;
  }>;
  nearest_area: Array<{
    areaName: Array<{ value: string }>;
    country: Array<{ value: string }>;
  }>;
}

export default function IndexPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);  // Store weather data

  // Fetch weather data on component mount
  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await axios.get<WeatherData>("https://wttr.in/Addis_Ababa?format=j1");
        setWeatherData(response.data);  // Update state with weather data
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    getWeatherData();  // Fetch the weather data
  }, []);  // Run once when component mounts

  // Show an error message if there is no weather data
  if (!weatherData) {
    return (
      <DefaultLayout>
        {/* <h1>Unable to fetch weather data.</h1> */}
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      {/* Display the chatbot with weather data */}
      <ChatBot weatherData={weatherData} />
    </DefaultLayout>
  );
}
