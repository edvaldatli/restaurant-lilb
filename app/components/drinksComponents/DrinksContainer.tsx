"use client";
import { useState, useEffect, Suspense } from "react";
import { FaPlus } from "react-icons/fa";
import debounce from "lodash/debounce";
import { CocktailType } from "../../types/types";
import { useOrder } from "@/app/context/OrderContext";
import toast, { Toaster } from "react-hot-toast";
import { useMediaQuery } from "../../utils/mobileFunctions";
import ItemImage from "../ItemImage";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import DishCard from "../ItemCard";

export default function DrinksContainer() {
  const [query, setQuery] = useState<string>("a");
  const [results, setResults] = useState<CocktailType[]>([]);
  const { updateDrinks } = useOrder();

  const isDesktop = useMediaQuery(768);

  const fetchCocktails = async () => {
    if (!query) return setResults([]);
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data: { drinks: CocktailType[] } = await response.json();

      if (!data.drinks) return setResults([]);

      data.drinks.forEach((drink) => {
        drink.price = 1000;
      });

      setResults(data.drinks.splice(0, 10) || []);
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

    return () => {
      debouncedFetch.cancel();
    };
  }, [query]);

  // Skíta lausn, en þetta virkar
  useEffect(() => {
    fetchCocktails();
    setQuery("");
  }, []);

  return (
    <div className="flex flex-col items-center p-6 gap-6 h-full">
      <Toaster />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={"Find your cocktail..."}
        className="text-black w-full md:w-1/2 p-4 rounded-xl text-lg shadow-xl"
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
              <Reorder.Group
                key={cocktail.idDrink}
                values={results}
                onReorder={setResults}
                className="flex flex-col gap-4"
              >
                <DishCard
                  item={cocktail}
                  onAddToCart={() => addDrinks(cocktail)}
                />
              </Reorder.Group>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
