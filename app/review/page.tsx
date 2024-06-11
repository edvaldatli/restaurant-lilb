"use client";
import { useEffect, useState } from "react";
import { CustomProvider, DatePicker, Loader } from "rsuite";
import "rsuite/DatePicker/styles/index.css";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "../context/LocalStorage";
import { uploadOrder } from "../utils/serverFunctions";
import { motion } from "framer-motion";
import is_IS from "../locales/is_IS";
import { getNextOpeningQuarter, getNextQuarterHour } from "../utils/dateFormat";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
const OrderCard = dynamic(() => import("../components/OrderCard"));
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { cancelOrder } from "@/features/order/orderSlice";
import validation from "../utils/validation";
import dynamic from "next/dynamic";

export default function ReviewPage() {
  const localStorage = useLocalStorage();
  const state = useSelector((state: RootState) => state);
  const order = useSelector((state: RootState) => state.order.order);
  const currentPrice = useSelector(
    (state: RootState) => state.order.order.totalPrice
  );
  const dispatch = useDispatch();

  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(
    getNextOpeningQuarter()
  );
  const [formValues, setFormValues] = useState({
    name: {
      value: localStorage.name || "",
      isValid: localStorage.name ? true : false,
    },
    email: {
      value: localStorage.email || "",
      isValid: localStorage.email ? true : false,
    },
    date: {
      value: getNextQuarterHour(),
      isValid: validation.dateValidation(getNextQuarterHour()),
    },
    isValid: false,
    errorText: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const date: Date = new Date();

  const validateForm = (
    name: string,
    email: string,
    date: Date,
    state: RootState
  ): { isValid: boolean; errorText: string } => {
    if (!validation.emailValidation(email))
      return { isValid: false, errorText: "Invalid email" };
    if (!validation.nameValidation(name))
      return { isValid: false, errorText: "Invalid name" };
    if (!validation.dateValidation(date))
      return { isValid: false, errorText: "Invalid date" };
    if (!validation.orderValidation(state))
      return { isValid: false, errorText: "Invalid order" };
    return { isValid: true, errorText: "" };
  };

  const validateAndSetFormState = (
    name: string,
    email: string,
    date: Date,
    state: RootState
  ) => {
    const { isValid, errorText } = validateForm(name, email, date, state);
    setFormValues({
      ...formValues,
      name: { value: name, isValid: validation.nameValidation(name) },
      email: { value: email, isValid: validation.emailValidation(email) },
      date: { value: date, isValid: validation.dateValidation(date) },
      isValid: isValid,
      errorText: errorText,
    });
  };

  const handleBlur = () => {
    validateAndSetFormState(
      formValues.name.value,
      formValues.email.value,
      selectedDate,
      state
    );
    console.log(formValues);
  };

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  useEffect(() => {
    handleBlur();
  }, []);

  const submitOrder = async (formData: FormData) => {
    setLoading(true);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const date = formValues.date.value;

    if (!formValues.isValid) {
      alert(
        "Please fill out all fields correctly before submitting the order!"
      );
      setLoading(false);
      return;
    }

    const result = await uploadOrder(
      order,
      new Date(),
      date,
      name,
      email,
      currentPrice,
      order.id
    );

    localStorage.setNameLS(name);
    localStorage.setEmailLS(email);
    dispatch(cancelOrder());
    router.push(`/order/${email}/${result?.id}`);
    setLoading(false);
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
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    name: {
                      value: e.target.value,
                      isValid: validation.nameValidation(e.target.value),
                    },
                  })
                }
                onBlur={() => handleBlur()}
              />
              <div className="flex flex-row w-full justify-end">
                {formValues.name === undefined ? (
                  <></>
                ) : formValues.name.isValid ? (
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
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    email: {
                      value: e.target.value,
                      isValid: validation.emailValidation(e.target.value),
                    },
                  });
                }}
                onBlur={() => handleBlur()}
              />
              <div className="flex flex-row w-full justify-end">
                {formValues.email === undefined ? (
                  <div></div>
                ) : formValues.email.isValid ? (
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
                    onBlur={() => handleBlur()}
                    className="w-full"
                  />
                </CustomProvider>
              </div>
            </div>

            <button
              type="submit"
              disabled={formValues.isValid ? false : true}
              className="flex flex-row items-center justify-center bg-green-700 text-white text-xl font-bold rounded-md  gap-2 p-2 w-full mt-auto h-12 md:h-24 hover:bg-green-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader size="sm" />
              ) : formValues.isValid ? (
                "Place order"
              ) : (
                formValues.errorText
              )}
            </button>
          </form>
        </div>
        <OrderCard />
      </motion.div>
    );
  }
}
