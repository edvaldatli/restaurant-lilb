"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WelcomeCard from "./components/WelcomeCard";
import OldOrderCard from "./components/OldOrderCard";
import Carousel from "./components/Carousel";

const images: string[] = [
  "/carouselImages/image1.jpg",
  "/carouselImages/image2.jpg",
  "/carouselImages/image3.jpg",
];

var settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  dots: false,
};
export default function Home() {
  return (
    <div className="grid md:grid-rows-4 md:grid-cols-3 h-screen overflow-hidden w-full gap-8 pt-32 pb-4 grid-rows-1 grid-cols-1 text-white">
      <div className="col-span-2 row-span-2 rounded-xl h-full">
        <WelcomeCard />
      </div>
      {/* Mikið issue að reyna fitta þetta Carousel og þess vegna er kóðinn skrýtinn */}
      <Carousel images={images} />
      <div className="col-span-1 row-span-2 bg-request-orange rounded-xl"></div>
      <div className="col-span-2 row-span-2">
        <OldOrderCard />
      </div>
    </div>
  );
}
