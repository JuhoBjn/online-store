export const parseTokenExpiration = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp;
  } catch (error) {
    return null;
  }
};
