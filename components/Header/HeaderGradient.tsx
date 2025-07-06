import { assets } from "@/assets/assets";
import Image from "next/image";

function HeaderGradient() {
  return (
    <div className="fixed top-0 right-0 -z-12 w-11/12 translate-y-[-80%]">
      <Image
        src={assets.header_bg_color}
        alt="header-gradient"
        className="w-full"
      />
    </div>
  );
}

export default HeaderGradient;
