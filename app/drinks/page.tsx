"use client";
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";
import DrinksContainer from "../components/drinksComponents/DrinksContainer";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useMediaQuery } from "../utils/mobileFunctions";
import CartDrawer from "../components/MobileComponents/CartDrawer";

const CurrentOrderCard = dynamic(
  () => import("../components/CurrentOrderCard/CurrentOrderCard"),
  { ssr: false }
);

export default function DrinksPage() {
  const [scope, animate] = useAnimate();
  const isDesktop = useMediaQuery(768);
  const drawerOpen = useSelector((state: RootState) => state.order.cartDrawer);
  useEffect(() => {
    animate("div", { opacity: 1 }, { delay: stagger(0.04) });
  });

  return (
    <div
      className="flex flex-row w-full gap-8 h-full text-white drop-shadow-lg"
      ref={scope}
    >
      <motion.div
        className="w-full md:w-2/3 bg-request-orange rounded-xl overflow-auto h-full pt-10"
        initial={{ opacity: 0, translateX: -80 }}
        animate={{ opacity: 1, translateX: 0 }}
        key={"DrinksCard"}
      >
        <DrinksContainer />
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
