"use client";
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";
import CurrentOrderCard from "../components/CurrentOrderCard/CurrentOrderCard";
import DishesContainer from "../components/dishesComponents/DishesContainer";

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
      <motion.div
        className="w-full md:w-2/3 bg-request-orange rounded-xl overflow-auto "
        initial={{ opacity: 0, translateX: -80 }}
        animate={{ opacity: 1, translateX: 0 }}
      >
        <DishesContainer />
      </motion.div>
      <motion.div
        className="w-1/3 h-2/3 md:h-full hidden md:block bg-request-orange rounded-xl"
        initial={{ opacity: 0, translateX: -80 }}
        animate={{ opacity: 1, translateX: 0 }}
      >
        <CurrentOrderCard />
      </motion.div>
    </div>
  );
}
