import React, { useEffect, useState } from "react";
import axios from "../services/axios";

const Dashboard = () => {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const { data } = await axios.get("/roadmaps", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setRoadmaps(data.roadmaps);
      } catch (err) {
        console.error("Error fetching roadmaps:", err);
      }
    };
    fetchRoadmaps();
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="mb-6 text-2xl font-semibold">My Roadmaps</h1>
      <ul className="space-y-4">
        {roadmaps.map((roadmap) => (
          <li key={roadmap._id} className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-bold">{roadmap.title}</h2>
            <p>{roadmap.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
