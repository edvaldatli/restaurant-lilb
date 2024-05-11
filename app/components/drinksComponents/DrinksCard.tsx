"use client";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import debounce from "lodash/debounce";
import Image from "next/image";

type CocktailType = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
};

type RandomType = {
  min: number;
  max: number;
  increment: number;
};

export default function DrinksCard() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CocktailType[]>([]);

  const fetchCocktails = async () => {
    if (!query) return setResults([]);
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();
    setResults(data.drinks);
  };

  const generateRandomPrice = ({ min, max, increment }: RandomType) => {
    const numSteps = (max - min) / increment + 1;
    const step = Math.floor(Math.random() * numSteps);

    return min + step * increment;
  };

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchCocktails();
    }, 300);

    // Call the debounced function
    debouncedFetch();
    console.log(results);
    // Cleanup function to cancel the debounce when component unmounts or query changes
    return () => {
      debouncedFetch.cancel();
    };
  }, [query]);

  return (
    <div className="flex flex-col items-center p-6 gap-6 overflow-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search cocktails..."
        className="text-black w-1/2 p-4 rounded-xl text-lg shadow-xl"
      />
      <div className="flex flex-col w-full gap-4">
        {results &&
          results.map((cocktail) => (
            <div
              className="flex flex-row gap-4 bg-white rounded-xl p-4 text-black shadow-xl"
              key={cocktail.idDrink}
            >
              {cocktail.strDrinkThumb && (
                <Image
                  src={`${cocktail.strDrinkThumb}`}
                  alt="Image of cocktail"
                  width={3000}
                  height={3000}
                  className="rounded-xl w-1/6"
                ></Image>
              )}
              <div className="flex flex-col w-full">
                <h2 className="font-bold text-3xl">{cocktail.strDrink}</h2>
                <p className="font-light text-sm">{cocktail.strCategory}</p>
                <div className="my-auto"></div>
                <div className="flex flex-row justify-end">
                  <button className="flex flex-row items-center gap-2 px-4 py-2 bg-green-700 text-white font-bold rounded-full">
                    Add
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
