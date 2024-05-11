"use client";
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion";
import DishesCard from "../components/dishesComponents/DishesCard";
import { useEffect } from "react";
import NextStepButton from "../components/NextStepButton";

export default function DishesPage() {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate("#card", { opacity: 1 }, { delay: stagger(0.1) });
  });
  return (
    <div
      className="grid grid-cols-3 grid-row-3 h-full gap-8 text-white drop-shadow-lg"
      ref={scope}
    >
      <AnimatePresence>
        <motion.div
          id="card"
          key={"Dishes card"}
          className="col-span-2 row-span-3 bg-request-orange rounded-xl"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <DishesCard />
        </motion.div>
        <motion.div
          id="card"
          key={"Next step card"}
          className="grid-cols-1 grid-row-1 bg-request-orange rounded-xl"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <div className="flex flex-col justify-end h-full p-4">
            <NextStepButton
              text="Proceed to drinks"
              className="flex flex-row justify-center items-center bg-green-700 p-8 rounded-xl text-3xl font-semibold hover:bg-green-500 transition-colors"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
