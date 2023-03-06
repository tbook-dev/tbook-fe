import logo from "./logo.png";
import clsx from "clsx";

export default function BSC({ className, ...props }) {
  return <img src={logo} className={clsx("h-[22px]", className)} {...props} />;
}
