import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="#top">
      <Image
        src={assets.logo}
        alt="logo-img"
        className="mr-14 w-12 cursor-pointer bg-transparent"
      />
    </Link>
  );
}

export default Logo;
