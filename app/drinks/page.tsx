"use client";
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";
import CurrentOrderCard from "../components/CurrentOrderCard/CurrentOrderCard";
import DrinksContainer from "../components/drinksComponents/DrinksContainer";

export default function DrinksPage() {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate("div", { opacity: 1 }, { delay: stagger(0.04) });
  });

  return (
    <div
      className="flex flex-row w-full gap-8 h-full text-white drop-shadow-lg"
      ref={scope}
    >
      <motion.div
        className="w-full md:w-2/3 bg-request-orange rounded-xl overflow-auto h-full"
        initial={{ opacity: 0, translateX: -80 }}
        animate={{ opacity: 1, translateX: 0 }}
        key={"DrinksCard"}
      >
        <DrinksContainer />
      </motion.div>
      <motion.div
        className="bg-request-orange rounded-xl w-1/3 h-2/3 md:h-full hidden md:block"
        initial={{ opacity: 0, translateX: -80 }}
        animate={{ opacity: 1, translateX: 0 }}
      >
        <CurrentOrderCard />
      </motion.div>
    </div>
  );
}
