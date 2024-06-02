import Image from "next/image";
import { useEffect, useState } from "react";

type MealImageType = {
  url: string;
};

export default function MealImage({ url }: MealImageType) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <Image
      src={`${url}`}
      loading={"lazy"}
      alt="Image of meal"
      width={3000}
      height={3000}
      onLoad={() => setIsLoading(false)}
      className={`rounded-xl object-fit w-auto h-full ${
        isLoading ? "animate-pulse bg-gray-500 blur-md" : ""
      }`}
    />
  );
}
