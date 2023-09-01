import { links } from "./conf";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

export default function Links({ inDrawer = false }) {
  return (
    <div
      className={clsx(
        "text-2xl lg:text-lg font-bold lg:gap-x-10  lg:gap-y-0  lg:flex-row",
        inDrawer ? "flex flex-col gap-y-8" : "hidden"
      )}
    >
      {links.map((v) => (
        <NavLink key={v.text} to={v.link}>
          {({ isActive }) => (
            <span className={isActive ? "text-black" : "text-c-6"}>
              {v.text}
            </span>
          )}
        </NavLink>
      ))}
    </div>
  );
}
