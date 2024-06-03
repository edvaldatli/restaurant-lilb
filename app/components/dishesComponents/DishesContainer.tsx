import PocketBase from "pocketbase";
import { MealType } from "@/app/types/types";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import { useMediaQuery } from "../../utils/mobileFunctions";

import { useOrder } from "@/app/context/OrderContext";
import ItemImage from "../ItemImage";
import toast, { Toaster } from "react-hot-toast";
import DishCard from "../ItemCard";

const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_HOST);
enum foodCategories {
  Lamb = "Lamb",
  Goat = "Goat",
  Pasta = "Pasta",
  Beef = "Beef",
  Chicken = "Chicken",
}

export default function DishesContainer() {
  const order = useOrder();
  const [meals, setMeals] = useState<MealType[]>([]);
  const [displayDishes, setDisplayDishes] = useState<MealType[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<foodCategories>(
    foodCategories.Beef
  );
  const isDesktop = useMediaQuery(768);

  const fetchDishes = async () => {
    const records = await fetch(
      `https://themealdb.com/api/json/v1/1/filter.php?c=${categoryFilter}`
    );
    const data: { meals: MealType[] } = await records.json();

    data.meals.forEach((meal) => {
      meal.price = 2500;
      meal.strCategory = categoryFilter;
    });

    setMeals(data.meals);
    setDisplayDishes(data.meals);
  };

  const filterDishes = (filter: foodCategories) => {
    setCategoryFilter(filter);
  };

  const addDish = (dish: MealType) => {
    order.updateDishes(dish);
    if (!isDesktop) toast.success(`🍲 ${dish.strMeal} added to cart`);
  };

  useEffect(() => {
    fetchDishes();
    console.log("Meals:", meals);
  }, [categoryFilter]);

  return (
    <div className="flex flex-col items-center p-6 gap-4 w-full">
      <Toaster />
      <h2 className="text-2xl font-bold">Please select your dishes:</h2>
      <div className="flex flex-row justify-start md:justify-center gap-2 md:gap-5 font-bold w-full overflow-x-scroll py-2">
        <button
          className={`p-3 bg-zinc-800 rounded-xl transition hover:scale-110 ${
            categoryFilter === foodCategories.Beef ? "bg-green-500" : ""
          }`}
          onClick={() => filterDishes(foodCategories.Beef)}
        >
          Beef
        </button>
        <button
          className={`p-3 bg-zinc-800 rounded-xl transition hover:scale-110 ${
            categoryFilter === foodCategories.Chicken ? "bg-green-500" : ""
          }`}
          onClick={() => filterDishes(foodCategories.Chicken)}
        >
          Chicken
        </button>
        <button
          className={`p-3 bg-zinc-800 rounded-xl transition hover:scale-110 ${
            categoryFilter === foodCategories.Pasta ? "bg-green-500" : ""
          }`}
          onClick={() => filterDishes(foodCategories.Pasta)}
        >
          Pasta
        </button>
        <button
          className={`p-3 bg-zinc-800 rounded-xl transition hover:scale-110 ${
            categoryFilter === foodCategories.Lamb ? "bg-green-500" : ""
          }`}
          onClick={() => filterDishes(foodCategories.Lamb)}
        >
          Lamb
        </button>
        <button
          className={`p-3 bg-zinc-800 rounded-xl transition hover:scale-110 ${
            categoryFilter === foodCategories.Goat ? "bg-green-500" : ""
          }`}
          onClick={() => filterDishes(foodCategories.Goat)}
        >
          Goat
        </button>
      </div>
      <Reorder.Group
        values={displayDishes}
        onReorder={setDisplayDishes}
        className="flex flex-row flex-wrap gap-4 text-black h-full w-full"
      >
        {displayDishes.map((meal) => (
          <Reorder.Item
            value={meal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, type: "tween" }}
            dragListener={false}
            key={meal.idMeal}
            className="flex flex-col gap-4 flex-grow w-full"
          >
            <DishCard item={meal} onAddToCart={() => addDish(meal)} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
