/* eslint-disable react/jsx-sort-props */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import { Link } from "@heroui/link";
import { useAuth } from "../config/context/AuthContext"; // Import the useAuth hook
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from "@heroui/button";
import { Head } from "./head";
import { Navbar } from "@/components/navbar";
import { auth } from "@/config/firebase";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth(); // Access user state from the context

  if (loading) {
    // You can show a loading spinner or message while checking authentication state
    return (
      <div className="flex justify-center items-center h-screen text-white font-poppins">
        Loading...
      </div>
    );
  }

  const provider = new GoogleAuthProvider();

  const signUp = async () => {
    await signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Fake data for charts
  const barData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Humidity (%)",
        data: [60, 65, 70, 75, 80],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

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
    ],
  };

  const pieData = {
    labels: ["Sunny", "Cloudy", "Rainy"],
    datasets: [
      {
        label: "Weather Distribution",
        data: [50, 30, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const doughnutData = {
    labels: ["Direct Light", "Filtered Light", "Low Light"],
    datasets: [
      {
        label: "Light Conditions",
        data: [40, 35, 25],
        backgroundColor: ["#4BC0C0", "#FF9F40", "#9966FF"],
      },
    ],
  };

  return (
    <div
      className="relative flex flex-col min-h-screen font-poppins"
      style={{ backgroundColor: "#001E03", color: "white" }}
    >
      <Head />
      <div style={{ marginTop: 20 }}>
        <Navbar />
      </div>
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {user ? (
          // Content for authenticated users
          <div>
            {children}
          </div>
        ) : (
          // Content for unauthenticated users
          <div>
            <section className="flex items-center justify-center px-4">
              <div className="max-w-xl h-100 w-full bg-white rounded-lg shadow-xl p-8 text-center">
                {/* Title Section */}
                <h2 className="text-4xl font-semibold text-gray-800 mb-4">
                  Revolutionize Sustainability
                </h2>
                <p className="text-xl text-gray-600 mb-6 max-w">
                  Join us in creating a greener world. Be part of a community
                  dedicated to groundbreaking sustainable practices that make an
                  impact.
                </p>

                {/* Sign Up Button */}
                <Button
                  variant="solid"
                  color="primary"
                  size="lg"
                  className="w-full text-white"
                  style={{ backgroundColor: "#47A840" }} // Custom color
                  onPress={signUp}
                >
                  Sign Up / Log In with Google
                </Button>
              </div>
            </section>

            {/* Charts Section */}
            <div className="mt-10" >
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#001E03] p-6 rounded-lg"
                style={{ backgroundColor: "#001E03" }}
              >
                {/* Bar Chart */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-black text-lg font-bold mb-4" id="font">
                    Humidity Levels
                  </h3>
                  <Bar data={barData} options={{ responsive: true }} />
                </div>
                {/* Line Chart */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-black text-lg font-bold mb-4" id="font">
                    Temperature Over Time
                  </h3>
                  <Line data={lineData} options={{ responsive: true }} />
                </div>
                {/* Pie Chart */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-black text-lg font-bold mb-4" id="font">
                    Weather Conditions
                  </h3>
                  <Pie data={pieData} options={{ responsive: true }} />
                </div>
                {/* Doughnut Chart */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-black text-lg font-bold mb-4" id="font">
                    Light Conditions
                  </h3>
                  <Doughnut data={doughnutData} options={{ responsive: true }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
     
          <span className="text-default-600 text-white">Powered by </span>
          <p className="text-default-600 text-white">- bobthebuilder</p>
    
      </footer>
    </div>
  );
}
