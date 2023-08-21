// 跟随暗黑亮色调整antd
import { ConfigProvider, theme } from 'antd'
import components from '@/theme/conf'
// 可能revise
export default function ({ children, ...props }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        // theme.defaultAlgorithm,
        components,
        token: {
          colorPrimary: '#fff',
          fontFamily: "'Red Hat Display', sans-serif;"
        }
      }}
      {...props}
    >
      {children}
    </ConfigProvider>
  )
}
