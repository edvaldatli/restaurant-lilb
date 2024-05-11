"use client";
import {
  motion,
  AnimatePresence,
  animate,
  stagger,
  useAnimate,
} from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WelcomeCard from "./components/WelcomeCard";
import OldOrderCard from "./components/OldOrderCard";
import Carousel from "./components/Carousel";
import LogoCard from "./components/LogoCard";
import { useEffect } from "react";

const images: string[] = [
  "/carouselImages/image1.jpg",
  "/carouselImages/image2.jpg",
  "/carouselImages/image3.jpg",
];

export default function Home() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate("#card", { opacity: 1 }, { delay: stagger(0.04) });
  }, []);

  return (
    <div
      id="homewrapper"
      className="grid lg:grid-rows-4 lg:grid-cols-3 h-full w-full text-white gap-6"
      ref={scope}
    >
      <AnimatePresence>
        <motion.div
          id="card"
          key={"Welcome card"}
          className="col-span-2 row-span-2 rounded-xl h-full"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <WelcomeCard />
        </motion.div>

        <motion.div
          id="card"
          key={"Logo card"}
          className="lg:block col-span-2 lg:col-span-1 lg:row-span-2 bg-request-orange rounded-xl p-6 w-full"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <LogoCard />
        </motion.div>

        {/* Mikið issue að reyna fitta þetta Carousel og þess vegna er kóðinn skrýtinn */}
        <motion.div
          id="card"
          key={"Carousel card"}
          className="hidden lg:block col-span-1 row-span-2 overflow-hidden rounded-xl"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <Carousel images={images} />
        </motion.div>

        <motion.div
          id="card"
          key={"Check order card"}
          className="col-span-2 row-span-2"
          initial={{ opacity: 0, translateX: -80 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <OldOrderCard />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
