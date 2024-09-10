// 跟随暗黑亮色调整antd
import { ConfigProvider, theme } from 'antd';
import components from '@/theme/conf';
// 可能revise
export default function ({ children, ...props }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        // theme.defaultAlgorithm,
        components,
        token: {
          colorPrimary: '#4D0BEF',
          borderRadiusLG: 16,
          fontFamily: "'sf', 'Red Hat Display', sans-serif;",
        },
      }}
      {...props}
    >
      {children}
    </ConfigProvider>
  );
}
