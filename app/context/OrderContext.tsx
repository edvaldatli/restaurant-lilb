"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { CocktailType, MealType } from "../types/types";

export type OrderContextType = {
  meals: { meal: MealType; quantity: number }[];
  drinks: { drink: CocktailType; quantity: number }[];
  id?: string;
};

const OrderContext = createContext<{
  currentOrder: OrderContextType | undefined;
  updateDrinks: (drinks: CocktailType) => void;
  removeDrink: (drinks: CocktailType) => void;
  updateDishes: (meals: MealType) => void;
  removeDish: (meals: MealType) => void;
  getCurrentPrice: () => number;
  cancelOrder: () => void;
  setIdOfOrder: (id: string) => void;
  setOrder: (order: OrderContextType) => void;
}>({
  currentOrder: { meals: [], drinks: [], id: undefined },
  updateDrinks: () => {},
  removeDrink: () => {},
  updateDishes: () => {},
  removeDish: () => {},
  getCurrentPrice: () => 0,
  cancelOrder: () => {},
  setIdOfOrder: () => {},
  setOrder: () => {},
});

export const useOrder = () => useContext(OrderContext);

export default function OrderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentOrder, setCurrentOrder] = useState<OrderContextType>({
    meals: [],
    drinks: [],
    id: undefined,
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

  const setIdOfOrder = (id: string) => {
    setCurrentOrder((rest) => ({
      ...rest,
      id: id,
    }));
  };

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

  const updateDishes = (newDish: MealType) => {
    setCurrentOrder((prevState) => {
      const dishExists = prevState.meals.find(
        (d) => d.meal.idMeal === newDish.idMeal
      );
      const newDishes = dishExists
        ? prevState.meals.map((d) =>
            d.meal.idMeal === newDish.idMeal
              ? { ...d, quantity: d.quantity + 1 }
              : d
          )
        : [...prevState.meals, { meal: newDish, quantity: 1 }]; // Changed key to 'meal'
      return {
        ...prevState,
        meals: newDishes,
      };
    });
  };

  const removeDish = (dishToRemove: MealType) => {
    setCurrentOrder((prevState) => ({
      ...prevState,
      meals: prevState.meals.reduce((acc, d) => {
        if (d.meal.idMeal === dishToRemove.idMeal) {
          if (d.quantity > 1) {
            acc.push({ ...d, quantity: d.quantity - 1 });
          }
        } else {
          acc.push(d);
        }
        return acc;
      }, [] as { meal: MealType; quantity: number }[]),
    }));
  };

  const getCurrentPrice = () => {
    const dishesPrice = currentOrder.meals.reduce(
      (acc, meals) => acc + meals.meal.price * meals.quantity,
      0
    );
    const drinksPrice = currentOrder.drinks.reduce(
      (acc, drink) => acc + drink.drink.price * drink.quantity,
      0
    );
    return dishesPrice + drinksPrice;
  };

  const cancelOrder = () => {
    setCurrentOrder({ meals: [], drinks: [], id: undefined });
  };

  const setOrder = (order: OrderContextType) => {
    setCurrentOrder(order);
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
        cancelOrder,
        setIdOfOrder,
        setOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
