export const AUTH_KEY = "tdc-auth";

export const login = (email: string, password: string) => {
  if (email === "matchmaker@tdc.com" && password === "password123") {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }

  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;

  return localStorage.getItem(AUTH_KEY) === "true";
};
