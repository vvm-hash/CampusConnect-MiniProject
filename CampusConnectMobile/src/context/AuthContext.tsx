import { createContext, useContext, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";   // <--- FIXED

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((u) => {
      console.log("Auth state changed:", u);
      setUser(u);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
