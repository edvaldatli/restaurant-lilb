"use client";
import { useEffect, useState } from "react";
import { OrderType, getAllOrdersByEmail } from "../utils/serverFunctions";

import { formatDate } from "../utils/dateFormat";

import "rsuite/Loader/styles/index.css";
import "rsuite/Placeholder/styles/index.css";
import { Loader } from "rsuite";

type Props = {
  orderEmail: string;
};

export default function OrderPage({ orderEmail }: Props) {
  const [orders, setOrders] = useState<OrderType[]>();
  const [selectedOrder, setSelcectedOrder] = useState<OrderType>();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orders = await getAllOrdersByEmail("ewq@ewq.is");
        setOrders(orders);
        setSelcectedOrder(orders[0]);
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
    <div className="flex flex-col bg-request-orange w-full h-full rounded-xl text-white">
      <div className="flex flex-row w-full justify-start">
        <ul className="flex flex-col w-1/4 h-full rounded-xl">
          {orders.map((order) => (
            <li
              className={`"flex flex-col bg-white text-black w-full p-4 border-b-2 hover:bg-zinc-200 transition-colors active:bg-green-50 ${
                selectedOrder?.id === order.id ? "bg-black" : ""
              }"`}
              key={order.id}
              onClick={() => setSelcectedOrder(order)}
            >
              <h2>{order.orderTimestamp}</h2>
              <h3>{formatDate(order.time)}</h3>
              <h3>Total: {order.total}</h3>
            </li>
          ))}
        </ul>
        <ul className="overflow-auto">
          {selectedOrder && (
            <li className="p-4">
              <h2>Pöntun: {formatDate(selectedOrder.orderTimestamp)}</h2>
              <h3>Bókunar tími: {formatDate(selectedOrder.time)}</h3>
              <h3>Total: {selectedOrder.total} kr.</h3>
              <ul>
                {selectedOrder.dishes.map((item) => (
                  <li key={item.dish.id} className="">
                    <h4>{item.dish.name}</h4>
                    <p>{item.dish.ingredients}</p>
                    <p>{item.dish.price} kr.</p>
                  </li>
                ))}
                {selectedOrder.drinks.map((item) => (
                  <li
                    key={item.drink.idDrink}
                    className="flex flex-row gap-4 bg-white rounded-xl p-4 text-black h-40"
                  >
                    <img
                      src={item.drink.strDrinkThumb}
                      alt="Image of drink"
                      className="rounded-xl"
                    />
                    <div>
                      <h4>{item.drink.strDrink}</h4>
                      <p>{item.drink.strCategory}</p>
                      <p>{item.drink.price} kr.</p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
