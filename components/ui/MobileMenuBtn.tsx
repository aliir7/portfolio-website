import { HiOutlineBars3CenterLeft } from "react-icons/hi2";

type Props = {
  openMenu: () => void;
};

function MobileMenuBtn({ openMenu }: Props) {
  return (
    <button className="ml-3 block md:hidden" onClick={() => openMenu()}>
      <HiOutlineBars3CenterLeft className="h-6 w-6 rotate-180" />
    </button>
  );
}

export default MobileMenuBtn;
