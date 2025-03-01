import axios from "axios";

import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const API = "https://expensetracker-backend-ocei.onrender.com/auth";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${API}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          logout();
        });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
