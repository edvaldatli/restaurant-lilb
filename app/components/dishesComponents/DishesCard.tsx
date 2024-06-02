import PocketBase from "pocketbase";
import { MealType } from "@/app/types/types";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import { useMediaQuery } from "../../utils/mobileFunctions";

import { useOrder } from "@/app/context/OrderContext";
import ItemImage from "../ItemImage";
import toast, { Toaster } from "react-hot-toast";

const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_HOST);
enum foodCategories {
  Lamb = "Lamb",
  Goat = "Goat",
  Pasta = "Pasta",
  Beef = "Beef",
  Chicken = "Chicken",
}

export default function DishesCard() {
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
      <div className="flex flex-row justify-start md:justify-center gap-2 md:gap-5 font-bold w-full overflow-x-scroll">
        <button
          className="p-3 bg-zinc-800 rounded-xl"
          onClick={() => filterDishes(foodCategories.Beef)}
        >
          Beef
        </button>
        <button
          className="p-3 bg-zinc-800 rounded-xl"
          onClick={() => filterDishes(foodCategories.Chicken)}
        >
          Chicken
        </button>
        <button
          className="p-3 bg-zinc-800 rounded-xl"
          onClick={() => filterDishes(foodCategories.Pasta)}
        >
          Pasta
        </button>
        <button
          className="p-3 bg-zinc-800 rounded-xl"
          onClick={() => filterDishes(foodCategories.Lamb)}
        >
          Lamb
        </button>
        <button
          className="p-3 bg-zinc-800 rounded-xl"
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
        <AnimatePresence>
          {displayDishes.map((meal) => (
            <Reorder.Item
              value={meal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16, type: "tween" }}
              dragListener={false}
              key={meal.idMeal}
              className="flex flex-row w-full h-16 md:h-24 bg-white p-2 md:p-3 rounded-xl flex-grow shadow-lg gap-2 md:gap-4"
            >
              <ItemImage url={meal.strMealThumb} />
              <div className="flex flex-row justify-between h-full w-full">
                <div className="flex flex-col">
                  <h2 className="text-sm md:text-lg font-bold line-clamp-1">
                    {meal.strMeal}
                  </h2>
                  <p className="text-sm text-gray-500 font-light">
                    {meal.strCategory}
                  </p>
                </div>

                <div className="flex flex-col justify-between items-end h-full">
                  <p className="text-right font-bold text-sm md:text-lg">
                    {meal.price} kr.
                  </p>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-row items-center gap-2 bg-green-700 rounded-full px-2 md:py-1 text-white md:font-semibold text-sm md:text-md"
                    onClick={() => addDish(meal)}
                  >
                    Add
                    <FaPlus />
                  </motion.a>
                </div>
              </div>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}
