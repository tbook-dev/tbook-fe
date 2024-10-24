// 跟随暗黑亮色调整antd
import { ConfigProvider, theme } from 'antd'
import components from './conf'
// 可能revise
export default function ({ children, ...props }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        // theme.defaultAlgorithm,
        components,
        token: {
          colorPrimary: '#904BF6',
          fontFamily: "sf, sans-serif;"
        }
      }}
      {...props}
    >
      {children}
    </ConfigProvider>
  )
}
