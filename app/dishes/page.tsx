"use client";
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import DishesCard from "../components/dishesComponents/DishesCard";
import { useEffect } from "react";
import CurrentOrderCard from "../components/CurrentOrderCard";

export default function DishesPage() {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate("div", { opacity: 1 }, { delay: stagger(0.04) });
  });
  return (
    <div
      className="grid lg:grid-cols-3 gap-8 text-white drop-shadow-lg h-full"
      ref={scope}
    >
      <AnimatePresence>
        <motion.div
          id="card"
          key={"Dishes card"}
          className="col-span-2 row-span-10 bg-request-orange rounded-xl h-full overflow-auto"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <DishesCard />
        </motion.div>
        <motion.div
          id="card"
          key={"Next step card"}
          className=" bg-request-orange rounded-xl"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <CurrentOrderCard />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
