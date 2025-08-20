import { InfoItems } from "@/types";

type Props = {
  items: InfoItems[];
};

function InfoList({ items }: Props) {
  return (
    <ul className="grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
      {items.map((item, index) => (
        <li
          key={index}
          className="hover:bg-lightHover cursor-pointer rounded-xl border-[0.5px] border-gray-400 p-6 duration-500 hover:translate-y-1 hover:shadow-black"
        >
          <h3 className="my-4 font-semibold text-gray-700">{item.title}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default InfoList;
