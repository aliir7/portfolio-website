import {
  SiReact,
  SiReactrouter,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiTailwindcss,
  SiReactquery,
  SiRedux,
  SiNextdotjs,
} from "react-icons/si";

const icons = [
  { icon: <SiTailwindcss />, name: "tailwindcss" },
  { icon: <SiReact />, name: "react" },
  { icon: <SiReactrouter />, name: "react-router" },
  { icon: <SiReactquery />, name: "react-query" },

  { icon: <SiRedux />, name: "redux" },
  { icon: <SiNextdotjs />, name: "nextjs" },
  { icon: <SiPostgresql />, name: "postgressql" },
  { icon: <SiMongodb />, name: "mongodb" },

  { icon: <SiGit />, name: "git" },
];

function ToolsList() {
  return (
    <ul className="flex items-center gap-3 sm:gap-5">
      {icons.map((tool, index) => (
        <li
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border border-gray-400 text-black duration-500 hover:translate-y-1 sm:h-14 sm:w-14"
          key={index}
        >
          {tool.icon}
        </li>
      ))}
    </ul>
  );
}

export default ToolsList;
