"use client";
import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { DatePicker } from "rsuite";
import "rsuite/DatePicker/styles/index.css";

export default function ReviewPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const date: Date = new Date();
  const submitOrder = (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const date = formData.get("date");
    const time = formData.get("time");

    if (!name || !email || !date || !time) {
      alert("Please fill out all fields!");
      return;
    }
    alert("Order placed!");
  };

  const shouldDisableDate = () => {
    const today = new Date();
    // Create a date object for today with time set to 00:00:00
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    // Create a date object for the given date with time set to 00:00:00
    const dateStart = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    // Check if the given date is before today
    if (dateStart < todayStart) {
      return true;
    }
    // Check if today and after 22:00
    if (
      dateStart.getTime() === todayStart.getTime() &&
      today.getHours() >= 22
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full bg-request-orange rounded-xl p-4 gap-4 text-white">
      <div className="flex flex-col h-full w-full lg:w-1/3 gap-2">
        <h2 className="text-2xl font-bold text-center">Complete your order!</h2>
        <form action={submitOrder}>
          <h3 className="text-lg font-bold">Your name:</h3>
          <input
            type="text"
            name="name"
            className="w-full rounded-md p-1 text-zinc-700"
          />
          <h3 className="text-lg font-bold">Your E-mail:</h3>
          <input
            type="text"
            name="email"
            className="w-full rounded-md p-1 text-zinc-400"
          />
          <h3 className="text-lg font-bold">Please select date:</h3>
          <div className="flex flex-row gap-4">
            <DatePicker
              name="date"
              format="yyy-MM-dd HH:mm"
              defaultValue={selectedDate}
              shouldDisableDate={shouldDisableDate}
              hideHours={(hour) =>
                hour < 12 ||
                hour > 22 ||
                (selectedDate < new Date() ? hour < date.getHours() + 1 : false)
              }
              hideMinutes={(minute) => minute % 15 !== 0}
              onSelect={(date) => setSelectedDate(date)}
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-white text-request-orange rounded-md p-2"
          >
            Place order
          </button>
        </form>
      </div>
      <div className="flex flex-col h-full w-2/3 bg-white"></div>
    </div>
  );
}
