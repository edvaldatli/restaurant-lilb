"use client";
import { useState, useEffect, Suspense } from "react";
import { FaPlus } from "react-icons/fa";
import debounce from "lodash/debounce";
import CocktailImage from "./CocktailImage";
import { CocktailType } from "../../types/types";
import { useOrder } from "@/app/context/OrderContext";
import toast, { Toaster } from "react-hot-toast";
import { useMediaQuery } from "../../utils/mobileFunctions";

export default function DrinksCard() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<CocktailType[]>([]);
  const { updateDrinks } = useOrder();

  const isDesktop = useMediaQuery(768);

  const fetchCocktails = async () => {
    if (!query) return setResults([]);
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      setResults(data.drinks || []);
    } catch (error) {
      console.error("Error fetching cocktails:", error);
      setResults([]);
    }
  };

  const addDrinks = (drink: CocktailType) => {
    if (!isDesktop) toast.success(`🍸 ${drink.strDrink} added to cart`);
    updateDrinks({ ...drink, price: 1000 });
  };

  useEffect(() => {
    const debouncedFetch = debounce(fetchCocktails, 300);
    if (query) debouncedFetch();

    console.log("Query:", query);
    console.log(results);
    return () => {
      debouncedFetch.cancel();
    };
  }, [query]);

  return (
    <div className="flex flex-col items-center p-6 gap-6 h-full">
      <Toaster />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={"Find your cocktail..."}
        className="text-black w-1/2 p-4 rounded-xl text-lg shadow-xl"
      />
      <div className="flex flex-col w-full gap-4 pb-4">
        {results === null ? (
          <>
            <p className="mx-auto my-auto h-full text-xl font-bold w-1/2 text-center">
              Oh no, we did not find any cocktails with that name
            </p>
            <p className="mx-auto my-auto h-full text-center text-4xl">😢</p>
          </>
        ) : (
          <>
            {results.map((cocktail: CocktailType) => (
              <div
                className="flex flex-row gap-4 bg-white rounded-xl p-4 text-black shadow-xl h-20 md:h-32"
                key={cocktail.idDrink}
              >
                <CocktailImage url={cocktail.strDrinkThumb} />
                <div className="flex flex-row justify-between w-full">
                  <div className="flex flex-col">
                    <h2 className="font-bold text-xl">{cocktail.strDrink}</h2>
                    <p className="font-light text-sm">{cocktail.strCategory}</p>
                  </div>
                  <div className="flex flex-col justify-end">
                    <button
                      className="flex flex-row items-center gap-2 px-4 py-2 bg-green-700 text-white font-bold rounded-full h-8 transition-colors hover:bg-green-500"
                      onClick={() => addDrinks(cocktail)}
                    >
                      Add
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
