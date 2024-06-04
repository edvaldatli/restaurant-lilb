import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { getCurrentPrice, selectOrder } from "@/features/order/selectors";

export default function OrderCard() {
  const order = useSelector((state: RootState) => selectOrder(state));
  const currentPrice = useSelector(getCurrentPrice);

  return (
    <div className="flex flex-col w-full h-full justify-between bg-zinc-600 shadow-xl rounded-xl p-4">
      {order && (
        <div className="flex flex-col gap-2 overflow-auto">
          <h2 className="text-2xl font-bold">Your order:</h2>
          <ul className="flex flex-col p-2 gap-2">
            {order.meals.map(({ meal, quantity }) => (
              <li
                key={meal.idMeal}
                className="flex flex-col justify-between bg-white rounded-xl text-black p-2 shadow-lg"
              >
                <div className="flex flex-row gap-1">
                  <p className="text-xl">{quantity}x</p>
                  <p className="font-bold text-xl">{meal.strMeal}</p>
                  <p className="font-bold ml-auto text-xl">
                    {meal.price * quantity} kr.
                  </p>
                </div>
                <div className="flex flex-row justify-between items-start gap-2">
                  <p className="text-xs italic">{meal.strCategory}</p>
                </div>
              </li>
            ))}
            {order.drinks.map(({ drink, quantity }) => (
              <li
                key={drink.idDrink}
                className="flex flex-col justify-between bg-white rounded-xl text-black p-2 shadow-lg"
              >
                <div className="flex flex-row gap-1">
                  <p className="text-xl">{quantity}x</p>
                  <p className="font-bold text-xl">{drink.strDrink}</p>
                  <p className="font-bold ml-auto text-xl">
                    {drink.price * quantity} kr.
                  </p>
                </div>
                <div className="flex flex-row justify-between items-start gap-2">
                  <p className="text-xs italic">{drink.strCategory}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-row items-center p-4 bg-zinc-500 rounded-xl">
        <h3 className="text-lg font-bold">Total: {currentPrice} kr</h3>
      </div>
    </div>
  );
}
