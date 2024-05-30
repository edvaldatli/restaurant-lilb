"use client";
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion";
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
      className="flex flex-row gap-8 h-full text-white drop-shadow-lg"
      ref={scope}
    >
      <AnimatePresence>
        <motion.div
          id="card"
          key={"Dishes card"}
          className="w-ful md:w-2/3 bg-request-orange rounded-xl overflow-auto h-full"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <DishesCard />
        </motion.div>
        <motion.div
          id="card"
          key={"Order Card"}
          className="w-1/3 h-2/3 md:h-full hidden md:block bg-request-orange rounded-xl"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <CurrentOrderCard />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
