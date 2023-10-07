import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useMemo } from "react";
import { useNavLink } from "./conf";

export default function Links({ inDrawer = false, hidden = false, onClose }) {
  const links = useNavLink();
  const displayNone = useMemo(() => {
    if (hidden) {
      return true;
    }
    if (inDrawer) {
      return false;
    }
    return false;
  }, [inDrawer, hidden]);

  return (
    <div
      className={clsx(
        "text-2xl lg:text-lg font-bold lg:gap-x-10  lg:gap-y-0  lg:flex-row",
        displayNone ? "hidden" : "flex flex-col gap-y-8"
      )}
    >
      {links.map((v) => (
        <NavLink key={v.text} to={v.link} onClick={onClose}>
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
