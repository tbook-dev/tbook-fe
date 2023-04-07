import emptyUrl from "@tbook/share/images/icon/empty.svg";
import empty2 from "@tbook/share/images/icon/empty2.svg";

import { useTheme } from "@tbook/hooks";

export default function ({ description = "No grants", img = emptyUrl, ...props }) {
  const theme = useTheme();
  return (
    <div className="h-[100px] flex flex-col items-center">
      <img src={theme === "dark" ? emptyUrl : empty2} className="h-full" />
      <span className="text-xs font-medium text-l-1 dark:text-disable lg:text-sm">{description}</span>
    </div>
  );
}
