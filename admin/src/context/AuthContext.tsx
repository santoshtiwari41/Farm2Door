import { createContext, useEffect, useState } from "react";

interface AuthContextProps {
  accessToken: string | null;
  user: User | null;
  setAuthData: (accessToken: string, user: User) => void;
  clearAuthData: () => void;
}

interface User {
  userId: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem("accessToken") || null;
  });
  const [user, setUser] = useState<User | null>(() => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  });

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedUserString = localStorage.getItem("user");

    if (storedAccessToken && storedUserString) {
      setAccessToken(storedAccessToken);
      setUser(JSON.parse(storedUserString));
    }
  }, []);

  const setAuthData = (newAccessToken: string, newUser: User) => {
    setAccessToken(newAccessToken);
    setUser(newUser);

    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const clearAuthData = () => {
    setAccessToken(null);
    setUser(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  const contextValue: AuthContextProps = {
    accessToken,
    user,
    setAuthData,
    clearAuthData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
