"use client";

import React from "react";
import Navbar from "./components/Navbar";
import useUserInfo from "./hooks/useUserInfo";

const App: React.FC = () => {
  const { username, loading, error } = useUserInfo();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center mt-24">
        {username ? (
          <h1 className="text-4xl font-bold">Welcome, {username}!</h1>
        ) : (
          <h1 className="text-4xl font-bold">Welcome!</h1>
        )}
      </div>
    </div>
  );
};

export default App;
