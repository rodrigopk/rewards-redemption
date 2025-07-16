import { useEffect, useState } from "react";

import Toast from "../components/Toast";
import { useAuth } from "../context/AuthContext";
import { usePoints } from "../context/PointsContext";
import APIService from "../services/APIService";

const Rewards = () => {
  const { token } = useAuth();
  const { points, refreshPoints } = usePoints();
  const [rewards, setRewards] = useState([]);
  const [error, setError] = useState("");
  const [loadingRewardId, setLoadingRewardId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function fetchRewards() {
      try {
        const data = await APIService.getRewards(token);
        setRewards(data);
        setError("");
      } catch {
        setError("Failed to fetch rewards.");
      }
    }

    fetchRewards();
  }, [token]);

  const handleRedeem = async (rewardId) => {
    try {
      setLoadingRewardId(rewardId);
      await APIService.redeemReward(token, rewardId);
      await refreshPoints();
      setToast({ type: "success", message: "Reward redeemed successfully!" });

    } catch (error) {
      console.error(error.message);
      setToast({ type: "error", message: "Failed to redeem reward." });
    } finally {
      setLoadingRewardId(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6">
      <h2 className="text-2xl font-semibold mb-4">Available Rewards</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-3">
        {rewards.map((reward) => {
          const notEnoughPoints = points !== null && reward.cost > points;
          const buttonText = notEnoughPoints
            ? "Insufficient points"
            : "Redeem"

          return (
            <li
              key={reward.id}
              className="p-4 bg-white shadow rounded flex justify-between items-center"
            >
              <div>
                <div className="font-medium text-lg">{reward.title}</div>
                <div className="text-sm text-gray-600">{reward.cost} points</div>
              </div>
              <button
                onClick={() => handleRedeem(reward.id)}
                className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50 text-sm"
                disabled={loadingRewardId || notEnoughPoints}
              >
                {buttonText}
              </button>
            </li>
          );
        })}
      </ul>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Rewards;
