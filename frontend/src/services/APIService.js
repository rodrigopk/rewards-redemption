const BASE_URL = "http://localhost:3000/api/v1";

const APIService = {
  signIn: async ({ email, password }) => {
    const response = await fetch(`${BASE_URL}/auth/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.error || "Login failed");
    }

    return await response.json();
  },

  getRewards: async (token) => {
    const response = await fetch(`${BASE_URL}/rewards`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch rewards");
    }

    return await response.json();
  },
  getPoints: async (token) => {
    const response = await fetch(`${BASE_URL}/points`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch points");
    }

    return await response.json();
  },
  getRedemptions: async (token) => {
    const response = await fetch(`${BASE_URL}/redemptions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch redemptions");
    }
    return await response.json();
  },
  redeemReward: async (token, rewardId) => {
    const response = await fetch(`${BASE_URL}/redemptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reward_id: rewardId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to redeem reward");
    }

    return await response.json();
  }
};

export default APIService;
