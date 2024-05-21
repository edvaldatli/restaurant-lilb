"use client";

import { format } from "date-fns";
import { is } from "date-fns/locale";

export const formatDate = (dateString: string) => {
  return format(new Date(dateString), "PP", { locale: is });
};