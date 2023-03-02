// dark 模式下表单情况，紧紧包裹表单
import { ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";
import components from "./conf";

// 普调情况
export default function ({ children }) {
  const userTheme = useSelector((state) => state.user.theme);

  return (
    <ConfigProvider
      theme={{
        algorithm: userTheme === "dark" ? theme.defaultAlgorithm : theme.darkAlgorithm,
        // theme.defaultAlgorithm,
        components,
        token:
          userTheme === "dark"
            ? {
                colorPrimary: "#000",
              }
            : {},
      }}
    >
      {children}
    </ConfigProvider>
  );
}
