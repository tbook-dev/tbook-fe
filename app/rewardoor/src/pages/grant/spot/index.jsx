import { useRef } from "react";
import { useHover, useResponsive } from "ahooks";
import clsx from "clsx";
import { theme, ConfigProvider } from "antd";
import { useTheme } from "@tbook/hooks";

export default function ({ className, id, children, close = () => {} }) {
  const ref = useRef(null);
  const { pc } = useResponsive();
  const appTheme = useTheme();
  // const userTheme = useSelector((state) => state.user.theme);

  const isHovering = useHover(ref, { onLeave: close });
  // const isHovering = true;

  return (
    <div
      ref={ref}
      id={id}
      className={clsx(appTheme !== "dark" && "bg-[#f6fafe]", className, pc && isHovering && "bg-cw1")}
    >
      <ConfigProvider
        theme={{
          token: {
            motionUnit: 0,
          },
          algorithm:
            appTheme === "dark"
              ? pc
                ? isHovering
                  ? theme.defaultAlgorithm
                  : theme.darkAlgorithm
                : theme.darkAlgorithm
              : theme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  );
}
