import { OrderType } from "./serverFunctions";

export default {
    emailValidation: (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = emailRegex.test(email);
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
    orderValidation: (meals: OrderType['meals'], drinks: OrderType['drinks']) => {
        const isValid = meals.length > 0 && drinks.length > 0;
        return isValid;
    },
}