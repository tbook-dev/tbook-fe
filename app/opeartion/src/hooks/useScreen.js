import { useEventListener } from "ahooks";
import { useState } from "react";

export default function () {
  const [s, setScreen] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEventListener("resize", () => {
    setScreen({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  });
  return s;
}
