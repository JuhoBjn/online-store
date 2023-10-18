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
  const responseMessage = await response.json();
  if (response.status != 201) {
    throw new Error(`Failed to sign up: ${responseMessage.message}`);
  }
  return responseMessage;
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
  const responseMessage = await response.json();
  if (response.status != 200) {
    throw new Error(`Login failed: ${responseMessage.message}`);
  }
  return responseMessage;
};

export { signup, login };
