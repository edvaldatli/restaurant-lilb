"use client";
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion";
import DishesCard from "../components/dishesComponents/DishesCard";
import { useEffect } from "react";
import NextStepButton from "../components/NextStepButton";

export default function DrinksPage() {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate("div", { opacity: 1 }, { delay: stagger(0.04) });
  });
  return (
    <div
      className="grid grid-cols-3 grid-row-3 h-screen gap-8 pt-32 pb-8 text-white drop-shadow-lg"
      ref={scope}
    >
      <AnimatePresence>
        <motion.div
          key={"Dishes card"}
          className="col-span-2 row-span-3 bg-request-orange rounded-xl"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <DishesCard />
        </motion.div>
        <motion.div
          key={"Next step card"}
          className="grid-cols-1 grid-row-1 bg-request-orange rounded-xl"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <div className="flex flex-col justify-end h-full p-4">
            <NextStepButton
              text="Proceed to order"
              className="flex flex-row justify-center items-center bg-green-700 p-8 rounded-xl text-3xl font-semibold hover:bg-green-500 transition-colors"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
