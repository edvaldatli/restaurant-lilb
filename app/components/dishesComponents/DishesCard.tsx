import PocketBase from "pocketbase";
import { DishType } from "@/app/types/types";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import {
  AnimatePresence,
  Reorder,
  motion,
  useAnimationControls,
} from "framer-motion";

import { useOrder } from "@/app/context/OrderContext";

const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_HOST);
enum foodCategories {
  Hamburger = "Hamburger",
  Pizza = "Pizza",
  Pasta = "Pasta",
}

export default function DishesCard() {
  const order = useOrder();
  const [dishes, setDishes] = useState<DishType[]>([]);
  const [displayDishes, setDisplayDishes] = useState<DishType[]>([]);

  const fetchDishes = async () => {
    const records: DishType[] = await pb.collection("dishes").getFullList();
    setDishes(records);
    setDisplayDishes(records);
  };

  const filterDishes = (filter: foodCategories) => {
    const dishesToDisplay = dishes.filter(
      (dish) => dish.category === filter.toString()
    );
    setDisplayDishes(dishesToDisplay);
  };

  const addDish = (dish: DishType) => {
    order.updateDishes(dish);
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 gap-4">
      <h2 className="text-2xl font-bold">Please select your dishes:</h2>
      <div className="flex flex-row justify-around gap-5 font-bold">
        <button
          className="p-3 bg-zinc-800 rounded-full m-auto"
          onClick={() => filterDishes(foodCategories.Pizza)}
        >
          Pizza
        </button>
        <button
          className="p-3 bg-zinc-800 rounded-full m-auto"
          onClick={() => filterDishes(foodCategories.Hamburger)}
        >
          Hamburger
        </button>
        <button
          className="p-3 bg-zinc-800 rounded-full M-auto"
          onClick={() => filterDishes(foodCategories.Pasta)}
        >
          Pasta
        </button>
      </div>
      <Reorder.Group
        values={displayDishes}
        onReorder={setDisplayDishes}
        className="flex flex-row flex-wrap gap-4 text-black h-full"
      >
        <AnimatePresence>
          {displayDishes.map((dish) => (
            <Reorder.Item
              value={dish}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
              dragListener={false}
              key={dish.id}
              className="flex flex-col lg:w-1/3 w-full h-64 bg-white p-3 rounded-xl flex-grow shadow-lg"
            >
              <Image
                src={
                  "/dishImages/_80b0946c-ec77-41dc-804b-62c0b3e9251f-430182224_2117777741914944_2539049768948188489_n.png"
                }
                className="h-1/2 object-contain"
                alt="Image of food"
                loading="lazy"
                width={500}
                height={500}
              />
              <div className="flex flex-col justify-between h-full pt-2">
                <div>
                  <h2 className="text-lg font-bold">{dish.name}</h2>
                  <p className="font-light text-sm">{dish.ingredients}</p>
                </div>
                <div className="flex flex-row justify-between items-end">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-row items-center gap-2 bg-green-700 rounded-full px-2 py-1 text-white font-bold"
                    onClick={() => addDish(dish)}
                  >
                    Add
                    <FaPlus />
                  </motion.a>
                  <p className="text-right font-bold text-lg">
                    {dish.price} kr.
                  </p>
                </div>
              </div>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}
