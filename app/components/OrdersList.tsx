import { FaAngleRight } from "react-icons/fa";
import {
  checkBookingHandled,
  formatBookingDate,
  formatDate,
} from "../utils/dateFormat";
import { OrderType } from "../utils/serverFunctions";

type props = {
  orders: OrderType[];
  selectedOrder: OrderType | undefined;
  selectOrder: (order: OrderType) => void;
};

export default function OrdersList({
  orders,
  selectOrder,
  selectedOrder,
}: props) {
  return (
    <ul className="flex flex-col w-1/3 bg-zinc-700 border-black overflow-auto h-full w-full">
      {orders.map((order) => (
        <li
          className={`flex flex-row justify-between items-center gap-4 w-full p-4 border-b-2 transition-colors select-none ${
            selectedOrder?.id === order.id
              ? "bg-request-orange text-white hover:bg-request-orange"
              : "bg-white text-black"
          }`}
          key={order.id}
          onClick={() => selectOrder(order)}
        >
          {checkBookingHandled(order.time) === false && (
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-sky-500"></span>
            </span>
          )}
          <div className="flex flex-col w-2/3">
            <p className="text-sm font-semibold">Table:</p>
            <p className="text-xs">{formatBookingDate(order.time)}</p>
          </div>
          <div className="flex flex-col justify-between">
            <h3 className="text-sm text-nowrap">
              {formatDate(order.orderTimestamp)}
            </h3>
            <h3 className="text-sm font-semibold text-nowrap">
              {order.total} kr
            </h3>
          </div>
          <FaAngleRight />
        </li>
      ))}
    </ul>
  );
}
