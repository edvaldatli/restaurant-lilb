"use client";
import { AnimatePresence } from "framer-motion";
import { FaInfo } from "react-icons/fa";
import RoutingButton from "../RoutingButton";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import OrderItemCard from "./OrderItemCard";
import { FaX } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import {
  cancelOrder,
  removeDish,
  removeDrink,
} from "@/features/order/orderSlice";
import { RootState } from "@/app/store";

export default function CurrentOrderCard() {
  const order = useSelector((state: RootState) => state.order.order);
  const totalPrice = useSelector(
    (state: RootState) => state.order.order.totalPrice
  );

  const dispatch = useDispatch();
  const currentPath = usePathname();

  useEffect(() => {
    console.log("rendered");
  });

  return (
    <div className="flex flex-col h-full p-4 select-none">
      {order.id && (
        <h2 className="flex flex-row items-center gap-4 bg-blue-500 rounded-xl p-4 font-bold my-2">
          <FaInfo className="text-white text-lg" />
          <span>You are currently editing an existing order</span>
        </h2>
      )}
      <h2 className="text-lg font-bold">Your order:</h2>
      <ul className="flex flex-col justify-start p-2 gap-2 overflow-y-visible overflow-x-hidden h-full">
        {order.meals.length === 0 && order.drinks.length === 0 ? (
          <p className="text-center font-bold text-2xl my-auto">Cart empty</p>
        ) : (
          <AnimatePresence>
            <p className="font-semibold" key={"meals-p"}>
              Meals:
            </p>
            {order.meals.map(({ meal, quantity }) => (
              <OrderItemCard
                key={meal.idMeal}
                item={meal}
                quantity={quantity}
                removeItem={() => dispatch(removeDish(meal))}
              />
            ))}
            <p className="font-semibold" key={"drinks-p"}>
              Drinks:
            </p>
            {order.drinks.map(({ drink, quantity }) => (
              <OrderItemCard
                key={drink.idDrink}
                item={drink}
                quantity={quantity}
                removeItem={() => dispatch(removeDrink(drink))}
              />
            ))}
          </AnimatePresence>
        )}
      </ul>
      <div className="flex flex-col mt-auto gap-2">
        <h3 className="ml-auto text-lg font-bold">Total: {totalPrice} kr.</h3>
        <RoutingButton
          text="Next"
          className="flex flex-row justify-center items-center bg-green-700 p-2 rounded-xl text-xl font-semibold hover:bg-green-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          type="forward"
          disabled={
            (order.meals.length === 0 && currentPath === "/dishes") ||
            ((order.drinks.length === 0 || order.meals.length === 0) &&
              currentPath === "/drinks")
          }
        />
        <button
          className="flex flex-row justify-center items-center bg-red-600 p-2 rounded-xl text-xl font-semibold gap-2 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors hover:bg-red-500"
          onClick={() => dispatch(cancelOrder())}
          disabled={order.meals.length === 0 && order.drinks.length === 0}
        >
          Clear order <FaX />
        </button>
      </div>
    </div>
  );
}
