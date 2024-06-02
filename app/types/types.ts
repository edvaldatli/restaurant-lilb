export type CocktailType = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  price: number;
};

export type DishType = {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  available: boolean;
  price: number;
  ingredients: string;
};

export type MealType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  price: number;
}