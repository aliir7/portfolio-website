import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";

function ContactBtn() {
  return (
    <Link
      href="#contact"
      className="font-Ovo ml-4 hidden items-center gap-3 rounded-full border border-gray-500 px-10 py-2.5 lg:flex"
    >
      Contact <HiArrowUpRight className="w-3" />
    </Link>
  );
}

export default ContactBtn;
