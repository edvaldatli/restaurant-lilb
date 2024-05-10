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
};

const LocalStorageContext = createContext<LocalStorageTypes>({
  email: "",
  name: "",
  lastOrder: [],
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
    if (storedName) {
      setName(storedName);
    }
    console.log(storedName);
  }, []);

  return (
    <LocalStorageContext.Provider value={{ name, email, lastOrder }}>
      {children}
    </LocalStorageContext.Provider>
  );
};
