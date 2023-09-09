export const setUser = (user) => {
  try {
    localStorage.setItem("user", user);
  } catch (e) { }
};

export const getUser = () => {
  try {
    return localStorage.getItem("user");
  } catch (e) {
    return "";
  }
};
