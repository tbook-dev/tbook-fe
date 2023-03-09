// dark 模式下表单情况，紧紧包裹表单
import { ConfigProvider, theme } from "antd";
import components from "./conf";

// 可能revise
export default function ({ children }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        // theme.defaultAlgorithm,
        components,
        token: {
          colorPrimary: "#000",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
