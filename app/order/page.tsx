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
      <h1 className="text-3xl font-bold text-center pb-2">Your order</h1>
      <div className="flex flex-row w-full justify-center overflow-auto">
        <ul className="flex flex-col gap-2 w-1/2 h-full">
          {orders.map((order) => (
            <li
              className="flex flex-col bg-white rounded-xl text-black w-full p-4"
              key={order.id}
            >
              <h2>{order.orderTimestamp}</h2>
              <h3>{formatDate(order.time)}</h3>
              <h3>Total: {order.total}</h3>
              <li>
                {order.dishes.map((dish) => (
                  <li key={dish.dish.id}>
                    <p>{dish.dish.name}</p>
                    <p>{dish.dish.price}</p>
                  </li>
                ))}
              </li>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
