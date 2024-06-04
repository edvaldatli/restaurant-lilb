import { useLocalStorage } from "../../context/LocalStorage";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { LocalStorageProvider } from "../../context/LocalStorage";

export default function OldOrderCard() {
  const router = useRouter();
  const localStorage = useLocalStorage();

  const handleSubmition = (data: FormData) => {
    const email = data.get("email");
    router.push(`/order/${email}/_`);
  };

  return (
    <div className="flex flex-col bg-request-orange h-full rounded-xl p-10 shadow-lg gap-4">
      <h2 className="text-4xl font-bold">Looking for your order?</h2>
      <p className="text-xl font-semibold">
        Here you can look up if you have an order in.
      </p>
      <form className="flex flex-col gap-2" action={handleSubmition}>
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
        <div className="flex flex-row justify-end">
          <button className="flex flex-row px-4 py-2 text-lg gap-2 items-center bg-green-600 rounded-xl font-bold">
            Search
            <FaSearch />
          </button>
        </div>
      </form>
    </div>
  );
}
