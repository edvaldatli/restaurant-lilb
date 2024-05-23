"use client";
import { useState } from "react";
import { CustomProvider, DatePicker, Loader } from "rsuite";
import "rsuite/DatePicker/styles/index.css";
import { useOrder } from "../context/OrderContext";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "../context/LocalStorage";
import { uploadOrder } from "../utils/serverFunctions";
import { motion } from "framer-motion";
import is_IS from "../locales/is_IS";
import { getNextQuarterHour } from "../utils/dateFormat";

export default function ReviewPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(getNextQuarterHour());
  const [loading, setLoading] = useState<boolean>(false);
  const localStorage = useLocalStorage();
  const order = useOrder();
  const date: Date = new Date();
  const submitOrder = async (formData: FormData) => {
    setLoading(true);
    const name = formData.get("name");
    const email = formData.get("email");
    const date = selectedDate;

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
      await uploadOrder(
        order.currentOrder,
        new Date(),
        date,
        name.toString(),
        email.toString(),
        order.getCurrentPrice()
      );
      localStorage.setNameLS(name.toString());
      localStorage.setEmailLS(email.toString());
      order.removeCurrentOrder();
      router.push(`/order/${email}`);
    }
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
  if (loading) {
    return (
      <motion.div
        className="h-full w-full bg-request-orange rounded-xl text-white p-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Loader size="md" content="loading..." backdrop inverse vertical />
      </motion.div>
    );
  } else {
    return (
      <motion.div
        className="flex flex-col lg:flex-row w-full h-full bg-request-orange rounded-xl p-4 gap-4 text-white"
        initial={{ opacity: 0, translateX: -80 }}
        animate={{ opacity: 1, translateX: 0 }}
      >
        <div className="flex flex-col h-full w-full lg:w-1/3 gap-2">
          <h2 className="text-2xl font-bold text-center">
            Complete your order!
          </h2>
          <form
            action={submitOrder}
            className="flex flex-col justify-start h-full gap-8"
          >
            <div>
              <h3 className="text-lg font-bold">Your name:</h3>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                defaultValue={localStorage.name || ""}
                className="w-full rounded-md py-2 px-3 text-sm text-zinc-700 hover:border-blue-500 transition-colors border focus:border-blue-500"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold">Your E-mail:</h3>
              <input
                type="text"
                name="email"
                placeholder="Your E-mail"
                defaultValue={localStorage.email || ""}
                className="w-full rounded-md py-2 px-3 text-sm text-zinc-700 hover:border-blue-500 transition-colors border focus:border-blue-500"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold">Please select date:</h3>
              <div className="flex flex-row gap-4">
                <CustomProvider locale={is_IS}>
                  <DatePicker
                    name="date"
                    placeholder="Select date"
                    shouldDisableDate={shouldDisableDate}
                    format="dd/MM/yyyy HH:mm"
                    defaultValue={selectedDate}
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
                </CustomProvider>
              </div>
            </div>

            <button
              type="submit"
              className="bg-green-700 text-white text-xl font-bold rounded-md p-2 w-full mt-auto h-24 hover:bg-green-500 transition-colors"
            >
              Place order
            </button>
          </form>
        </div>
        <div className="flex flex-col w-full h-full justify-between bg-zinc-600 shadow-xl rounded-xl p-4">
          {order.currentOrder && (
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Your order:</h2>
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
      </motion.div>
    );
  }
}
