import { AnimatePresence, motion } from "framer-motion";
import { FaTrash, FaInfo } from "react-icons/fa";
import RoutingButton from "./RoutingButton";
import { useOrder } from "../context/OrderContext";
import { usePathname } from "next/navigation";
import { CocktailType, MealType } from "../types/types";

export default function CurrentOrderCard() {
  const order = useOrder();
  const currentPath = usePathname();

  const currentOrder = order.currentOrder || { drinks: [], meals: [] };
  return (
    <div className="flex flex-col h-full p-4 select-none">
      {currentOrder.id && (
        <h2 className="flex flex-row items-center gap-4 bg-blue-500 rounded-xl p-4 font-bold my-2">
          <FaInfo className="text-white text-lg" />
          <span>You are currently editing an existing order</span>
        </h2>
      )}
      <h2 className="text-lg font-bold">Your order:</h2>
      <ul className="flex flex-col justify-start p-2 gap-2 overflow-y-visible overflow-x-hidden h-full">
        {currentOrder.meals.length === 0 && currentOrder.drinks.length === 0 ? (
          <p className="text-center font-bold text-2xl">Cart empty</p>
        ) : (
          <AnimatePresence>
            {currentOrder.meals.map(({ meal, quantity }) => (
              <motion.li
                initial={{ opacity: 0, translateY: 80 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateX: 20 }}
                className="flex flex-col justify-between bg-white rounded-xl text-black p-2 shadow-lg"
                key={meal.idMeal}
              >
                <div className="flex flex-row gap-1">
                  <p>{quantity}x</p>
                  <p className="font-bold line-clamp-2">{meal.strMeal}</p>
                  <p className="font-bold ml-auto text-nowrap">
                    {meal.price * quantity} kr.
                  </p>
                </div>
                <div className="flex flex-row justify-between items-start gap-2">
                  <p className="text-xs">{meal.strCategory}</p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    className="text-red-600 select-all"
                    onClick={() => order.removeDish(meal)}
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        )}
        {currentOrder && (
          <AnimatePresence>
            {currentOrder.drinks.map(({ drink, quantity }) => (
              <motion.li
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateX: 20 }}
                className="flex flex-col justify-between bg-white rounded-xl text-black p-2 shadow-lg"
                key={drink.idDrink}
              >
                <div className="flex flex-row gap-1">
                  <p>{quantity}x</p>
                  <p className="font-bold">{drink.strDrink}</p>
                  <p className="font-bold ml-auto">
                    {drink.price * quantity} kr.
                  </p>
                </div>
                <div className="flex flex-row justify-between items-start gap-2">
                  <p className="text-xs">{drink.strCategory}</p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    className="text-red-600 select-all"
                    onClick={() => order.removeDrink(drink)}
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        )}
      </ul>
      <div className="flex flex-col mt-auto gap-2">
        <h3 className="ml-auto text-lg font-bold">
          Total: {order.getCurrentPrice()} kr.
        </h3>
        <RoutingButton
          text="Next"
          className="flex flex-row justify-center items-center bg-green-700 p-2 rounded-xl text-xl font-semibold hover:bg-green-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          type="forward"
          disabled={
            (currentOrder?.meals.length === 0 && currentPath === "/dishes") ||
            ((currentOrder?.drinks.length === 0 ||
              currentOrder?.meals.length === 0) &&
              currentPath === "/drinks")
          }
        />
        <button
          className="flex flex-row justify-center items-center bg-red-600 p-2 rounded-xl text-xl font-semibold gap-2"
          onClick={() => order.cancelOrder()}
        >
          Cancel <FaTrash />
        </button>
      </div>
    </div>
  );
}
