import { useContext, createContext, useState, useEffect } from "react";
import { API_URL } from "./constants";

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: () => {},
  getRefreshToken: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accesToken, setAccessToken] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {}, []);

  async function requestNewAccessToken(refreshToken) {
    try {
      const response = await fetch(`${API_URL}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      if (json.error) throw new Error(json.error);

      const json = await response.json();
      return json.body.accesToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function getUserInfo(accessToken) {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json = await response.json();

      if (json.error) throw new Error(json.error);

      return json;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function checkAuth() {
    if (accesToken) {
    } else {
      const token = getRefreshToken();

      if (token) {
        const newAccessToken = await requestNewAccessToken(token);
        if (newAccessToken) {
          const userInfo = await getUserInfo(newAccessToken);
          if (userInfo) {
            saveSessionInfo(userInfo, newAccessToken, token);
          }
        }
      }
    }
  }

  function saveSessionInfo(userInfo, accessToken, refreshToken) {
    setAccessToken(accessToken);

    setUser(userInfo);

    localStorage.setItem("token", JSON.stringify(refreshToken));

    setIsAuthenticated(true);
  }

  function getAccessToken() {
    return accesToken;
  }

  function getRefreshToken() {
    const token = localStorage.getItem("token");

    if (token) {
      const { refreshToken } = JSON.parse(token);
      return refreshToken;
    }

    return null;
  }

  function saveUser(userData) {
    saveSessionInfo(
      userData.body.user,
      userData.body.accesToken,
      userData.body.refreshToken
    );
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
