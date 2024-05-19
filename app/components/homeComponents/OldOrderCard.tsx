import { useLocalStorage } from "../../context/LocalStorage";
import Link from "next/link";

export default function OldOrderCard() {
  const { name } = useLocalStorage();
  return (
    <div className="flex flex-col bg-request-orange h-full rounded-xl p-10 shadow-lg gap-4">
      <h2 className="text-4xl font-bold">Looking for your order?</h2>
      <p className="text-xl font-semibold">
        Here you can look up if you have an order in.
      </p>
      <div className="flex flex-col">
        <label htmlFor="input" className="font-bold">
          E-mail address:
        </label>
        <input
          type="email"
          className="text-lg p-2 font-medium border rounded-xl"
          name="email"
          required
        />
      </div>
    </div>
  );
}
