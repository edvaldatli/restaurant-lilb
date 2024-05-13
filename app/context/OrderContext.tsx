import { createContext, useContext, useEffect, useState } from "react";

type OrderType = {
  dishes: string[];
  drinks: string[];
  date: string;
};

const OrderContext = createContext<{
  currentOrder: OrderType | undefined;
  updateDrinks: (drinks: string[]) => void;
  updateDishes: (dishes: string[]) => void;
}>({
  currentOrder: undefined,
  updateDrinks: () => {},
  updateDishes: () => {},
});

export const useOrder = () => useContext(OrderContext);

export default function OrderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentOrder, setCurrentOrder] = useState<OrderType>({
    dishes: [],
    drinks: [],
    date: "",
  });

  useEffect(() => {
    const order = localStorage.getItem("order");
    if (order) {
      setCurrentOrder(JSON.parse(order));
    }
  }, []);

  useEffect(() => {
    if (currentOrder) {
      localStorage.setItem("order", JSON.stringify(currentOrder));
    }
  }, [currentOrder]);

  const updateDrinks = (drinks: string[]) => {
    setCurrentOrder((rest) => ({
      ...rest,
      drinks,
    }));
  };

  const updateDishes = (dishes: string[]) => {
    setCurrentOrder((rest) => ({
      ...rest,
      dishes,
    }));
  };

  return (
    <OrderContext.Provider value={{ currentOrder, updateDrinks, updateDishes }}>
      {children}
    </OrderContext.Provider>
  );
}
