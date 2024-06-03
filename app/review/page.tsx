"use client";
import { useEffect, useState } from "react";
import { CustomProvider, DatePicker, Loader } from "rsuite";
import "rsuite/DatePicker/styles/index.css";
import { useOrder } from "../context/OrderContext";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "../context/LocalStorage";
import { uploadOrder } from "../utils/serverFunctions";
import { motion } from "framer-motion";
import is_IS from "../locales/is_IS";
import { getNextQuarterHour } from "../utils/dateFormat";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import OrderCard from "../components/orderCard";
import { error } from "console";

export default function ReviewPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(getNextQuarterHour());
  const [loading, setLoading] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>();
  const [nameValid, setNameValid] = useState<boolean>();
  const [dateValid, setDateValid] = useState<boolean>();
  const [orderValid, setOrderValid] = useState<boolean>();
  const [errorText, setErrorText] = useState<string>("");
  const localStorage = useLocalStorage();
  const order = useOrder();
  const date: Date = new Date();

  const isFormValid =
    emailValid !== undefined &&
    nameValid !== undefined &&
    orderValid !== undefined &&
    dateValid !== undefined &&
    emailValid &&
    nameValid &&
    orderValid &&
    dateValid;

  const emailValidation = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = emailRegex.test(email);
    if (!result) {
      setErrorText("Invalid email");
    }
    return result;
  };

  const nameValidation = (name: string) => {
    const result = name.length > 0;
    if (!result) {
      setErrorText("Invalid name");
    }
    return result;
  };

  const dateValidation = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset today's time to midnight
    const dateCopy = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    if (dateCopy < today) {
      setErrorText("Invalid date");
      return false;
    }

    const now = new Date();
    if (dateCopy.getTime() === today.getTime() && now.getHours() >= 22) {
      setErrorText("Invalid date");
      return false;
    }

    setErrorText("");
    return true;
  };

  const shouldDisableDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
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

  const orderValidation = () => {
    const currentOrder = order.currentOrder;
    const result =
      (currentOrder &&
        currentOrder.meals.length > 0 &&
        currentOrder.drinks.length > 0) ||
      false;
    if (!result) {
      setErrorText("Invalid order");
    }
    return result;
  };

  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setNameValid(nameValidation(e.target.value));
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmailValid(emailValidation(e.target.value));
  };

  const handleDateBlur = (date: Date) => {
    setDateValid(dateValidation(date));
  };

  const validateOnMount = () => {
    if (localStorage.email) {
      setEmailValid(emailValidation(localStorage.email));
    }
    if (localStorage.name) {
      setNameValid(nameValidation(localStorage.name));
    }
    setDateValid(dateValidation(selectedDate));
    setOrderValid(orderValidation());
  };

  useEffect(() => {
    validateOnMount();
  }, []);

  const submitOrder = async (formData: FormData) => {
    setLoading(true);
    const name = formData.get("name");
    const email = formData.get("email");
    const date = selectedDate;

    if (!name || !email) {
      alert("Please fill out all fields before submitting the order!");
      setLoading(false);
      return;
    }

    if (
      order.currentOrder?.meals.length === 0 ||
      order.currentOrder?.drinks.length === 0 ||
      order.currentOrder === undefined
    ) {
      alert("Please select some dishes or drinks before placing an order!");
      router.push("/dishes");
      return;
    } else {
      const result = await uploadOrder(
        order.currentOrder,
        new Date(),
        date,
        name.toString(),
        email.toString(),
        order.getCurrentPrice(),
        order.currentOrder.id
      );
      localStorage.setNameLS(name.toString());
      localStorage.setEmailLS(email.toString());
      order.cancelOrder();
      router.push(`/order/${email}/${result?.id}`);
    }
    setLoading(false);
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
                onBlur={(e) => handleNameBlur(e)}
              />
              <div className="flex flex-row w-full justify-end">
                {nameValid === undefined ? (
                  <></>
                ) : nameValid ? (
                  <FaCircleCheck className="relative -top-7 right-2 text-green-500 text-lg" />
                ) : (
                  <FaCircleXmark className="relative -top-7 right-2 text-red-500 text-lg" />
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold">Your E-mail:</h3>
              <input
                type="text"
                name="email"
                placeholder="Your E-mail"
                defaultValue={localStorage.email || ""}
                className="w-full rounded-md py-2 px-3 text-sm text-zinc-700 hover:border-blue-500 transition-colors border focus:border-blue-500"
                onBlur={(e) => handleEmailBlur(e)}
              />
              <div className="flex flex-row w-full justify-end">
                {emailValid === undefined ? (
                  <div></div>
                ) : emailValid ? (
                  <FaCircleCheck className="relative -top-7 right-2 text-green-500 text-lg" />
                ) : (
                  <FaCircleXmark className="relative -top-7 right-2 text-red-500 text-lg" />
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold">Please select date:</h3>
              <div className="flex flex-row gap-4">
                <CustomProvider locale={is_IS}>
                  <DatePicker
                    name="date"
                    placeholder="Select date"
                    shouldDisableDate={shouldDisableDate}
                    onBlur={() => handleDateBlur(selectedDate)}
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
              disabled={isFormValid ? false : true}
              className="bg-green-700 text-white text-xl font-bold rounded-md p-2 w-full mt-auto h-12 md:h-24 hover:bg-green-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isFormValid ? "Place order" : errorText}
            </button>
          </form>
        </div>
        <OrderCard />
      </motion.div>
    );
  }
}
