import { useEventListener } from "ahooks";
import { useState } from "react";

export default function () {
  const [s, setScreen] = useState({
    height: window.screen.height,
    width: window.screen.width,
  });
  useEventListener("resize", () => {
    setScreen({
      height: window.screen.height,
      width: window.screen.width,
    });
  });
  return s;
}
