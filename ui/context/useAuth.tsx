import * as SecureStore from "expo-secure-store";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  _id: string;
  phone?: string;
  name?: string;
}

interface AuthContextProps {
  user: User | null;
  type: "farmer" | "customer" | null;
  token: string | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setType: (type?: "farmer" | "customer" | null) => void;
  deleteToken: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [type, setType] = useState<"farmer" | "customer" | null>(null);
  const [loading, setLoading] = useState(true);

  const deleteToken = async () => {
    await SecureStore.deleteItemAsync("token");
    setToken(null);
  };

  const setUserType = async (newType: "farmer" | "customer") => {
    setType(newType);
    await SecureStore.setItemAsync("type", newType);
  };

  const setTokenAndStore = async (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      await SecureStore.setItemAsync("token", newToken);
    } else {
      await SecureStore.deleteItemAsync("token");
    }
  };

  const setUserAndStore = async (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      await SecureStore.setItemAsync("user", JSON.stringify(newUser));
    } else {
      await SecureStore.deleteItemAsync("user");
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync("user");
        const storedToken = await SecureStore.getItemAsync("token");

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    loadUserData();
  }, [setToken, deleteToken, setType]);

  return (
    <AuthContext.Provider
      value={{
        user,
        type,
        setType: setUserType,
        token,
        loading,
        setUser: setUserAndStore,
        setToken: setTokenAndStore,
        deleteToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
