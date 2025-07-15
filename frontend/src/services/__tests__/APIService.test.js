import { signIn } from '../APIService';

global.fetch = jest.fn();

describe('APIService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('successfully signs in and returns token and user', async () => {
    const mockResponse = {
      token: 'fake-jwt-token',
      user: { email: 'test@example.com' }
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const result = await signIn({
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
      signIn({ email: 'test@example.com', password: 'wrong' })
    ).rejects.toThrow('Invalid email or password');
  });
});
