"use client";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import RoutingButton from "./RoutingButton";
import { useMediaQuery } from "../utils/mobileFunctions";
import { FaCartShopping } from "react-icons/fa6";
import { toggleCartDrawer } from "@/features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

export default function Navbar() {
  const navItems = [
    { path: "/", label: "Home", number: 1 },
    { path: "/dishes", label: "Dishes", number: 2 },
    { path: "/drinks", label: "Drinks", number: 3 },
    { path: "/review", label: "Order", number: 4 },
  ];

  const isDesktop = useMediaQuery(768);
  const path = usePathname();
  const activePath = navItems.find((item) => item.path === path);
  const itemsInCart = useSelector(
    (state: RootState) => state.order.order.totalItems
  );
  const dispatch = useDispatch();

  const cartClick = () => {
    dispatch(toggleCartDrawer());
  };

  return (
    <>
      <motion.nav
        className="hidden lg:flex flex-row justify-center items-center text-xl text-white font-bold h-14 w-screen bg-request-orange fixed z-20 select-none"
        initial={{ opacity: 0, translateY: -100 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "just" }}
      >
        {path !== "/" && (
          <AnimatePresence>
            <motion.div
              className="fixed left-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <RoutingButton
                type="back"
                className="flex flex-row items-center"
                text="Back"
                disabled={false}
              />
            </motion.div>
          </AnimatePresence>
        )}
        {navItems.map((item) => {
          return (
            <h2
              key={item.number}
              className={`flex h-full items-center px-16 gap-2 hover:bg-request-red transition-colors ${
                path === item.path ? "bg-zinc-800" : ""
              }`}
            >
              {item.label}
            </h2>
          );
        })}
      </motion.nav>
      <nav className="lg:hidden flex flex-row items-center w-full bg-request-orange text-2xl text-white font-bold h-12 fixed z-40 ">
        {path !== "/" && (
          <>
            <AnimatePresence>
              <RoutingButton
                type="back"
                disabled={false}
                className="flex flex-row items-center text-lg gap-2 fixed top-3"
                text="Back"
              />
            </AnimatePresence>
          </>
        )}
        {activePath && (
          <div className="flex items-center justify-center h-full px-20 gap-2 w-full">
            {activePath.label}
          </div>
        )}
        {(path === "/dishes" || path === "/drinks") && !isDesktop && (
          <div className="flex flex-row justify-end gap-4 w-1/3 fixed right-0 top-3">
            <button
              className="flex flex-row items-center gap-1"
              onClick={() => cartClick()}
            >
              <FaCartShopping className="text-3xl" />
              <span className="text-lg">{itemsInCart}</span>
            </button>
            <RoutingButton
              type="forward"
              disabled={false}
              className="flex flex-row items-center gap-2 text-lg"
            />
          </div>
        )}
      </nav>
    </>
  );
}
