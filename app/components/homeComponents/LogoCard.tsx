import Image from "next/image";

export default function LogoCard() {
  return (
    <Image
      src={"/logo-no-background.png"}
      height={500}
      width={500}
      alt="Logo"
      priority={true}
      className="h-full w-full object-scale-down"
    ></Image>
  );
}
