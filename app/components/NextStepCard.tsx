const routes = [
  { currentRoute: "/", nextRoute: "/dishes" },
  { currentRoute: "/dishes", nextRoute: "/drinks" },
  { currentRoute: "/drinks", nextRoute: "/order" },
  { currentRoute: "/order", nextRoute: "/" },
];

export default function NextStepCard() {
  return <div>test</div>;
}
