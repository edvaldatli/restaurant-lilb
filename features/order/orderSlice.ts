import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CocktailType, MealType } from "../../app/types/types";

export interface OrderState {
    order: {
        id?: string;
        meals: { meal: MealType; quantity: number }[];
        drinks: { drink: CocktailType; quantity: number }[];
    };
}

const initializeState = (): OrderState["order"] => {
    const order = localStorage.getItem("order");
    if (order) {
        return JSON.parse(order);
    }
    return {
        id: "",
        meals: [],
        drinks: []
    };
};

const initialState: OrderState = {
    order: initializeState()
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        updateDrinks: (state, action: PayloadAction<CocktailType>) => {
            const drink = state.order.drinks.find((d) => d.drink.idDrink === action.payload.idDrink);
            if (drink) {
                drink.quantity += 1;
            } else {
                state.order.drinks.push({ drink: action.payload, quantity: 1 });
            }
            localStorage.setItem("order", JSON.stringify(state.order));
        },
        removeDrink: (state, action: PayloadAction<{ idDrink: string }>) => {
            const drink = state.order.drinks.find((d) => d.drink.idDrink === action.payload.idDrink);
            if (drink) {
                if (drink.quantity > 1) {
                    drink.quantity -= 1;
                } else {
                    state.order.drinks = state.order.drinks.filter((d) => d.drink.idDrink !== action.payload.idDrink);
                }
            }
            localStorage.setItem("order", JSON.stringify(state.order));
        },
        updateDishes: (state, action: PayloadAction<MealType>) => {
            const meal = state.order.meals.find((m) => m.meal.idMeal === action.payload.idMeal);
            if (meal) {
                meal.quantity += 1;
            } else {
                state.order.meals.push({ meal: action.payload, quantity: 1 });
            }
            localStorage.setItem("order", JSON.stringify(state.order));
        },
        removeDish: (state, action: PayloadAction<{ idMeal: string }>) => {
            const meal = state.order.meals.find((m) => m.meal.idMeal === action.payload.idMeal);
            if (meal) {
                if (meal.quantity > 1) {
                    meal.quantity -= 1;
                } else {
                    state.order.meals = state.order.meals.filter((m) => m.meal.idMeal !== action.payload.idMeal);
                }
            }
            localStorage.setItem("order", JSON.stringify(state.order));
        },
        cancelOrder: (state) => {
            state.order = {
                id: "",
                meals: [],
                drinks: []
            };
            localStorage.setItem("order", JSON.stringify(state.order));
        },
        fetchOrderFromLocalStorage: (state) => {
            const order = localStorage.getItem("order");
            if (order) {
                state.order = JSON.parse(order);
            }
        },
        setOrderToLocalStorage: (state) => {
            localStorage.setItem("order", JSON.stringify(state.order));
        },
        setCurrentEditOrder: (state, action: PayloadAction<OrderState["order"]>) => {
            state.order = action.payload;
            localStorage.setItem("order", JSON.stringify(state.order));
        }
    }
});

export const {
    updateDrinks,
    removeDrink,
    updateDishes,
    removeDish,
    cancelOrder,
    fetchOrderFromLocalStorage,
    setOrderToLocalStorage,
    setCurrentEditOrder
} = orderSlice.actions;

export default orderSlice.reducer;
