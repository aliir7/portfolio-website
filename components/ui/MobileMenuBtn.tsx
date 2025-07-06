import { HiOutlineBars3CenterLeft } from "react-icons/hi2";

function MobileMenuBtn() {
  return (
    <button className="ml-3 block md:hidden">
      <HiOutlineBars3CenterLeft className="h-6 w-6 rotate-180" />
    </button>
  );
}

export default MobileMenuBtn;
