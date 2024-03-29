import { Tooltip, Typography } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

export default function TipAddress ({
  address,
  placement = 'top',
  className = '',
  style = {},
  children,
}) {
  return (
    <Tooltip
      title={
        <Paragraph
          copyable={{
            text: address,
            icon: [
              <CopyOutlined style={{ color: 'rgba(255,255,255,0.8)' }} />,
              <CheckOutlined style={{ color: 'rgba(255,255,255,0.8)' }} />,
            ],
          }}
          style={{ margin: 0 }}
        >
          {address}
        </Paragraph>
      }
      placement={placement}
    >
      <span className={className} style={style}>
        {children}
      </span>
    </Tooltip>
  );
}
