"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { DishType, CocktailType } from "../types/types";

export type OrderType = {
  dishes: { dish: DishType; quantity: number }[];
  drinks: { drink: CocktailType; quantity: number }[];
};

const OrderContext = createContext<{
  currentOrder: OrderType | undefined;
  updateDrinks: (drinks: CocktailType) => void;
  removeDrink: (drinks: CocktailType) => void;
  updateDishes: (dishes: DishType) => void;
  removeDish: (dishes: DishType) => void;
  getCurrentPrice: () => number;
}>({
  currentOrder: undefined,
  updateDrinks: () => {},
  removeDrink: () => {},
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

  const updateDrinks = (newDrink: CocktailType) => {
    setCurrentOrder((rest) => {
      const drinkExists = rest.drinks.find(
        (d) => d.drink.idDrink === newDrink.idDrink
      );
      const newDrinks = drinkExists
        ? rest.drinks.map((d) =>
            d.drink.idDrink === newDrink.idDrink
              ? { ...d, quantity: d.quantity + 1 }
              : d
          )
        : [
            ...rest.drinks,
            { drink: newDrink, quantity: 1, price: newDrink.price },
          ];
      return {
        ...rest,
        drinks: newDrinks,
      };
    });
  };

  const removeDrink = (drinkToRemove: CocktailType) => {
    setCurrentOrder((rest) => ({
      ...rest,
      drinks: rest.drinks.reduce((acc, d) => {
        if (d.drink.idDrink === drinkToRemove.idDrink) {
          if (d.quantity > 1) {
            acc.push({ ...d, quantity: d.quantity - 1 });
          }
        } else {
          acc.push(d);
        }
        return acc;
      }, [] as { drink: CocktailType; quantity: number }[]),
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
    const dishesPrice = currentOrder.dishes.reduce(
      (acc, dish) => acc + dish.dish.price * dish.quantity,
      0
    );
    const drinksPrice = currentOrder.drinks.reduce(
      (acc, drink) => acc + drink.drink.price * drink.quantity,
      0
    );
    return dishesPrice + drinksPrice;
  };

  return (
    <OrderContext.Provider
      value={{
        currentOrder,
        updateDrinks,
        removeDrink,
        updateDishes,
        removeDish,
        getCurrentPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
