// dark 模式下表单情况，紧紧包裹表单
import { ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";
import componentsDefault from "./conf";
import _ from 'lodash';

export default function ({ children, conf }) {
  const userTheme = useSelector((state) => state.user.theme);
  
  return (
    <ConfigProvider
      theme={{
        algorithm:
          userTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        // theme.defaultAlgorithm,
        components: _.merge(componentsDefault, conf.components),
        token:
          userTheme === "dark"
            ? {
                ...conf.token,
                colorPrimary: "#000",
              }
            : token,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
