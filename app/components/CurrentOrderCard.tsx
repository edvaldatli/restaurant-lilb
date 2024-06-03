import { AnimatePresence, motion } from "framer-motion";
import { FaTrash, FaInfo } from "react-icons/fa";
import RoutingButton from "./RoutingButton";
import { useOrder } from "../context/OrderContext";
import { usePathname } from "next/navigation";
import React from "react";
import OrderItemCard from "./CurrentOrderCard/OrderItemCard";

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
          <p className="text-center font-bold text-2xl my-auto">Cart empty</p>
        ) : (
          <AnimatePresence>
            <p className="font-semibold" key={"meals-p"}>
              Meals:
            </p>
            {currentOrder.meals.map(({ meal, quantity }) => (
              <OrderItemCard
                key={meal.idMeal}
                item={meal}
                quantity={quantity}
                removeItem={() => order.removeDish(meal)}
              />
            ))}
            <p className="font-semibold" key={"drinks-p"}>
              Drinks:
            </p>
            {currentOrder.drinks.map(({ drink, quantity }) => (
              <OrderItemCard
                key={drink.idDrink}
                item={drink}
                quantity={quantity}
                removeItem={() => order.removeDrink(drink)}
              />
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
