import { RootState } from "../store";

export default {
    emailValidation: (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = emailRegex.test(email);
        console.log(result)
        return result;
    },
    nameValidation: (name: string) => {
        const result = name.length > 0;
        return result;
    },
    dateValidation: (date: Date) => {
        const now = new Date();
        const result = date >= now;
        return result;
    },
    orderValidation: (state: RootState) => {
        const order = state.order.order;
        const isValid = order && order.meals.length > 0 && order.drinks.length > 0;
        return isValid;
    },
}