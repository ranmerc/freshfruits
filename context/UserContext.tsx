import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";

interface UserContextType {
  username: string;
  setUserName: (user: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUserName] = useLocalStorage<string>("username", "");

  return (
    <UserContext.Provider value={{ username, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}
