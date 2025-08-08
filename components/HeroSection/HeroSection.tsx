import { assets } from "@/assets/assets";
import Image from "next/image";
import HeroDescription from "./HeroDescription";
import CtaBtn from "./CtaBtn";

function HeroSection() {
  return (
    <section className="mx-auto flex h-screen w-11/12 max-w-3xl flex-col items-center justify-center gap-4 text-center">
      <div>
        <Image
          src={assets.profile_img}
          alt="profile-img"
          className="mt-2 w-32 rounded-full"
        />
      </div>
      <HeroDescription imageData={assets.profile_img} />
      <CtaBtn />
    </section>
  );
}

export default HeroSection;
