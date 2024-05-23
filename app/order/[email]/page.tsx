"use client";
import { useEffect, useState } from "react";
import { OrderType, getAllOrdersByEmail } from "../../utils/serverFunctions";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";

import { formatDate, formatBookingDate } from "../../utils/dateFormat";

import "rsuite/Loader/styles/index.css";
import "rsuite/Placeholder/styles/index.css";
import { Loader } from "rsuite";
import { motion } from "framer-motion";
import RoutingButton from "@/app/components/RoutingButton";

export default function OrderPage(props: { query: { email: string } }) {
  const { email: orderEmail } = useParams();
  const [orders, setOrders] = useState<OrderType[]>();
  const [selectedOrder, setSelcectedOrder] = useState<OrderType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orders = await getAllOrdersByEmail(
          decodeURIComponent(orderEmail.toString())
        );
        if (orders.length === 0) {
          console.error("No orders found for email", orderEmail);
        } else {
          setOrders(orders);
          setSelcectedOrder(orders[0]);
        }
      } catch (e) {
        console.error("Error fetching the latest order", e);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderEmail]);

  if (loading) {
    return (
      <motion.div
        className="h-full w-full bg-request-orange rounded-xl text-white p-20"
        initial={{ opacity: 0, translateX: -80 }}
        animate={{ opacity: 1, translateX: 0 }}
      >
        <Loader size="md" content="loading..." backdrop inverse vertical />
      </motion.div>
    );
  } else if (orders === undefined || orders.length === 0) {
    return (
      <motion.div
        className="flex flex-col justify-center items-center h-full w-full bg-request-orange rounded-xl text-white p-20 gap-2"
        initial={{ opacity: 0, translateX: -80 }}
        animate={{ opacity: 1, translateX: 0 }}
      >
        <h1 className="text-3xl font-bold">
          No orders found for email {decodeURIComponent(orderEmail.toString())}
        </h1>
        <Link
          href={"/"}
          className="flex flex-row justify-center items-center bg-zinc-800 text-xl py-2 px-5 font-bold rounded-xl gap-2"
        >
          <FaAngleLeft />
          Back to home
        </Link>
      </motion.div>
    );
  } else
    return (
      <motion.div
        className="flex flex-col bg-request-orange w-full h-full rounded-xl text-white"
        initial={{ opacity: 0, translateX: -80 }}
        animate={{ opacity: 1, translateX: 0 }}
      >
        <div className="flex flex-row w-full justify-start h-full">
          <ul className="flex flex-col w-1/4 h-full  bg-zinc-700  border-black">
            {orders.map((order) => (
              <li
                className={`"flex flex-col bg-white text-black w-full p-4 border-b-2 hover:bg-zinc-200 transition-colors active:bg-green-50 ${
                  selectedOrder?.id === order.id ? "bg-black" : ""
                }"`}
                key={order.id}
                onClick={() => setSelcectedOrder(order)}
              >
                <div></div>
                <h2>{formatDate(order.orderTimestamp)}</h2>
                <h3>{formatBookingDate(order.time)}</h3>
                <h3>Total: {order.total}</h3>
              </li>
            ))}
          </ul>
          <ul className="overflow-auto h-full">
            {selectedOrder && (
              <li className="p-4">
                <h2>Pöntun: {formatDate(selectedOrder.orderTimestamp)}</h2>
                <h3>Bókunar tími: {formatDate(selectedOrder.time)}</h3>
                <h3>Total: {selectedOrder.total} kr.</h3>
                <ul>
                  {selectedOrder.dishes.map((item) => (
                    <li
                      key={item.dish.id}
                      className="flex flex-row gap-4 bg-white rounded-xl p-4 text-black h-28"
                    >
                      <div>
                        <h3 className="font-bold text-lg">{`${item.quantity}x ${item.dish.name}`}</h3>
                        <p className="text-sm italic">
                          {item.dish.ingredients}
                        </p>
                        <p className="font-bold">
                          {item.dish.price * item.quantity} kr.
                        </p>
                      </div>
                    </li>
                  ))}
                  {selectedOrder.drinks.map((item) => (
                    <li
                      key={item.drink.idDrink}
                      className="flex flex-row gap-4 bg-white rounded-xl p-4 text-black h-28"
                    >
                      <img
                        src={item.drink.strDrinkThumb}
                        alt="Image of drink"
                        className="rounded-xl"
                      />
                      <div>
                        <h3 className="font-bold text-lg">
                          {item.drink.strDrink}
                        </h3>
                        <p className="text-sm italic">
                          {item.drink.strCategory}
                        </p>
                        <p className="font-bold">{item.drink.price} kr.</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>
      </motion.div>
    );
}
