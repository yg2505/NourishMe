import React from "react";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome to NourishMe 🍎</h1>
      {token ? (
        <p>Your session is active.</p>
      ) : (
        <p>Please login to access your data.</p>
      )}
    </div>
  );
};

export default Dashboard;
