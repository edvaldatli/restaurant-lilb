"use client";
import { useEffect, useState } from "react";
import {
  OrderType,
  getAllOrdersByEmail,
  getLatestOrderByEmail,
  getOrderById,
} from "../utils/serverFunctions";

import { formatDate } from "../utils/dateFormat";

import "rsuite/Loader/styles/index.css";
import "rsuite/Placeholder/styles/index.css";
import { Loader } from "rsuite";

type Props = {
  orderEmail: string;
};

export default function OrderPage({ orderEmail }: Props) {
  const [orders, setOrders] = useState<OrderType[]>();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orders = await getAllOrdersByEmail("ewq@ewq.is");
        console.log(orders);
        setOrders(orders);
      } catch (e) {
        console.error("Error fetching the latest order", e);
      }
    };

    fetchOrder();
  }, [orderEmail]);

  if (orders === undefined || orders.length === 0) {
    return (
      <div className="h-full w-full bg-request-orange rounded-xl text-white p-20">
        <Loader size="md" content="loading..." backdrop inverse vertical />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-request-orange w-full h-full rounded-xl p-4 text-white">
      <h1 className="text-3xl font-bold text-center">Your order</h1>
      <div className="flex flex-row w-2/3 justify-center">
        <ul className="flex flex-col">
          {orders.map((order) => (
            <li className="flex flex-col bg-white rounded-xl text-black">
              <h2>{order.orderTimestamp}</h2>
              <h3>{formatDate(order.time)}</h3>
              <h3>{order.total}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
