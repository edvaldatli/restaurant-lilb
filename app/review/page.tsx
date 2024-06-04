"use client";
import { useEffect, useState } from "react";
import { CustomProvider, DatePicker, Loader } from "rsuite";
import "rsuite/DatePicker/styles/index.css";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "../context/LocalStorage";
import { uploadOrder } from "../utils/serverFunctions";
import { motion } from "framer-motion";
import is_IS from "../locales/is_IS";
import { getNextQuarterHour } from "../utils/dateFormat";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import OrderCard from "../components/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { getCurrentPrice, selectOrder } from "@/features/order/selectors";
import { cancelOrder } from "@/features/order/orderSlice";

export default function ReviewPage() {
  const order = useSelector((state: RootState) => selectOrder(state));
  const dispatch = useDispatch();
  const currentPrice = useSelector(getCurrentPrice);

  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(getNextQuarterHour());
  const [formValidation, setFormValidation] = useState<{
    email: boolean;
    name: boolean;
    date: boolean;
    order: boolean;
    errorText: string;
  }>({
    email: false,
    name: false,
    date: false,
    order: false,
    errorText: "error",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const localStorage = useLocalStorage();
  const date: Date = new Date();

  const isFormValid =
    formValidation.email &&
    formValidation.name &&
    formValidation.date &&
    formValidation.order;

  const emailValidation = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = emailRegex.test(email);
    setFormValidation((prev) => ({
      ...prev,
      email: result,
      errorText: result ? "" : "Invalid email",
    }));
    console.log(result);
    return result;
  };

  const nameValidation = (name: string) => {
    const result = name.length > 0;
    setFormValidation((prev) => ({
      ...prev,
      name: result,
      errorText: result! ? "" : "Invalid name",
    }));
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

    const isValid = !(
      dateCopy < today ||
      (dateCopy.getTime() === today.getTime() && new Date().getHours() >= 22)
    );

    setFormValidation((prev) => ({
      ...prev,
      date: isValid,
      errorText: isValid ? "" : "Invalid date",
    }));
    return isValid;
  };

  const shouldDisableDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateCopy = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    return (
      dateCopy < today ||
      (dateCopy.getTime() === today.getTime() && new Date().getHours() >= 22)
    );
  };

  const orderValidation = () => {
    const isValid = order && order.meals.length > 0 && order.drinks.length > 0;
    setFormValidation((prev) => ({
      ...prev,
      order: isValid,
      errorText: isValid ? "" : "Invalid order",
    }));
    return isValid;
  };

  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    nameValidation(e.target.value);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    emailValidation(e.target.value);
  };

  const handleDateBlur = (date: Date) => {
    dateValidation(date);
  };

  const validateOnMount = () => {
    const initialEmail = localStorage.email;
    const initialName = localStorage.name;
    const initialDate = selectedDate;

    const emailIsValid = initialEmail ? emailValidation(initialEmail) : false;
    const nameIsValid = initialName ? nameValidation(initialName) : false;
    const dateIsValid = dateValidation(initialDate);
    const orderIsValid = orderValidation();

    setFormValidation({
      email: emailIsValid,
      name: nameIsValid,
      date: dateIsValid,
      order: orderIsValid,
      errorText: "",
    });
  };

  useEffect(() => {
    validateOnMount();
  }, []);

  useEffect(() => {
    console.log(formValidation);
  }, [formValidation]);

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
      order.meals.length === 0 ||
      order.drinks.length === 0 ||
      order === undefined
    ) {
      alert("Please select some dishes or drinks before placing an order!");
      router.push("/dishes");
      return;
    } else {
      const result = await uploadOrder(
        order,
        new Date(),
        date,
        name.toString(),
        email.toString(),
        currentPrice,
        order.id
      );
      localStorage.setNameLS(name.toString());
      localStorage.setEmailLS(email.toString());
      dispatch(cancelOrder());
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
                {formValidation.name === undefined ? (
                  <></>
                ) : formValidation.name ? (
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
                {formValidation.email === undefined ? (
                  <div></div>
                ) : formValidation.email ? (
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
                    value={selectedDate}
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
              {isFormValid ? "Place order" : formValidation.errorText}
            </button>
          </form>
        </div>
        <OrderCard />
      </motion.div>
    );
  }
}
