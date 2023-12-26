import { Tooltip, Typography } from 'antd'
import { shortAddress } from '@tbook/utils/lib/conf'

const { Paragraph } = Typography

export default function Address ({ address, placement = 'top' }) {
  return (
    <Paragraph copyable={{ text: address }} style={{ margin: 0 }}>
      <Tooltip title={address} placement={placement}>
        {shortAddress(address)}
      </Tooltip>
    </Paragraph>
  )
}
