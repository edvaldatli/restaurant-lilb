"use client";
import { useState, useEffect, Suspense } from "react";
import { FaPlus } from "react-icons/fa";
import debounce from "lodash/debounce";
import CocktailImage from "./CocktailImage";
import { CocktailType } from "../../types/types";
import { useOrder } from "@/app/context/OrderContext";
import { update } from "lodash";

export default function DrinksCard() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<CocktailType[]>([]);
  const { updateDrinks } = useOrder();

  const fetchCocktails = async () => {
    if (!query) return setResults([]);
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();
    setResults(data.drinks);
  };

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchCocktails();
    }, 300);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [query]);

  return (
    <div className="flex flex-col items-center p-6 gap-6 h-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={"Find your cocktail..."}
        className="text-black w-1/2 p-4 rounded-xl text-lg shadow-xl"
      />
      <div className="flex flex-col w-full gap-4">
        {results &&
          results.map((cocktail) => (
            <div
              className="flex flex-row gap-4 bg-white rounded-xl p-4 text-black shadow-xl h-32"
              key={cocktail.idDrink}
            >
              <CocktailImage url={cocktail.strDrinkThumb} />
              <div className="flex flex-col w-full">
                <h2 className="font-bold text-xl">{cocktail.strDrink}</h2>
                <p className="font-light text-sm">{cocktail.strCategory}</p>
                <div className="my-auto"></div>
                <div className="flex flex-row justify-end">
                  <button
                    className="flex flex-row items-center gap-2 px-4 py-2 bg-green-700 text-white font-bold rounded-full"
                    onClick={() => updateDrinks({ ...cocktail, price: 1000 })}
                  >
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