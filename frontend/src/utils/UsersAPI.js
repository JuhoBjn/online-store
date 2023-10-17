const signup = async (email, password) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ email, password })
    }
  );
  if (response.status != 201) {
    throw new Error(`Failed to sign up user: ${response.text}`);
  }
  return response.json();
};

const login = async (email, password) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ email, password })
    }
  );
  if (response.status != 200) {
    throw new Error("Login failed.");
  }
  return response.json();
};

export { signup, login };
