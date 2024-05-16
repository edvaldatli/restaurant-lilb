"use client";
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import RoutingButton from "../components/RoutingButton";
import DrinksCard from "../components/drinksComponents/DrinksCard";
import { useOrder } from "../context/OrderContext";
import { CocktailType } from "../types/types";
import CurrentOrderCard from "../components/CurrentOrderCard";

export default function DrinksPage() {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate("div", { opacity: 1 }, { delay: stagger(0.04) });
  });

  return (
    <div
      className="grid lg:grid-cols-3 gap-8 h-full text-white drop-shadow-lg"
      ref={scope}
    >
      <AnimatePresence>
        <motion.div
          className="col-span-2 row-span-10 bg-request-orange rounded-xl h-full overflow-auto"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
          key={"DrinksCard"}
        >
          <DrinksCard />
        </motion.div>
        <motion.div
          className="bg-request-orange rounded-xl"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <CurrentOrderCard />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
