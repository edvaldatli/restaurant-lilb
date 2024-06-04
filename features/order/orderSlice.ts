import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CocktailType, MealType } from "../../app/types/types";

export const updatePrice = createAction<number>("order/updatePrice");

export interface OrderState {
    order: {
        id?: string;
        meals: { meal: MealType; quantity: number }[];
        drinks: { drink: CocktailType; quantity: number }[];
        totalPrice: number
    };
}

const initializeState = (): OrderState["order"] => {
    if (typeof window !== "undefined") {
        const order = localStorage.getItem("order");
        if (order) {
            const orderParsed = JSON.parse(localStorage.getItem("order") as string) as OrderState["order"];
            orderParsed.totalPrice = updateTotalPrice(orderParsed);
            return orderParsed;
        }
        return {
            id: "",
            meals: [],
            drinks: [],
            totalPrice: 0
        };
    } else {
        return {
            id: "",
            meals: [],
            drinks: [],
            totalPrice: 0
        };
    }
};

const updateTotalPrice = (order: OrderState["order"]): number => {
    let totalPrice = 0;
    order.meals.forEach(({ meal, quantity }) => {
        totalPrice += meal.price * quantity;
    });
    order.drinks.forEach(({ drink, quantity }) => {
        totalPrice += drink.price * quantity;
    });
    return totalPrice;
};

const initialState: OrderState = {
    order: initializeState(),
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
            state.order.totalPrice = updateTotalPrice(state.order);
            localStorage.setItem("order", JSON.stringify(state.order));
        },
        removeDrink: (state, action: PayloadAction<CocktailType>) => {
            const drink = state.order.drinks.find((d) => d.drink.idDrink === action.payload.idDrink);
            if (drink) {
                if (drink.quantity > 1) {
                    drink.quantity -= 1;
                } else {
                    state.order.drinks = state.order.drinks.filter((d) => d.drink.idDrink !== action.payload.idDrink);
                }
            }
            state.order.totalPrice = updateTotalPrice(state.order);
            localStorage.setItem("order", JSON.stringify(state.order));
        },
        updateDishes: (state, action: PayloadAction<MealType>) => {
            const meal = state.order.meals.find((m) => m.meal.idMeal === action.payload.idMeal);
            if (meal) {
                meal.quantity += 1;
                
            } else {
                state.order.meals.push({ meal: action.payload, quantity: 1 });
            }
            state.order.totalPrice = updateTotalPrice(state.order);
            localStorage.setItem("order", JSON.stringify(state.order));
        },
        removeDish: (state, action: PayloadAction<MealType>) => {
            const meal = state.order.meals.find((m) => m.meal.idMeal === action.payload.idMeal);
            if (meal) {
                if (meal.quantity > 1) {
                    meal.quantity -= 1;
                } else {
                    state.order.meals = state.order.meals.filter((m) => m.meal.idMeal !== action.payload.idMeal);
                }
            }
            state.order.totalPrice = updateTotalPrice(state.order);
            localStorage.setItem("order", JSON.stringify(state.order));
        },
        cancelOrder: (state) => {
            state.order = {
                id: "",
                meals: [],
                drinks: [],
                totalPrice: 0
            };
            localStorage.setItem("order", JSON.stringify(state.order));
        },
        setCurrentEditOrder: (state, action: PayloadAction<OrderState["order"]>) => {
            state.order = action.payload;
            state.order.totalPrice = state.order.meals.reduce((sum, item) => sum + item.meal.price * item.quantity, 0) +
                state.order.drinks.reduce((sum, item) => sum + item.drink.price * item.quantity, 0);
            localStorage.setItem("order", JSON.stringify(state.order));
        }
    },
});

export const {
    updateDrinks,
    removeDrink,
    updateDishes,
    removeDish,
    cancelOrder,
    setCurrentEditOrder
} = orderSlice.actions;

export default orderSlice.reducer;
