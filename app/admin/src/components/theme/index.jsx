// dark 模式下表单情况，紧紧包裹表单
import { ConfigProvider, theme, Pagination } from "antd";
import components from "@/theme/conf";

// 可能revise
export default function ({ children }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        // theme.defaultAlgorithm,
        components,
        token: {
          colorPrimary: "#fff",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
