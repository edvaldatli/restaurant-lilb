"use client";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type LocalStorageTypes = {
  email: string | null;
  name: string | null;
  lastOrder: object[] | null;
  setNameLS: (name: string) => void;
  setEmailLS: (email: string) => void;
};

const LocalStorageContext = createContext<LocalStorageTypes>({
  email: "",
  name: "",
  lastOrder: [],
  setNameLS: () => {},
  setEmailLS: () => {},
});

export const useLocalStorage = () => useContext(LocalStorageContext);

export const LocalStorageProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<object[] | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("name") as string;
    const storedEmail = localStorage.getItem("email") as string;
    if (storedName) {
      setName(storedName);
      setEmail(storedEmail);
    }
  }, []);

  const setNameLS = (name: string) => {
    setName(name);
    localStorage.setItem("name", name);
  };

  const setEmailLS = (email: string) => {
    setEmail(email);
    localStorage.setItem("email", email);
  };

  return (
    <LocalStorageContext.Provider
      value={{ name, email, lastOrder, setNameLS, setEmailLS }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
