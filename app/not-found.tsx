"use client";

import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import { delay, motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-full">
      <motion.div
        initial={{ opacity: 0, translateX: -80 }}
        animate={{ opacity: 1, translateX: 0 }}
      >
        <div className="flex flex-col bg-request-orange p-20 rounded-xl text-white gap-2">
          <h2 className="text-3xl font-bold">Oops.. are you lost?</h2>
          <p className="text-xl">Let us fix that.</p>
          <motion.div
            transition={{ type: "spring", stiffness: 200 }}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={"/"}
              className="flex flex-row w-full justify-center items-center bg-zinc-800 text-xl p-2 font-bold rounded-xl gap-2"
            >
              <FaAngleLeft />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
