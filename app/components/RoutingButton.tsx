"use client";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

type ButtonParamTypes = {
  text?: string;
  className?: string;
  type: "back" | "forward";
};

const routeFlow = [
  { currentRoute: "/", nextRoute: "/dishes", backRoute: "/" },
  { currentRoute: "/dishes", nextRoute: "/drinks", backRoute: "/" },
  { currentRoute: "/drinks", nextRoute: "/order", backRoute: "/dishes" },
  { currentRoute: "/order", nextRoute: "/", backRoute: "/drinks" },
];

export default function RoutingButton({
  text = "Next",
  className = "",
  type,
}: ButtonParamTypes) {
  const router = useRouter();
  const currentRoute = usePathname();

  const handleNextRoute = () => {
    const route = routeFlow.find(
      (route) => route.currentRoute === currentRoute
    );
    const routeTo = type === "forward" ? route?.nextRoute : route?.backRoute;
    if (routeTo) {
      router.push(routeTo);
    } else {
      router.push("/");
    }
  };

  return (
    <button onClick={handleNextRoute} className={className}>
      {type === "back" && (
        <>
          <FaAngleLeft />
          {text}
        </>
      )}
      {type === "forward" && (
        <>
          {text}
          <FaAngleRight />
        </>
      )}
    </button>
  );
}
