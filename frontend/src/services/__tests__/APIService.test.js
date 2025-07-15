import APIService from '../APIService';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('APIService', () => {
  describe('signIn', () => {
    it('successfully signs in and returns token and user', async () => {
      const mockResponse = {
        token: 'fake-jwt-token',
        user: { email: 'test@example.com' }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await APIService.signIn({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/auth/sign_in',
        expect.objectContaining({
          method: 'POST'
        })
      );
    });

    it('throws an error on failed sign-in', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Invalid email or password' })
      });

      await expect(
        APIService.signIn({ email: 'test@example.com', password: 'wrong' })
      ).rejects.toThrow('Invalid email or password');
    });
  });

  describe("getRewards", () => {
    it("should return rewards list on success", async () => {
      const mockRewards = [
        { id: 1, title: "Coffee", cost: 50 },
        { id: 2, title: "Gift Card", cost: 100 }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRewards
      });

      const result = await APIService.getRewards("fake-token");

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/v1/rewards",
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer fake-token"
          })
        })
      );
      expect(result).toEqual(mockRewards);
    });

    it("should throw an error if response is not ok", async () => {
      fetch.mockResolvedValueOnce({ ok: false });

      await expect(APIService.getRewards("fake-token")).rejects.toThrow(
        "Failed to fetch rewards"
      );
    });
  });

  describe("getPoints", () => {
    it("returns user points when successful", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user_id: 1, points: 120 })
      });

      const result = await APIService.getPoints("test-token");

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/v1/points",
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer test-token"
          })
        })
      );
      expect(result.points).toEqual(120);
    });
  });

  describe("getRedemptions", () => {
    const mockRedemptions = [
      { id: 1, rewardedAt: "2025-07-15T17:50:44", reward: { id: 1, title: "Coffee", cost: 50 } },
      { id: 2, rewardedAt: "2025-07-15T17:50:44", reward: { id: 2, title: "Gift Card", cost: 100 } }
    ];

    it("returns user redemptions when successful", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRedemptions
      });

      const result = await APIService.getRedemptions("test-token");

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/v1/redemptions",
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer test-token"
          })
        })
      );
      expect(result).toEqual(mockRedemptions);
    });
  });

  describe("redeemReward", () => {
    it("should redeem reward successfully", async () => {
      const mockResponse = {
        redemption: { id: 1 },
        remaining_points: 100,
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await APIService.redeemReward("fake-token", 1);
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/redemptions"), expect.any(Object));
    });

    it("should throw error on failure", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Insufficient points" }),
      });

      await expect(APIService.redeemReward("fake-token", 1)).rejects.toThrow("Insufficient points");
    });
  });
});
