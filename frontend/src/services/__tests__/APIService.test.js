import APIService from '../APIService';

global.fetch = jest.fn();

describe('APIService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
});
