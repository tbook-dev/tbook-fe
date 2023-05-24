import { ConfigProvider, theme } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import components from './conf'

export default function ({ children }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        components,
        token: {
          colorPrimary: '#69D0E5',
          fontFamily: "'Red Hat Display', sans-serif;"
        }
      }}
    >
      <StyleProvider hashPriority='high'>{children}</StyleProvider>
    </ConfigProvider>
  )
}
