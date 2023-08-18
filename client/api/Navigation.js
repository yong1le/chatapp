import { getUser } from "./Session";

export const navigateToPage = (router, user = "") => {
  const storedUser = getUser();

  // No user at all
  if (!storedUser) {
    router.push("/check/login");
  }
  // There is a user, but it is not the user we want
  else if (storedUser && storedUser !== user) {
    router.push(`/${storedUser}`);
  }
};
