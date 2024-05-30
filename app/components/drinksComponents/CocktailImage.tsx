import Image from "next/image";
import { useEffect, useState } from "react";

type CocktailImageTypes = {
  url: string;
};

export default function CocktailImage({ url }: CocktailImageTypes) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <Image
      src={`${url}`}
      loading={"lazy"}
      alt="Image of cocktail"
      width={3000}
      height={3000}
      onLoad={() => setIsLoading(false)}
      className={`rounded-xl object-fit w-auto h-full ${
        isLoading ? "animate-pulse bg-gray-500 blur-md p-12" : ""
      }`}
    />
  );
}
