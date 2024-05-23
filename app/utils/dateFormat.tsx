"use client";

import { format } from "date-fns";
import { is } from "date-fns/locale";

export const formatDate = (date: Date) => {
  return format(new Date(date), "PP", { locale: is });
};

export const formatBookingDate = (date: Date) => {
  return format(new Date(date), "PPpp", { locale: is });
};
