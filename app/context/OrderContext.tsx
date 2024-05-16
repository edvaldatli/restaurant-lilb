"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { DishType, CocktailType } from "../types/types";

type OrderType = {
  dishes: { dish: DishType; quantity: number }[];
  drinks: CocktailType[];
};

const OrderContext = createContext<{
  currentOrder: OrderType | undefined;
  updateDrinks: (drinks: CocktailType) => void;
  updateDishes: (dishes: DishType) => void;
  removeDish: (dishes: DishType) => void;
  getCurrentPrice: () => number;
}>({
  currentOrder: undefined,
  updateDrinks: () => {},
  updateDishes: () => {},
  removeDish: () => {},
  getCurrentPrice: () => 0,
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

  const updateDrinks = (drinks: CocktailType) => {
    setCurrentOrder((rest) => ({
      ...rest,
      drinks: [...rest.drinks, drinks],
    }));
  };

  const updateDishes = (newDish: DishType) => {
    setCurrentOrder((rest) => {
      const dishExists = rest.dishes.find((d) => d.dish.id === newDish.id);
      const newDishes = dishExists
        ? rest.dishes.map((d) =>
            d.dish.id === newDish.id ? { ...d, quantity: d.quantity + 1 } : d
          )
        : [...rest.dishes, { dish: newDish, quantity: 1 }];
      return {
        ...rest,
        dishes: newDishes,
      };
    });
  };

  const removeDish = (dishToRemove: DishType) => {
    setCurrentOrder((rest) => ({
      ...rest,
      dishes: rest.dishes.reduce((acc, d) => {
        if (d.dish.id === dishToRemove.id) {
          if (d.quantity > 1) {
            acc.push({ ...d, quantity: d.quantity - 1 });
          }
        } else {
          acc.push(d);
        }
        return acc;
      }, [] as { dish: DishType; quantity: number }[]),
    }));
  };

  const getCurrentPrice = () => {
    return currentOrder.dishes.reduce(
      (acc, { dish, quantity }) => acc + dish.price * quantity,
      0
    );
  };

  return (
    <OrderContext.Provider
      value={{
        currentOrder,
        updateDrinks,
        updateDishes,
        removeDish,
        getCurrentPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
