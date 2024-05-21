import { OrderContextType } from "../context/OrderContext";
import PocketBase from "pocketbase";
import { CocktailType, DishType } from "../types/types";

export type OrderType = {
    firstName: string;
    email: string;
    orderTimestamp: string;
    time: string;
    dishes: { dish: DishType; quantity: number }[];
    drinks: { drink: CocktailType; quantity: number }[];
    total: number;
  };

const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_HOST)

export async function uploadOrder(order: OrderContextType, orderTimestamp: string, time: string, firstName: string, email: string, total: number)  {
    const data: OrderType = {
        "firstName": firstName,
        "email": email,
        "orderTimestamp": orderTimestamp,
        "time": time,
        "dishes": order.dishes,
        "drinks": order.drinks,
        "total": total
    }
    const record = await pb.collection('order').create(data)
}

export async function getOrderById(id: string) {
    const record: OrderType = await pb.collection('order').getOne(id);
    return record;
}

export async function getLatestOrderByEmail(email: string) {
    const record: OrderType = await pb.collection('order').getFirstListItem(`email="${email}"`, {sort: '-created'});
    return record;
}

export async function getAllOrdersByEmail(email: string): Promise<OrderType[]> {
    const result = await pb.collection('order').getList(1, 100, { filter: `email="${email}"`, sort: '-created'});
    const records: OrderType[] = result.items.map((item: any) => ({
        id: item.id,
        firstName: item.firstName,
        email: item.email,
        orderTimestamp: item.orderTimestamp,
        time: item.time,
        dishes: item.dishes,
        drinks: item.drinks,
        total: item.total
      }));
    return records;
  }