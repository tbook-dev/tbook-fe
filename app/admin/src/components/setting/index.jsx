import backIcon from "@tbook/share/images/icon/h5-back.svg";
import back2 from "@tbook/share/images/icon/back2.svg";

import { useTheme } from "@tbook/hooks";

export default function ({ backHandle, title, children }) {
  const theme = useTheme();
  return (
    <div>
      <div className="flex items-center mb-8 dark:text-white">
        <img src={theme === "dark" ? backIcon : back2} className="w-7 h-7" onClick={backHandle} />
        <span className="ml-2 font-bold text-c3">{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
