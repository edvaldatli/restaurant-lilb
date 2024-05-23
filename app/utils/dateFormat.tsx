"use client";

import { format } from "date-fns";
import { is } from "date-fns/locale";

export const formatDate = (date: Date) => {
  return format(new Date(date), "PP", { locale: is });
};

export const formatBookingDate = (date: Date) => {
  return format(new Date(date), "PPpp", { locale: is });
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
