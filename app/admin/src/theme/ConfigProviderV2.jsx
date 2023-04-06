// dark 模式下表单情况，紧紧包裹表单
import { ConfigProvider, theme } from "antd";
import componentsDefault from "./conf";
import _ from "lodash";
import { useTheme } from "@tbook/hooks";

export default function ({ children, conf }) {
  const userTheme = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: userTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        // theme.defaultAlgorithm,
        components: _.merge(componentsDefault, conf.components),
        token:
          userTheme === "dark"
            ? {
                ...conf.token,
                colorPrimary: "#000",
              }
            : conf.token,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
