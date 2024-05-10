"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type ImageCarouselTypes = {
  images: string[];
};

export default function ImageCarousel({ images }: ImageCarouselTypes) {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    dots: false,
  };
  return (
    <Slider
      {...settings}
      className="col-span-1 row-span-2 overflow-hidden rounded-xl"
    >
      {images.map((image) => {
        return (
          <div key={image} className="max-h-full">
            <img src={image} className="object-cover w-full" />
          </div>
        );
      })}
    </Slider>
  );
}
