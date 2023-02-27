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
      className={clsx(className, pc && isHovering && "bg-cw1", "transition-colors	ease-[cubic-bezier(0.645, 0.045, 0.355, 1)]	duration-200")}
    >
      <ConfigProvider
        theme={{
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
