import { useContext, createContext, useState, useEffect } from "react";
import { API_URL } from "./constants";

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: () => {},
  getRefreshToken: () => {},
  getUser: () => {},
  handleSignOut: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

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
        throw new Error(response.status);
      }
      const json = await response.json();

      return json.body.accessToken;
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
      return json.body;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function checkAuth() {
    if (accessToken) {
      console.log("Estas logeado");
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

  const signOut = () => {
    setIsAuthenticated(false);
    setAccessToken("");
    setUser(undefined);
    localStorage.removeItem("token");
  };

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getRefreshToken()}`,
        },
      });

      if (response.ok) {
        signOut();
      }
    } catch (err) {
      console.log(err);
    }
  };

  function getAccessToken() {
    return accessToken;
  }

  function getUser() {
    return user;
  }

  function getRefreshToken() {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const token = JSON.parse(tokenData);

      return token;
    }

    return null;
  }

  function saveUser(userData) {
    saveSessionInfo(
      userData.body.user,
      userData.body.accessToken,
      userData.body.refreshToken
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        saveUser,
        getRefreshToken,
        getUserInfo,
        getUser,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
