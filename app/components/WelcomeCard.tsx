import { useLocalStorage } from "../context/LocalStorage";
import Link from "next/link";

export default function WelcomeCard() {
  const { name } = useLocalStorage();
  return (
    <>
      {name && (
        <div className="flex flex-col justify-between bg-request-orange h-full rounded-xl p-10 shadow-lg">
          <div>
            <h2 className="text-4xl font-bold">
              Good to see you again, {name}!
            </h2>
            <p className="text-xl font-semibold">
              Want us to take you on a tasty ride again?
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-lg font-semibold">
              You can start the ordering process here!
            </p>
            <Link
              href={"/dishes"}
              className="flex items-center h-10 p-4 rounded-xl font-bold text-white bg-green-600 hover:bg-request-green transition-colors"
            >
              Start Ordering
            </Link>
          </div>
        </div>
      )}
      {!name && (
        <div className="flex flex-col justify-between bg-request-orange h-full rounded-xl p-10 shadow-lg">
          <div>
            <h2 className="text-4xl font-bold">Good to see you!</h2>
            <p className="text-xl font-semibold">
              Want us to take you on a tasty ride?
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-lg font-semibold">
              You can start the ordering process here!
            </p>
            <Link
              href={"/dishes"}
              className="flex items-center h-10 p-4 rounded-xl font-bold text-white bg-green-600 hover:bg-request-green transition-colors"
            >
              Start Ordering
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
