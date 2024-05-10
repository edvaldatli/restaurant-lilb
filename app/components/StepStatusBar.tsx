"use client";
import { usePathname } from "next/navigation";
import Number from "./Number";

export default function StepStatusBar() {
  const path = usePathname();

  return (
    <nav className="flex flex-row justify-center items-center text-lg text-white font-bold h-24 w-full bg-request-orange fixed">
      <span
        className={`flex h-full items-center px-20 gap-2 hover:bg-request-red transition-colors ${
          path === "/" ? "bg-zinc-800" : ""
        }`}
      >
        <Number active={path === "/"} number={1} />
        Home
      </span>
      <span
        className={`flex h-full items-center px-20 gap-2 hover:bg-request-red transition-colors ${
          path === "/dishes" ? "bg-zinc-800" : ""
        }`}
      >
        <Number active={path === "/dishes"} number={2} />
        Dishes
      </span>
      <span
        className={`flex h-full items-center px-20 gap-2 hover:bg-request-red transition-colors ${
          path === "/drinks" ? "bg-zinc-800" : ""
        }`}
      >
        <Number active={path === "/drinks"} number={3} />
        Drinks
      </span>
      <span
        className={`flex h-full items-center px-20 gap-2 hover:bg-request-red transition-colors ${
          path === "/order" ? "bg-zinc-800" : ""
        }`}
      >
        <Number active={path === "/order"} number={4} />
        Order
      </span>
    </nav>
  );
}
