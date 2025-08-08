import Image, { StaticImageData } from "next/image";

type Props = {
  imageData: StaticImageData;
};

function HeroDescription({ imageData }: Props) {
  return (
    <div className="font-Ovo flex flex-col">
      <div className="my-2 flex items-center justify-center">
        <h3 className="mb-3 flex items-end gap-2 text-xl md:text-2xl">
          Hi! I&apos;m Ali Rezaei
          <Image src={imageData} alt="profile-img" className="w-6" />
        </h3>
      </div>
      <h1 className="text-3xl sm:text-6xl lg:text-[66px]">
        frontend web developer based in Tehran
      </h1>
      <p className="mx-auto mt-2 mb-4 max-w-2xl">
        I am frontend developer from Parand, Iran with 2 years of experience in
        multiple freelance projects
      </p>
    </div>
  );
}

export default HeroDescription;
