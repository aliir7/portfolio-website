import Link from "next/link";
import { HiOutlineDownload } from "react-icons/hi";
import { HiOutlineArrowRight } from "react-icons/hi2";

function CtaBtn() {
  return (
    <div className="mt-4 flex flex-col items-center gap-4 text-white sm:flex-row">
      <Link
        href="#contact"
        className="flex items-center gap-2 rounded-full border border-white bg-black px-10 py-3"
      >
        contact me
        <HiOutlineArrowRight className="h-4 w-4" />
      </Link>
      <Link
        href="/my-resume.pdf"
        download
        className="flex items-center gap-2 rounded-full border border-gray-500 px-10 py-3 text-black"
      >
        my resume
        <HiOutlineDownload className="h-4 w-4 text-black" />
      </Link>
    </div>
  );
}

export default CtaBtn;
