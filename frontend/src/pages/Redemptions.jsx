import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import APIService from "../services/APIService";

const Redemptions = () => {
  const { token } = useAuth();
  const [redemptions, setRedemptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRedemptions() {
      try {
        const data = await APIService.getRedemptions(token);
        setRedemptions(data);
      } catch {
        setError("Could not load redemptions.");
      }
    }

    fetchRedemptions();
  }, [token]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6">
      <h2 className="text-2xl font-semibold mb-4">Redemption History</h2>
      {error && <p className="text-red-600">{error}</p>}
      {redemptions.length === 0 ? (
        <p>No redemptions found.</p>
      ) : (
        <ul className="space-y-4">
          {redemptions.map((r) => (
            <li
              key={r.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <p className="font-medium">{r.reward.title}</p>
              <p className="text-sm text-gray-500">Cost: {r.reward.cost} pts</p>
              <p className="text-sm text-gray-400">
                Redeemed at: {formatDate(r.redeemed_at)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Redemptions;
