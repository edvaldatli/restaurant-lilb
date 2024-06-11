import { useLocalStorage } from "../../context/LocalStorage";
import RoutingButton from "../RoutingButton";

export default function WelcomeCard() {
  const { name } = useLocalStorage();
  return (
    <>
      <div className="flex flex-col gap-2 justify-between bg-request-orange h-full rounded-xl p-6 lg:p-10 shadow-lg">
        <div className="flex flex-col gap-2">
          {!name && (
            <>
              <h2 className="text-2xl lg:text-4xl font-bold">
                Good to see you!
              </h2>
              <p className="text-sm lg:text-lg font-semibold">
                You can start the ordering process here!
              </p>
            </>
          )}
          {name && (
            <>
              <h2 className="text-2xl lg:text-4xl font-bold line-clamp-2">
                Good to see you again, {name}!
              </h2>
              <p className="text-sm lg:text-xl font-semibold">
                Want us to take you on a tasty ride again?
              </p>
            </>
          )}
        </div>
        <div className="flex flex-row justify-between items-center">
          <RoutingButton
            text="Start ordering"
            type="forward"
            className="flex flex-row text-nowrap items-center h-10 p-4 w-full justify-center rounded-xl font-bold text-white bg-green-700 hover:bg-request-green transition-colors"
            disabled={false}
          />
        </div>
      </div>
    </>
  );
}
