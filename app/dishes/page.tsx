"use client";
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import DishesCard from "../components/dishesComponents/DishesCard";
import { useEffect } from "react";
import RoutingButton from "../components/RoutingButton";

import { useOrder } from "../context/OrderContext";
import { DishType } from "../types/types";

export default function DishesPage() {
  const order = useOrder();
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate("#card", { opacity: 1 }, { delay: stagger(0.1) });
  });
  return (
    <div
      className="grid lg:grid-cols-3 lg:grid-row-3 h-full gap-8 text-white drop-shadow-lg"
      ref={scope}
    >
      <AnimatePresence>
        <motion.div
          id="card"
          key={"Dishes card"}
          className="col-span-2 row-span-3 bg-request-orange rounded-xl overflow-auto"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <DishesCard />
        </motion.div>
        <motion.div
          id="card"
          key={"Next step card"}
          className="grid-cols-1 grid-row-1 bg-request-orange rounded-xl sticky"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <div className="flex flex-col justify-end h-full p-4">
            <h2 className="text-lg font-bold">Your order:</h2>
            <ul className="flex flex-col p-2 gap-2">
              {order.currentOrder &&
                order.currentOrder.dishes.map(({ dish, quantity }) => (
                  <motion.li
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateX: 20 }}
                    className="flex flex-col justify-between bg-white rounded-xl text-black p-2 shadow-lg"
                    key={dish.id}
                  >
                    <AnimatePresence>
                      <div className="flex flex-row gap-1">
                        <p>{quantity}x</p>
                        <p className="font-bold">{dish.name}</p>
                        <p className="font-bold ml-auto">
                          {dish.price * quantity} kr.
                        </p>
                      </div>
                      <div className="flex flex-row justify-between items-start gap-2">
                        <p className="text-xs">{dish.ingredients}</p>
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.8 }}
                          className="text-red-600"
                          onClick={() => order.removeDish(dish)}
                        >
                          <FaTrash />
                        </motion.a>
                      </div>
                    </AnimatePresence>
                  </motion.li>
                ))}
            </ul>
            <h3 className="ml-auto text-lg font-bold">
              Total: {order.getCurrentPrice()} kr.
            </h3>
            <RoutingButton
              text="Proceed to drinks"
              className="flex flex-row justify-center items-center bg-green-700 p-2 rounded-xl text-3xl font-semibold hover:bg-green-500 transition-colors"
              type="forward"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
