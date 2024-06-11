import PocketBase from "pocketbase";
import { CocktailType, MealType } from "../types/types";

export type OrderType = {
  id?: string;
  firstName: string;
  email: string;
  orderTimestamp: Date;
  time: Date;
  meals: { meal: MealType; quantity: number }[];
  drinks: { drink: CocktailType; quantity: number }[];
  total: number;
};

type ItemsType = {
  meals: { meal: MealType; quantity: number }[];
  drinks: { drink: CocktailType; quantity: number }[];
};

const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_HOST);

export async function uploadOrder(
  order: ItemsType,
  orderTimestamp: Date,
  time: Date,
  firstName: string,
  email: string,
  total: number,
  id?: string
) {
  const data: OrderType = {
    firstName: firstName,
    email: email,
    orderTimestamp: orderTimestamp,
    time: time,
    meals: order.meals,
    drinks: order.drinks,
    total: total,
    id: id || undefined,
  };

  if (data.id) {
    const checkData = await pb.collection("order").getOne(data.id);
    if (!checkData) {
      throw new Error("Order does not exist");
    }

    const results = await pb.collection("order").update(data.id, data);

    return results;
  } else {
    const results = await pb.collection("order").create(data);

    if (!results) {
      throw new Error("Error creating order");
    }

    return results;
  }
}

export async function getOrderById(id: string) {
  const record: OrderType = await pb.collection("order").getOne(id);

  return record;
}

export async function getLatestOrderByEmail(email: string) {
  const record: OrderType = await pb
    .collection("order")
    .getFirstListItem(`email="${email}"`, { sort: "-created" });
  return record;
}

export async function getAllOrdersByEmail(email: string): Promise<OrderType[]> {
  const result = await pb
    .collection("order")
    .getList(1, 100, { filter: `email="${email}"`, sort: "-time" });

  const records: OrderType[] = result.items.map((item: any) => ({
    id: item.id,
    firstName: item.firstName,
    email: item.email,
    orderTimestamp: item.orderTimestamp,
    time: item.time,
    meals: item.meals,
    drinks: item.drinks,
    total: item.total,
  }));

  return records;
}
