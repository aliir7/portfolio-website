import { assets, infos } from "@/assets/assets";
import Image from "next/image";

import InfoList from "./InfoList";
import ToolsList from "./ToolsList";

function AboutSection() {
  return (
    <div
      id="about"
      className="font-Ovo w-full scroll-mt-20 px-[12%] py-10 text-center"
    >
      <h4 className="mb-2 text-lg">Introduction</h4>
      <h3 className="text-5xl">About me</h3>

      <div className="my-20 flex w-full flex-col items-center gap-20 lg:flex-row">
        <div className="w-64 max-w-none rounded-3xl sm:w-80">
          <Image
            src={assets.user_img}
            priority
            quality={80}
            alt="user-image"
            className="w-full rounded-3xl"
          />
        </div>
        <div className="flex-1">
          <p className="mb-10 max-w-2xl">
            I am an experienced Frontend Developer with over 2 years of
            professional expertise in the field. Throughout my career, I have
            had the privilege of collaborating with prestigious organizations,
            contributing to their success and growth.
          </p>
          <InfoList items={infos} />
          <h4 className="my-6 text-gray-700">Tools I Use</h4>
          <ToolsList />
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
