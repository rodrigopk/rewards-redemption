import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import APIService from "../services/APIService";

export default function Rewards() {
  const { token } = useAuth();
  const [rewards, setRewards] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRewards() {
      try {
        const data = await APIService.getRewards(token);
        setRewards(data);
      } catch (err) {
        setError("Failed to fetch rewards.");
      }
    }

    fetchRewards();
  }, [token]);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6">
      <h2 className="text-2xl font-semibold mb-4">Available Rewards</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-3">
        {rewards.map((reward) => (
          <li key={reward.id} className="p-4 bg-white shadow rounded">
            <div className="font-medium text-lg">{reward.title}</div>
            <div className="text-sm text-gray-600">{reward.cost} points</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
