// 跟随暗黑亮色调整antd
import { ConfigProvider, theme } from "antd";
import components from "@/theme/conf";
import { useTheme } from "@tbook/hooks";
// 可能revise
export default function ({ children, ...props }) {
  const userTheme = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: userTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        // theme.defaultAlgorithm,
        components,
        token: {
          colorPrimary: userTheme === "dark" ? "#fff" : "#69D0E5",
        },
      }}
      {...props}
    >
      {children}
    </ConfigProvider>
  );
}
