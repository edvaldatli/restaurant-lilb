import { RootState } from "@/app/store";

export const selectOrder = (state: RootState) => state.order.order;

export const getCurrentPrice = (state: RootState) => {
    const order = selectOrder(state);
    let price = 0;
    order.meals.forEach((m) => {
        price += m.meal.price * m.quantity;
    });
    order.drinks.forEach((d) => {
        price += d.drink.price * d.quantity;
    });
    return price;
};