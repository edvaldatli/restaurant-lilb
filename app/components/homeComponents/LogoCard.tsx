import Image from "next/image";

export default function LogoCard() {
  return (
    <Image
      src={"/logo-no-background-cut.png"}
      height={500}
      width={500}
      alt="Logo"
      priority={true}
      className="h-full w-auto object-contain mx-auto"
    />
  );
}
