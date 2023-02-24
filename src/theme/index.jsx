import { ConfigProvider, theme, Empty } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import darkConf from "./dark";

// const { useToken } = theme;


export default function ({ children }) {
  return (
    <ConfigProvider
      // renderEmpty={Empty}
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Form: {
            marginLG: 12,
          },
          DatePicker: {
            controlHeight: 40,
          },
          Input: {
            controlHeight: 40,
          },
          InputNumber: {
            controlHeight: 40,
          },
          Select: {
            controlHeight: 40,
          },
        },
        token: {
          ...darkConf.token,
          fontFamily: "'Red Hat Display', sans-serif;",
        },
      }}
    >
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
}
