import { ConfigProvider, theme } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import components from './conf';

export default function ({ children }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        components,
        token: {
          colorPrimary: '#4D0BEF',
          fontFamily: "sf, sans-serif;",
        },
      }}
    >
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
}
