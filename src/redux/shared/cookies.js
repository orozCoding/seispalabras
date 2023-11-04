const setTokenCookie = (token, date) => {
  document.cookie = `user_token=${token}; expires=${date.toUTCString()}; path=/`;
};

const deleteTokenCookie = () => {
  document.cookie = "user_token=none; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
};

const getTokenCookie = () => {
  if (!document.cookie.includes("user_token")) return null;
  const value = `; ${document.cookie}`;
  const parts = value.split("; user_token=");
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export { setTokenCookie, deleteTokenCookie, getTokenCookie };
