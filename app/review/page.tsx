"use client";
import { useState } from "react";
import { FaClock } from "react-icons/fa";
import { DatePicker } from "rsuite";
import "rsuite/DatePicker/styles/index.css";
import { useOrder } from "../context/OrderContext";
import { uploadOrder } from "../utils/serverFunctions";

export default function ReviewPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const order = useOrder();
  const date: Date = new Date();
  const submitOrder = (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const date = selectedDate;
    console.log(name, email, date);

    if (!name || !email || !date) {
      alert("Please fill out all fields!");
      return;
    }

    if (
      order.currentOrder?.dishes.length === 0 ||
      order.currentOrder?.drinks.length === 0 ||
      order.currentOrder === undefined
    ) {
      alert("Please select some dishes or drinks before placing an order!");
      return;
    } else {
      uploadOrder(
        order.currentOrder,
        date.toString(),
        new Date().toString(),
        name,
        email,
        order.getCurrentPrice()
      );
    }

    alert("Order placed!");
  };

  const shouldDisableDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset today's time to midnight
    const dateCopy = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    if (dateCopy < today) {
      return true;
    }

    const now = new Date();
    if (dateCopy.getTime() === today.getTime() && now.getHours() >= 22) {
      return true;
    }

    return false;
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full bg-request-orange rounded-xl p-4 gap-4 text-white">
      <div className="flex flex-col h-full w-full lg:w-1/3 gap-2">
        <h2 className="text-2xl font-bold text-center">Complete your order!</h2>
        <form
          action={submitOrder}
          className="flex flex-col justify-around h-full"
        >
          <div>
            <h3 className="text-lg font-bold">Your name:</h3>
            <input
              type="text"
              name="name"
              className="w-full rounded-md p-1 text-zinc-700"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold">Your E-mail:</h3>
            <input
              type="text"
              name="email"
              className="w-full rounded-md p-1 text-zinc-400"
            />
          </div>

          <div>
            <h3 className="text-lg font-bold">Please select date:</h3>
            <div className="flex flex-row gap-4">
              <DatePicker
                name="date"
                format="yyy-MM-dd HH:mm"
                placeholder="Select date"
                shouldDisableDate={shouldDisableDate}
                hideHours={(hour) =>
                  hour < 12 ||
                  hour > 22 ||
                  (selectedDate < new Date()
                    ? hour < date.getHours() + 1
                    : false)
                }
                hideMinutes={(minute) => minute % 15 !== 0}
                onSelect={(date) => setSelectedDate(date)}
                className="w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-700 text-white text-xl font-bold rounded-md p-2 w-full"
          >
            Place order
          </button>
        </form>
      </div>
      <div className="flex flex-col h-full w-2/3 justify-between bg-zinc-600 shadow-xl rounded-xl p-4">
        {order.currentOrder && (
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Your order:</h2>
            <ul className="flex flex-col p-2 gap-2">
              {order.currentOrder.dishes.map(({ dish, quantity }) => (
                <li
                  key={dish.id}
                  className="flex flex-col justify-between bg-white rounded-xl text-black p-2 shadow-lg"
                >
                  <div className="flex flex-row gap-1">
                    <p className="text-xl">{quantity}x</p>
                    <p className="font-bold text-xl">{dish.name}</p>
                    <p className="font-bold ml-auto text-xl">
                      {dish.price * quantity} kr.
                    </p>
                  </div>
                  <div className="flex flex-row justify-between items-start gap-2">
                    <p className="text-xs italic">{dish.ingredients}</p>
                  </div>
                </li>
              ))}
              {order.currentOrder.drinks.map(({ drink, quantity }) => (
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
          <h3 className="text-lg font-bold">
            Total: {order.getCurrentPrice()} kr
          </h3>
        </div>
      </div>
    </div>
  );
}
