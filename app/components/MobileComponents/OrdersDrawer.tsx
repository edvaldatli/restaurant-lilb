import {
  checkBookingHandled,
  formatBookingDate,
  formatDate,
} from "@/app/utils/dateFormat";
import { OrderType } from "@/app/utils/serverFunctions";
import { toggleDrawer } from "@/features/order/orderSlice";
import { FaAngleRight, FaX } from "react-icons/fa6";
import { useDispatch } from "react-redux";

type props = {
  orders: OrderType[] | undefined;
  currentlySelectedOrder: OrderType | undefined;
  selectOrder: (order: OrderType) => void;
};

export default function OrdersDrawer({
  orders,
  selectOrder,
  currentlySelectedOrder,
}: props) {
  const selectedOrder = currentlySelectedOrder?.id;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleDrawer());
  };

  if (orders === undefined || orders.length === 0) return <p>No orders</p>;

  return (
    <div className="flex flex-col h-full p-4 pt-16 bg-zinc-700 text-white">
      <div className="flex flex-row justify-between">
        <h2 className="text-lg font-bold">Your orders:</h2>
        <button
          className="text-white  rounded-xl p-2"
          onClick={() => dispatch(toggleDrawer())}
        >
          <FaX />
        </button>
      </div>
      <ul className="flex flex-col justify-start pt-2 gap-2 overflow-y-visible overflow-x-hidden h-full">
        {orders.length === 0 ? (
          <p className="text-center font-bold text-2xl my-auto">No orders</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {orders.map((order) => (
              <li
                className={`flex flex-row justify-between items-center p-4 rounded-xl bg-zinc-800 ${
                  selectedOrder === order.id ? "bg-zinc-900" : ""
                }`}
                onClick={() => {
                  selectOrder(order);
                  handleClick();
                }}
                key={order.id + "-drawer"}
              >
                <span
                  className={`relative flex w-2 h-2 ${
                    checkBookingHandled(order.time) === false
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-full w-full bg-sky-500"></span>
                </span>
                <div className="flex flex-col w-2/3">
                  <p className="font-semibold">Table:</p>
                  <p className="text-xs">{formatBookingDate(order.time)}</p>
                </div>
                <div className="flex flex-col justify-between">
                  <h3 className="text-xs">
                    {formatDate(order.orderTimestamp)}
                  </h3>
                  <h3 className="font-semibold">{order.total} kr.</h3>
                </div>
                <FaAngleRight />
              </li>
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
}
