import { useSelector } from "react-redux";

export default function () {
  const themePrefence = useSelector((state) => state.global.theme);

  //   return themePrefence === "dark" ||
  //     (themePrefence === "theme" && window.matchMedia("(prefers-color-scheme: dark)").matches)
  //     ? "dark"
  //     : "light";
  return themePrefence;
}
