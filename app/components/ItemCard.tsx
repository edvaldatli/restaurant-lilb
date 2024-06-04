import { MealType, CocktailType } from "@/app/types/types";
import ItemImage from "./ItemImage";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

type DishCardProps = {
  item: MealType | CocktailType;
  onAddToCart: (item: MealType | CocktailType) => void;
};

export default function DishCard({ item, onAddToCart }: DishCardProps) {
  const isMeal = (item: MealType | CocktailType): item is MealType => {
    return (item as MealType).strMealThumb !== undefined;
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateX: 20 }}
      className="flex flex-row gap-4 bg-white rounded-xl p-4 text-black shadow-xl h-20 md:h-32 w-full"
      key={isMeal(item) ? item.idMeal : item.idDrink}
    >
      <ItemImage url={isMeal(item) ? item.strMealThumb : item.strDrinkThumb} />
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl line-clamp-1">
            {isMeal(item) ? item.strMeal : item.strDrink}
          </h2>
          <p className="font-light text-sm">{item.strCategory}</p>
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-bold text-xl text-right">{item.price} kr.</p>
          <button
            className="flex flex-row items-center gap-2 px-4 py-2 bg-green-700 text-white font-bold rounded-full h-8 transition-colors hover:bg-green-500"
            onClick={() => onAddToCart(item)}
          >
            Add
            <FaPlus />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
