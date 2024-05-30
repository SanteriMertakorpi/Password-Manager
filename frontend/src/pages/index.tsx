import Layout from "@/components/Layout";
import React from "react";

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-8">Welcome to Password Manager</h1>
        <p className="text-lg">Please Login.</p>
      </div>
    </Layout>
  );
};

export default Home;
