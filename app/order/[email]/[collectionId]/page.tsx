"use client";
import { useEffect, useState } from "react";
import { OrderType, getAllOrdersByEmail } from "../../../utils/serverFunctions";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaAngleLeft, FaAngleRight, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentEditOrder, toggleDrawer } from "@/features/order/orderSlice";
import {
  formatDate,
  formatBookingDate,
  checkBookingHandled,
} from "../../../utils/dateFormat";
import "rsuite/Loader/styles/index.css";
import "rsuite/Placeholder/styles/index.css";
import { Loader } from "rsuite";
import { AnimatePresence, motion } from "framer-motion";
import ItemImage from "@/app/components/ItemImage";
import OrdersDrawer from "@/app/components/MobileComponents/OrdersDrawer";
import { RootState } from "@/app/store";
import OrdersList from "@/app/components/OrdersList";
import { FaListCheck } from "react-icons/fa6";

export default function OrderPage() {
  const dispatch = useDispatch();
  const drawerState = useSelector((state: RootState) => state.order.cartDrawer);
  const router = useRouter();
  const { email: orderEmail, collectionId: orderId } = useParams();
  const [orders, setOrders] = useState<OrderType[]>();
  const [selectedOrder, setSelcectedOrder] = useState<OrderType>();
  const [loading, setLoading] = useState(true);

  const editOrder = ({ id, drinks, meals, total }: OrderType) => {
    dispatch(setCurrentEditOrder({ id, drinks, meals, totalPrice: total }));

    router.push("/dishes");
  };

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
          setSelcectedOrder(orders.find((order) => order.id === orderId));
        }
      } catch (e) {
        console.error("Error fetching the latest order", e);
      } finally {
        setLoading(false);
      }
    };
    setTimeout(() => {
      fetchOrder();
    }, 3000);
  }, []);

  if (loading) {
    return (
      <motion.div
        className="h-full w-full bg-request-orange rounded-xl text-white p-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Loader size="md" content="loading..." backdrop inverse vertical />
      </motion.div>
    );
  } else if (orders === undefined || orders.length === 0) {
    return (
      <AnimatePresence>
        <motion.div
          className="flex flex-col justify-center items-center h-full w-full bg-request-orange rounded-xl text-white p-20 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-3xl font-bold">
            No orders found for email{" "}
            {decodeURIComponent(orderEmail.toString())}
          </h1>
          <Link
            href={"/"}
            className="flex flex-row justify-center items-center bg-zinc-800 text-xl py-2 px-5 font-bold rounded-xl gap-2"
          >
            <FaAngleLeft />
            Back to home
          </Link>
        </motion.div>
      </AnimatePresence>
    );
  } else
    return (
      <AnimatePresence>
        <motion.div
          className="flex flex-col bg-request-orange w-full h-full rounded-xl text-white lg:pt-0 pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex flex-row w-full justify-start h-full">
            <motion.div className="hidden lg:block">
              <OrdersList
                orders={orders}
                selectOrder={setSelcectedOrder}
                selectedOrder={selectedOrder}
              />
            </motion.div>
            <div className="overflow-auto h-full w-full">
              <AnimatePresence>
                {selectedOrder ? (
                  <motion.div
                    className="flex flex-col p-4 h-full gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex flex-row justify-between bg-green-700 rounded-lg p-4">
                      <div className="flex flex-col h-20 justify-center">
                        {checkBookingHandled(selectedOrder.time) === false && (
                          <div className="flex flex-row items-center gap-3">
                            <span className="relative flex w-3 h-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-full w-full bg-sky-500"></span>
                            </span>
                            <h1 className="text-xl font-bold">
                              Þú átt bókað borð á Lilbits!
                            </h1>
                          </div>
                        )}
                        {checkBookingHandled(selectedOrder.time) === true && (
                          <h1 className="text-xl font-bold">
                            Þú borðaðir á Lilbits!
                          </h1>
                        )}

                        <h3>{formatBookingDate(selectedOrder.time)}</h3>
                      </div>
                      <h2 className="font-light">
                        {formatDate(selectedOrder.orderTimestamp)}
                      </h2>
                    </div>
                    <h2 className="text-lg font-bold">Pöntunin þín:</h2>
                    <ul className="flex flex-col gap-2 overflow-auto h-full">
                      {selectedOrder.meals.map((item) => (
                        <motion.li
                          key={item.meal.idMeal + selectedOrder.id}
                          className="flex flex-row gap-4 bg-white rounded-xl p-4 text-black h-20"
                          initial={{ opacity: 0, translateY: 80 }}
                          animate={{ opacity: 1, translateY: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, type: "spring" }}
                        >
                          <ItemImage url={item.meal.strMealThumb} />
                          <div className="flex flex-col w-full">
                            <div className="flex flex-row justify-between">
                              <h3 className="font-bold text-lg">
                                {item.quantity}x {item.meal.strMeal}
                              </h3>
                              <p className="font-bold text-xl">
                                {item.meal.price * item.quantity} kr.
                              </p>
                            </div>
                            <p className="text-sm italic">
                              {item.meal.strCategory}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                      {selectedOrder.drinks.map((item) => (
                        <motion.li
                          key={item.drink.idDrink + selectedOrder.id}
                          className="flex flex-row gap-4 bg-white rounded-xl p-4 text-black h-20"
                          initial={{ opacity: 0, translateY: 80 }}
                          animate={{ opacity: 1, translateY: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, type: "spring" }}
                        >
                          <ItemImage url={item.drink.strDrinkThumb} />
                          <div className="flex flex-col w-full">
                            <div className="flex flex-row justify-between w-full">
                              <h3 className="font-bold text-lg">
                                {item.quantity}x {item.drink.strDrink}
                              </h3>
                              <p className="font-bold text-xl">
                                {item.drink.price * item.quantity} kr.
                              </p>
                            </div>
                            <p className="text-sm italic">
                              {item.drink.strCategory}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                    <div className="flex flex-row mt-auto bg-zinc-600 w-full min-h-16 rounded-xl items-center p-2 justify-between">
                      {checkBookingHandled(selectedOrder.time) === false && (
                        <button
                          onClick={() => editOrder(selectedOrder)}
                          className="flex flex-row items-center gap-2 bg-green-600 h-full rounded-xl px-6 py-3 font-bold transition-colors hover:bg-green-400"
                        >
                          Breyta pöntun
                          <FaEdit />
                        </button>
                      )}
                      <h3 className="text-xl font-bold ml-auto">
                        Samtals: {selectedOrder.total} kr.
                      </h3>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    className="flex flex-col justify-center items-center h-full w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h1 className="text-xl font-bold">Select an order</h1>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
        {drawerState && (
          <motion.div
            className="fixed h-full w-full top-0"
            initial={{ translateY: "100%" }}
            animate={{ translateY: 0, transition: { type: "just" } }}
            key={"drawer"}
          >
            <OrdersDrawer
              orders={orders}
              selectOrder={(order) => setSelcectedOrder(order)}
              currentlySelectedOrder={selectedOrder}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
}
