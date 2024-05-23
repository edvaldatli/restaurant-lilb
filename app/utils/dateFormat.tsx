"use client";

import { format } from "date-fns";
import { is } from "date-fns/locale";

const customBookingFormat = "EEEE, d. MMMM 'kl.' HH:mm";
const customOrderDateFormat = "d. MMMM";

export const formatDate = (date: Date) => {
  return format(new Date(date), customOrderDateFormat, { locale: is });
};

export const formatBookingDate = (date: Date) => {
  return format(new Date(date), customBookingFormat, { locale: is });
};

export const checkBookingHandled = (bookingTime: Date) => {
  const now = new Date();
  const time = new Date(bookingTime);
  return time < now;
};

export const getNextQuarterHour = () => {
  const now = new Date();
  const minutes = now.getMinutes();
  const remainder = 15 - (minutes % 15);
  if (remainder === 15) {
    return now;
  }
  now.setMinutes(minutes + remainder);
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now;
};
