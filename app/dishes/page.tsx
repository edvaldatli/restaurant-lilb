"use client";
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";
import DishesContainer from "../components/dishesComponents/DishesContainer";
import dynamic from "next/dynamic";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import CartDrawer from "../components/MobileComponents/CartDrawer";
import { useMediaQuery } from "../utils/mobileFunctions";
const CurrentOrderCard = dynamic(
  () => import("../components/CurrentOrderCard/CurrentOrderCard"),
  { ssr: false }
);

export default function DishesPage() {
  const [scope, animate] = useAnimate();
  const drawerOpen = useSelector((state: RootState) => state.order.cartDrawer);
  const isDesktop = useMediaQuery(768);

  useEffect(() => {
    animate("div", { opacity: 1 }, { delay: stagger(0.04) });
  });

  return (
    <div
      className="flex flex-row gap-8 h-full text-white drop-shadow-lg"
      ref={scope}
    >
      <motion.div
        className="w-full md:w-2/3 bg-request-orange rounded-xl overflow-auto pt-10"
        initial={{ opacity: 0, translateX: -80 }}
        animate={{ opacity: 1, translateX: 0 }}
      >
        <DishesContainer />
      </motion.div>
      {isDesktop && (
        <motion.div
          className="w-1/3 h-2/3 md:h-full hidden md:block bg-request-orange rounded-xl"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <CurrentOrderCard />
        </motion.div>
      )}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 h-screen w-screen bg-request-green z-10"
            initial={{ translateY: "100%" }}
            animate={{ translateY: 0, transition: { type: "just" } }}
            exit={{ translateY: "100%" }}
          >
            <CartDrawer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
