import React, { createContext, useState, useEffect } from 'react';
import { userAPI } from '../services/api';

export const AuthContext = createContext();

const safeGetLocalStorage = (key) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
  } catch (error) {
    console.error('LocalStorage access error:', error);
  }
  return null;
};

const safeSetLocalStorage = (key, value) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    console.error('LocalStorage access error:', error);
  }
};


//  Secured Localstorege functions
const safeRemoveLocalStorage = (key) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error('LocalStorage access error:', error);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      try {
        const token = safeGetLocalStorage('token');
        const savedUser = safeGetLocalStorage('user');
        
        if (token && savedUser) {
          setUser(JSON.parse(savedUser));
          checkTokenExpiry();
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  //  Token For users Expiry
  const checkTokenExpiry = () => {
    const interval = setInterval(() => {
      const token = safeGetLocalStorage('token');
      if (token) {
        userAPI.getProfile()
          .catch(() => {
            logout();
            clearInterval(interval);
          });
      } else {
        clearInterval(interval);
      }
    }, 60000);
    return () => clearInterval(interval);
  };

  const login = (userData, token) => {
    try {
      safeSetLocalStorage('token', token);
      safeSetLocalStorage('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    try {
      safeRemoveLocalStorage('token');
      safeRemoveLocalStorage('user');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
