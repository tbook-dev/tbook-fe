// dark 模式下表单情况，紧紧包裹表单
import { ConfigProvider, theme } from "antd";
import componentsDefault from "./conf";
import _ from "lodash";

export default function ({ children, conf = { token: {} } }) {

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        // theme.defaultAlgorithm,
        components: _.merge(componentsDefault, conf.components),
        token:
         {
                ...conf.token,
                colorPrimary: "#000",
              }
      }}
    >
      {children}
    </ConfigProvider>
  );
}
