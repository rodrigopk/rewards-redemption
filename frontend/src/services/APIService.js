const BASE_URL = 'http://localhost:3000/api/v1';

export async function signIn({ email, password }) {
  const res = await fetch(`${BASE_URL}/auth/sign_in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Sign in failed');
  }

  return data;
}
