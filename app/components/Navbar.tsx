"use client";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import RoutingButton from "./RoutingButton";
import { useMediaQuery } from "../utils/mobileFunctions";

export default function Navbar() {
  const navItems = [
    { path: "/", label: "Home", number: 1 },
    { path: "/dishes", label: "Dishes", number: 2 },
    { path: "/drinks", label: "Drinks", number: 3 },
    { path: "/review", label: "Order", number: 4 },
  ];

  const isDesktop = useMediaQuery(768);
  const router = useRouter();
  const path = usePathname();
  const activePath = navItems.find((item) => item.path === path);

  return (
    <>
      <nav className="hidden lg:flex flex-row justify-center items-center text-xl text-white font-bold h-14 w-screen bg-request-orange fixed z-20 select-none">
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
      </nav>
      <nav className="lg:hidden flex flex-row justify-center items-center w-full bg-request-orange text-2xl text-white font-bold h-12">
        {path !== "/" && (
          <AnimatePresence>
            <motion.div
              className="absolute left-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <RoutingButton
                type="back"
                disabled={false}
                className="flex flex-row items-center text-lg ml-2 gap-2"
                text="Back"
              />
            </motion.div>
          </AnimatePresence>
        )}
        {activePath && (
          <div className="flex items-center justify-center h-full px-20 gap-2 ">
            {activePath.label}
          </div>
        )}
        {path !== "/" && !isDesktop && (
          <RoutingButton
            type="forward"
            disabled={false}
            className="absolute right-1 flex flex-row items-center gap-2 text-lg"
          />
        )}
      </nav>
    </>
  );
}
