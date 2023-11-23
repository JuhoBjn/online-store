const signup = async (email, password) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/api/users/signup`,
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
    `${import.meta.env.VITE_BACKEND_API}/api/users/login`,
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

/**
 * Fetch a user's profile.
 * @param {String} id ID of the user to fetch
 * @param {String} token JWT token
 * @returns Compact user object if other user, full profile if own profile
 */
const getUser = async (id, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/api/users/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    }
  );
  const responseMessage = await response.json();
  if (response.status !== 200) {
    console.error(`Failed to get user: ${responseMessage.message}`);
    return {};
  }
  return responseMessage;
};

/**
 * Upgrade a user account to premium.
 * @param {String} id ID of user to upgrade
 * @param {String} token JWT token
 * @returns Response message if successful, false if upgrade fails.
 */
const upgradeToPremium = async (id, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/api/users/updateUser`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ id, premium: true })
    }
  );
  const responseMessage = await response.json();
  if (response.status !== 200) {
    console.error(`Failed to upgrade to premium: ${responseMessage.message}`);
    return false;
  }
  return response;
};

export { signup, login, getUser, upgradeToPremium };
