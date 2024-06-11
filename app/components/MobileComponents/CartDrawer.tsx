import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import OrderItemCard from "../CurrentOrderCard/OrderItemCard";
import {
  removeDish,
  removeDrink,
  toggleCartDrawer,
} from "@/features/order/orderSlice";
import { FaX } from "react-icons/fa6";

export default function CartDrawer() {
  const order = useSelector((state: RootState) => state.order.order);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col h-full p-4 select-none pt-16">
      <div className="flex flex-row justify-between">
        <h2 className="text-lg font-bold">Your order:</h2>
        <button
          className="text-white  rounded-xl p-2"
          onClick={() => dispatch(toggleCartDrawer())}
        >
          <FaX />
        </button>
      </div>

      <ul className="flex flex-col justify-start p-2 gap-2 overflow-y-visible overflow-x-hidden h-full">
        {order.meals.length === 0 && order.drinks.length === 0 ? (
          <p className="text-center font-bold text-2xl my-auto">Cart empty</p>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </div>
  );
}
