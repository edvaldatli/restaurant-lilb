"use client";
import { FaAngleRight } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

type ButtonParamTypes = {
  text?: string;
  className?: string;
};

const routeFlow = [
  { currentRoute: "/", nextRoute: "/dishes" },
  { currentRoute: "/dishes", nextRoute: "/drinks" },
  { currentRoute: "/drinks", nextRoute: "/order" },
  { currentRoute: "/order", nextRoute: "/" },
];

export default function NextStepButton({
  text = "Next",
  className = "",
}: ButtonParamTypes) {
  const router = useRouter();
  const currentRoute = usePathname();

  const handleNextRoute = () => {
    const nextRoute = routeFlow.find(
      (route) => route.currentRoute === currentRoute
    )?.nextRoute;
    if (nextRoute) {
      router.push(nextRoute);
    } else {
      router.push("/");
    }
  };

  return (
    <button onClick={handleNextRoute} className={className}>
      {text}
      <FaAngleRight />
    </button>
  );
}
