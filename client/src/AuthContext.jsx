import { createContext, useContext, useState, useEffect } from "react";
import {
  adminLogin,
  createAdmin,
  refreshToken,
  adminLogout,
} from "./utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const refresh = async () => {
      setLoading(true);

      try {
        const response = await refreshToken();
        setAdmin(response.data.admin);
      } catch (error) {
        console.error("Error refreshing token:", error);
      } finally {
        setLoading(false);
      }
    };
    refresh();
  }, []);

  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await adminLogin(email, password);
      setAdmin(response.data.admin);
      setLoading(false);
    } catch (error) {
      console.error("Login failed: Invalid email or password", error);
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);

    try {
      await createAdmin(username, email, password);
      setLoading(false);
    } catch (error) {
      console.error("Error during admin registration:", error);
      setLoading(false);
    } finally {
      login(email, password);
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      adminLogout();
      setAdmin(null);
    } catch (error) {
      console.error("Error during admin logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
