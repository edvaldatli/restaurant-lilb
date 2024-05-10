"use client";
import { usePathname, useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa";
import Number from "./Number";
import { AnimatePresence, motion } from "framer-motion";

export default function StepStatusBar() {
  const navItems = [
    { path: "/", label: "Home", number: 1 },
    { path: "/dishes", label: "Dishes", number: 2 },
    { path: "/drinks", label: "Drinks", number: 3 },
    { path: "/order", label: "Order", number: 4 },
  ];

  const router = useRouter();
  const path = usePathname();
  const activePath = navItems.find((item) => item.path === path);

  return (
    <>
      <nav className="hidden lg:flex flex-row justify-center items-center text-2xl text-white font-bold h-24 w-full bg-request-orange fixed z-20">
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
              <button
                className="flex flex-row gap-2 justify-center items-center  transition h-12 p-4 rounded-xl"
                onClick={() => router.back()}
              >
                <FaAngleLeft />
                Back
              </button>
            </motion.div>
          </AnimatePresence>
        )}
        {navItems.map((item) => {
          return (
            <span
              key={item.number}
              className={`flex h-full items-center px-16 gap-2 hover:bg-request-red transition-colors ${
                path === item.path ? "bg-zinc-800" : ""
              }`}
            >
              <Number number={item.number} />
              {item.label}
            </span>
          );
        })}
      </nav>
      <nav className="lg:hidden flex flex-row justify-center items-center w-full bg-request-orange text-2xl text-white font-bold h-24">
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
              <button
                className="flex flex-row gap-2 justify-center items-center  transition h-12 p-4 rounded-xl"
                onClick={() => router.back()}
              >
                <FaAngleLeft />
                Back
              </button>
            </motion.div>
          </AnimatePresence>
        )}
        {activePath && (
          <div className="flex items-center justify-center bg-zinc-800 h-full px-20 gap-2 ">
            <Number number={activePath.number} />
            {activePath.label}
          </div>
        )}
      </nav>
    </>
  );
}
