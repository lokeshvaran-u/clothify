export const getUserFromToken = () => {

  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {

    const payload = token.split(".")[1];

    const base64 = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const decodedPayload = atob(base64);

    return JSON.parse(decodedPayload);

  } catch (error) {

    console.log("Invalid token");

    return null;
  }
};


export const getUserRole = () => {

  const user = getUserFromToken();

  return user?.role || null;

};