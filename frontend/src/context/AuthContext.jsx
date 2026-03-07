import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent auth state on mount
    const storedAuth = localStorage.getItem('authState');
    if (storedAuth) {
      try {
        setUser(JSON.parse(storedAuth));
      } catch (err) {
        console.error('Failed to parse auth state:', err);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, role) => {
    const authPayload = { ...userData, role };
    setUser(authPayload);
    localStorage.setItem('authState', JSON.stringify(authPayload));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authState');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, role: user?.role, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
