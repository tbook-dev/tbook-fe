import { useRef } from "react";
import { useHover, useResponsive } from "ahooks";
import clsx from "clsx";
import { theme, ConfigProvider } from "antd";
import { useSelector } from "react-redux";

export default function ({ className, id, children, close = () => {} }) {
  const ref = useRef(null);
  const { pc } = useResponsive();
  // const userTheme = useSelector((state) => state.user.theme);

  const isHovering = useHover(ref, { onLeave: close });

  return (
    <div
      ref={ref}
      id={id}
      className={clsx(className, pc && isHovering && "bg-cw1")}
    >
      <ConfigProvider
        theme={{
          token:{
            motionUnit:0
          },
          algorithm: pc
            ? isHovering
              ? theme.defaultAlgorithm
              : theme.darkAlgorithm
            : theme.darkAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  );
}
