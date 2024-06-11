import { useLocalStorage } from "../../context/LocalStorage";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function OldOrderCard() {
  const router = useRouter();
  const localStorage = useLocalStorage();

  const handleSubmition = (data: FormData) => {
    const email = data.get("email");
    router.push(`/order/${email}/_`);
  };

  return (
    <div className="flex flex-col bg-request-orange rounded-xl lg:h-full p-6 lg:p-10 shadow-lg gap-4">
      <div>
        <h2 className="text-2xl lg:text-4xl font-bold">
          Looking for your order?
        </h2>
        <p className="text-sm lg:text-xl font-semibold">
          Here you can look up if you have an order in.
        </p>
      </div>
      <form className="flex flex-col gap-2 h-full" action={handleSubmition}>
        <label htmlFor="input" className="font-bold">
          E-mail address:
        </label>
        <input
          type="email"
          className="text-lg p-2 font-medium border rounded-xl text-black"
          name="email"
          defaultValue={localStorage.email || ""}
          required
        />
        <div className="flex flex-col justify-end h-full">
          <button className="flex flex-row px-4 py-2 text-lg gap-2 justify-center items-center bg-green-700 rounded-xl font-bold hover:bg-request-green transition-colors w-full">
            Search
            <FaSearch />
          </button>
        </div>
      </form>
    </div>
  );
}
