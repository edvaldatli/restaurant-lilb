import { CocktailType, MealType } from "@/app/types/types";
import { motion } from "framer-motion";
import React from "react";
import { FaTrash } from "react-icons/fa";

type OrderItemType = {
  item: MealType | CocktailType;
  quantity: number;
  removeItem: () => void;
};

const isMealType = (item: MealType | CocktailType): item is MealType => {
  return (item as MealType).idMeal !== undefined;
};

const isCocktailType = (
  item: MealType | CocktailType
): item is CocktailType => {
  return (item as CocktailType).idDrink !== undefined;
};

const OrderItemCard = React.memo(
  ({ item, quantity, removeItem }: OrderItemType) => (
    <motion.li
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateX: 20 }}
      className="flex flex-col justify-between bg-white rounded-xl text-black p-2 shadow-lg"
      key={
        isMealType(item)
          ? item.idMeal
          : isCocktailType(item)
          ? item.idDrink
          : undefined
      }
    >
      <div className="flex flex-row gap-1">
        <p>{quantity}x</p>
        <p className="font-bold line-clamp-2">
          {isMealType(item) ? item.strMeal : item.strDrink}
        </p>
        <p className="font-bold ml-auto text-nowrap">
          {item.price * quantity} kr.
        </p>
      </div>
      <div className="flex flex-row justify-between items-start gap-2">
        <p className="text-xs">{item.strCategory}</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          className="text-red-600 select-all"
          onClick={removeItem}
        >
          <FaTrash />
        </motion.button>
      </div>
    </motion.li>
  )
);

OrderItemCard.displayName = "OrderItemCard";

export default OrderItemCard;
