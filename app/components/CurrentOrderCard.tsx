import { AnimatePresence, motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import RoutingButton from "./RoutingButton";
import { useOrder } from "../context/OrderContext";
import { usePathname } from "next/navigation";
import { use } from "react";

export default function CurrentOrderCard() {
  const order = useOrder();
  const currentPath = usePathname();
  return (
    <div className="flex flex-col justify-between h-full p-4 select-none">
      <h2 className="text-lg font-bold">Your order:</h2>
      <ul className="flex flex-col p-2 gap-2">
        {order.currentOrder && (
          <AnimatePresence>
            {order.currentOrder.dishes.map(({ dish, quantity }) => (
              <motion.li
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateX: 20 }}
                className="flex flex-col justify-between bg-white rounded-xl text-black p-2 shadow-lg"
                key={dish.id}
              >
                <div className="flex flex-row gap-1">
                  <p>{quantity}x</p>
                  <p className="font-bold">{dish.name}</p>
                  <p className="font-bold ml-auto">
                    {dish.price * quantity} kr.
                  </p>
                </div>
                <div className="flex flex-row justify-between items-start gap-2">
                  <p className="text-xs">{dish.ingredients}</p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    className="text-red-600 select-all"
                    onClick={() => order.removeDish(dish)}
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        )}
        {order.currentOrder && (
          <AnimatePresence>
            {order.currentOrder.drinks.map(({ drink, quantity }) => (
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
      <div className="flex flex-col">
        <h3 className="ml-auto text-lg font-bold">
          Total: {order.getCurrentPrice()} kr.
        </h3>
        <RoutingButton
          text="Next"
          className="flex flex-row justify-center items-center bg-green-700 p-2 rounded-xl text-xl font-semibold hover:bg-green-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          type="forward"
          disabled={
            (order.currentOrder?.dishes.length === 0 &&
              currentPath === "/dishes") ||
            ((order.currentOrder?.drinks.length === 0 ||
              order.currentOrder?.dishes.length === 0) &&
              currentPath === "/drinks")
          }
        />
      </div>
    </div>
  );
}
