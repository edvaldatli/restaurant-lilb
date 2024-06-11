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

export const getNextOpeningQuarter = () => {
  const now = new Date();
  const openingHour = 12;
  const openingMinute = 0;

  const minutes = now.getMinutes();
  const nextQuarter = Math.ceil(minutes / 15) * 15;
  now.setMinutes(nextQuarter, 0, 0);

  const openingTime = new Date();
  openingTime.setHours(openingHour, openingMinute, 0, 0);

  if (now < openingTime) {
    return openingTime;
  }

  return now;
}

export const getNextQuarterHour = () => {
  const now = new Date();
  const openingHour = 12; // Assuming opening time is 12:00 PM
  const openingMinute = 0;
  
  // Set the current time to the next quarter hour
  const minutes = now.getMinutes();
  const nextQuarter = Math.ceil(minutes / 15) * 15;
  now.setMinutes(nextQuarter, 0, 0);

  // Create a new date object for the opening time
  const openingTime = new Date();
  openingTime.setHours(openingHour, openingMinute, 0, 0);

  // If the current time is before the opening time, return the opening time
  if (now < openingTime) {
    return openingTime;
  }

  return now;
};